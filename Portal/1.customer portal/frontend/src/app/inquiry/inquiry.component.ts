import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InquiryService, Inquiry } from '../services/inquiry.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-inquiry',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.css'],
})
export class InquiryComponent implements OnInit {
  customerId: string = '';
  inquiries: Inquiry[] = [];
  filteredInquiries: Inquiry[] = [];
  searchTerm: string = '';
  sortKey: string = '';

  constructor(
    private inquiryService: InquiryService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.customerId = this.authService.getCustomerId() || '';

    if (!this.customerId) {
      console.error('Customer ID not found. Redirecting to login.');
      this.router.navigate(['/login']);
      return;
    }

    this.loadInquiries();
  }

  loadInquiries(): void {
    this.inquiryService.getInquiries(this.customerId).subscribe({
      next: (response) => {
        this.inquiries = response;
        this.filteredInquiries = [...this.inquiries];
        this.applySort();
      },
      error: (err) => {
        console.error('Error fetching inquiries:', err);
        this.inquiries = [];
        this.filteredInquiries = [];
      },
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      this.filteredInquiries = [...this.inquiries];
      this.applySort();
      return;
    }

    this.filteredInquiries = this.inquiries.filter((inquiry) =>
      Object.values(inquiry).some((value) =>
        String(value).toLowerCase().includes(term)
      )
    );
    this.applySort();
  }

  setSort(columnKey: string): void {
    if (this.sortKey === columnKey) {
      // Toggle sort order
      this.filteredInquiries.reverse();
    } else {
      this.sortKey = columnKey;
      this.applySort();
    }
  }

  applySort(): void {
    if (!this.sortKey) return;

    this.filteredInquiries.sort((a, b) => {
      const valA = a[this.sortKey as keyof Inquiry];
      const valB = b[this.sortKey as keyof Inquiry];

      const numA = Number(valA);
      const numB = Number(valB);
      if (!isNaN(numA) && !isNaN(numB)) {
        return numA - numB;
      }

      return String(valA).localeCompare(String(valB));
    });
  }

  trackByInquiryNo(index: number, item: Inquiry): string {
    return item.INQUIRY_NO;
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
          <title>Print Inquiry Table</title>
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
