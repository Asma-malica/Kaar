import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PurchaseOrderService } from '../services/purchaseorder.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-purchase-orders',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatCardModule, MatIconModule],
  templateUrl: './purchase-orders.component.html',
  styleUrl: './purchase-orders.component.css'
})
export class PurchaseOrdersComponent implements OnInit {
  purchaseOrderList: any[] = [];
  vendorId: string = '';

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
}
