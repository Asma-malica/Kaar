import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OverallSale, OverallSalesService } from '../../services/overallsales.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-overallsales',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './overallsales.component.html',
  styleUrls: ['./overallsales.component.css'],
})
export class OverallSalesComponent implements OnInit {
  customerId: string = '';
  overallSales: OverallSale[] = [];
  filteredSales: OverallSale[] = [];
  searchTerm: string = '';
  sortKey: string = '';
  sortAscending: boolean = true;

  constructor(
    private overallSalesService: OverallSalesService,
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

    this.loadOverallSales();
  }

  loadOverallSales(): void {
    this.overallSalesService.getOverallSales(this.customerId).subscribe({
      next: (response: OverallSale[]) => {
        this.overallSales = response;
        this.filteredSales = [...this.overallSales];
        this.applySort();
      },
      error: (err: any) => {
        console.error('Error fetching overall sales:', err);
        this.overallSales = [];
        this.filteredSales = [];
      },
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      this.filteredSales = [...this.overallSales];
      this.applySort();
      return;
    }

    this.filteredSales = this.overallSales.filter((sale) =>
      Object.values(sale).some((value) =>
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

    this.filteredSales.sort((a, b) => {
      const valA = a[this.sortKey as keyof OverallSale];
      const valB = b[this.sortKey as keyof OverallSale];

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

  trackByBillingDocNo(index: number, item: OverallSale): string {
    return item.BILLING_DOC_NO;
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
          <title>Print Overall Sales Table</title>
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
      </html>
    `);
    popupWin.document.close();
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
