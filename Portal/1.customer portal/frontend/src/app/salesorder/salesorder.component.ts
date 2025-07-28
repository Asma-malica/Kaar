import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalesOrderService, SalesOrder } from '../services/salesorder.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-salesorder',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './salesorder.component.html',
  styleUrls: ['./salesorder.component.css'],
})
export class SalesOrderComponent implements OnInit {
  customerId: string = '';
  salesOrders: SalesOrder[] = [];
  filteredSalesOrders: SalesOrder[] = [];
  searchTerm: string = '';
  sortKey: string = '';

  constructor(
    private salesOrderService: SalesOrderService,
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

    this.loadSalesOrders();
  }

  loadSalesOrders(): void {
    this.salesOrderService.getSalesOrders(this.customerId).subscribe({
      next: (response) => {
        console.log('Sales Orders Response:', response);
        this.salesOrders = response;
        this.filteredSalesOrders = [...this.salesOrders];
        this.applySort();
      },
      error: (err) => {
        console.error('Error fetching sales orders:', err);
        this.salesOrders = [];
        this.filteredSalesOrders = [];
      },
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      this.filteredSalesOrders = [...this.salesOrders];
      this.applySort();
      return;
    }

    this.filteredSalesOrders = this.salesOrders.filter((order) =>
      Object.values(order).some((value) =>
        String(value).toLowerCase().includes(term)
      )
    );
    this.applySort();
  }

  setSort(columnKey: string): void {
    if (this.sortKey === columnKey) {
      this.filteredSalesOrders.reverse();
    } else {
      this.sortKey = columnKey;
      this.applySort();
    }
  }

  applySort(): void {
    if (!this.sortKey) return;

    this.filteredSalesOrders.sort((a, b) => {
      const valA = a[this.sortKey as keyof SalesOrder];
      const valB = b[this.sortKey as keyof SalesOrder];

      const numA = Number(valA);
      const numB = Number(valB);
      if (!isNaN(numA) && !isNaN(numB)) {
        return numA - numB;
      }

      return String(valA).localeCompare(String(valB));
    });
  }

  trackByOrderNo(index: number, item: SalesOrder): string {
    return item.ORDER_NO;
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
          <title>Print Sales Order Table</title>
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
