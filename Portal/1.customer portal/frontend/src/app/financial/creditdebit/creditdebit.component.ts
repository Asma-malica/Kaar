import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CreditDebitMemo, CreditDebitService } from '../../services/creditdebit.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-creditdebit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './creditdebit.component.html',
  styleUrls: ['./creditdebit.component.css'],
})
export class CreditDebitComponent implements OnInit {
  customerId: string = '';
  memos: CreditDebitMemo[] = [];
  filteredMemos: CreditDebitMemo[] = [];
  searchTerm: string = '';
  sortKey: string = '';
  sortAscending: boolean = true;

  constructor(
    private creditDebitService: CreditDebitService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerId = this.authService.getCustomerId() || '';

    if (!this.customerId) {
      console.error('Customer ID not found. Redirecting to login.');
      this.router.navigate(['/login']);
      return;
    }

    this.loadMemos();
  }

  loadMemos(): void {
    this.creditDebitService.getCreditDebitMemos(this.customerId).subscribe({
      next: (response: CreditDebitMemo[]) => {
        this.memos = response;
        this.filteredMemos = [...this.memos];
        this.applySort();
      },
      error: (err: any) => {
        console.error('Error fetching credit/debit memos:', err);
        this.memos = [];
        this.filteredMemos = [];
      },
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      this.filteredMemos = [...this.memos];
      this.applySort();
      return;
    }

    this.filteredMemos = this.memos.filter(memo =>
      Object.values(memo).some(value =>
        String(value).toLowerCase().includes(term)
      )
    );
    this.applySort();
  }

  setSort(columnKey: string): void {
    if (this.sortKey === columnKey) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.sortKey = columnKey;
      this.sortAscending = true;
    }
    this.applySort();
  }

  applySort(): void {
    if (!this.sortKey) return;

    this.filteredMemos.sort((a, b) => {
      const valA = a[this.sortKey as keyof CreditDebitMemo];
      const valB = b[this.sortKey as keyof CreditDebitMemo];

      const numA = Number(valA);
      const numB = Number(valB);
      let compareResult = 0;

      if (!isNaN(numA) && !isNaN(numB)) {
        compareResult = numA - numB;
      } else {
        compareResult = String(valA).localeCompare(String(valB));
      }

      return this.sortAscending ? compareResult : -compareResult;
    });
  }

  trackByBillNo(index: number, item: CreditDebitMemo): string {
    return item.BILL_NO;
  }

  printTable(): void {
    const printContents = document.querySelector('.table-container')?.innerHTML;
    if (!printContents) return;

    const popupWin = window.open('', '_blank', 'width=900,height=700');
    if (!popupWin) return;

    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print Credit/Debit Memo Table</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              margin: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              font-size: 14px;
            }
            th, td {
              border: 1px solid #444;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #2962ff;
              color: white;
            }
            td {
              color: #333;
            }
          </style>
        </head>
        <body onload="window.print(); window.close();">${printContents}</body>
      </html>`);
    popupWin.document.close();
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
