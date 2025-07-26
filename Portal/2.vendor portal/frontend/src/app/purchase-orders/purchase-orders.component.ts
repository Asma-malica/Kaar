import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Angular Material modules
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { PurchaseOrderService } from '../services/purchaseorder.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-purchase-orders',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './purchase-orders.component.html',
  styleUrl: './purchase-orders.component.css'
})
export class PurchaseOrdersComponent implements OnInit {
  purchaseOrderList: any[] = [];
  vendorId: string = '';

  searchTerm: string = '';
  sortAsc: boolean = true;

  constructor(private poService: PurchaseOrderService, private authService: AuthService) {}

  ngOnInit() {
    this.vendorId = this.authService.getVendorId() || '';
    if (this.vendorId) {
      this.poService.getPurchaseOrders(this.vendorId).subscribe({
        next: (res) => {
          this.purchaseOrderList = res.data || [];
        },
        error: (err) => {
          console.error('Error fetching Purchase Orders', err);
        }
      });
    }
  }

  formatDate(odataDate: string): string {
    const timestamp = parseInt(odataDate.replace(/\D/g, ''), 10);
    return new Date(timestamp).toLocaleDateString();
  }

  getFilteredAndSortedPOs() {
    let filtered = this.purchaseOrderList.filter(po =>
      po.PoNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      po.Material.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      const comparison = a.PoNumber.localeCompare(b.PoNumber);
      return this.sortAsc ? comparison : -comparison;
    });
  }

  toggleSort() {
    this.sortAsc = !this.sortAsc;
  }

  printPOs() {
    window.print();
  }

  goBack(): void {
    window.history.back();
  }
}
