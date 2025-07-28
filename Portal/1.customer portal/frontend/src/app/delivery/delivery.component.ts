import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeliveryService, Delivery } from '../services/delivery.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css'],
})
export class DeliveryComponent implements OnInit {
  customerId: string = '';
  deliveries: Delivery[] = [];
  filteredDeliveries: Delivery[] = [];
  searchTerm: string = '';
  sortKey: string = '';

  constructor(
    private deliveryService: DeliveryService,
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

    this.loadDeliveries();
  }

  loadDeliveries(): void {
    this.deliveryService.getDeliveries(this.customerId).subscribe({
      next: (response) => {
        this.deliveries = response;
        this.filteredDeliveries = [...this.deliveries];
        this.applySort();
      },
      error: (err) => {
        console.error('Error fetching deliveries:', err);
        this.deliveries = [];
        this.filteredDeliveries = [];
      },
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      this.filteredDeliveries = [...this.deliveries];
      this.applySort();
      return;
    }

    this.filteredDeliveries = this.deliveries.filter((delivery) =>
      Object.values(delivery).some((value) =>
        String(value).toLowerCase().includes(term)
      )
    );
    this.applySort();
  }

  setSort(columnKey: string): void {
    if (this.sortKey === columnKey) {
      this.filteredDeliveries.reverse();
    } else {
      this.sortKey = columnKey;
      this.applySort();
    }
  }

  applySort(): void {
    if (!this.sortKey) return;

    this.filteredDeliveries.sort((a, b) => {
      const valA = a[this.sortKey as keyof Delivery];
      const valB = b[this.sortKey as keyof Delivery];

      const numA = Number(valA);
      const numB = Number(valB);
      if (!isNaN(numA) && !isNaN(numB)) {
        return numA - numB;
      }

      return String(valA).localeCompare(String(valB));
    });
  }

  trackByDeliveryNo(index: number, item: Delivery): string {
    return item.DELIVERY_NO;
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
          <title>Print Delivery Table</title>
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
