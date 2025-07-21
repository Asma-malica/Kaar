import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { GoodsReceiptService } from '../services/goodsreceipt.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-goods-receipt',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatCardModule, MatIconModule],
  templateUrl: './goods-receipt.component.html',
  styleUrl: './goods-receipt.component.css'
})
export class GoodsReceiptComponent implements OnInit {
  goodsReceipts: any[] = [];
  vendorId: string = '';

  constructor(private grService: GoodsReceiptService, private authService: AuthService) {}

  ngOnInit() {
    this.vendorId = this.authService.getVendorId() || '';
    if (this.vendorId) {
      this.grService.getGoodsReceipts(this.vendorId).subscribe({
        next: (res) => {
          this.goodsReceipts = res.data || [];
        },
        error: (err) => {
          console.error('❌ Error fetching Goods Receipts:', err);
        }
      });
    }
  }

  parseODataDate(dateString: string): string {
    const timestamp = parseInt(dateString?.match(/\d+/)?.[0] || '');
    if (!isNaN(timestamp)) {
      return new Date(timestamp).toLocaleDateString();
    }
    return dateString;
  }
}
