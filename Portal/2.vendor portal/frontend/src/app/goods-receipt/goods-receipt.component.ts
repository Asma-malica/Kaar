import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { GoodsReceiptService } from '../services/goodsreceipt.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-goods-receipt',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatIconModule, FormsModule],
  templateUrl: './goods-receipt.component.html',
  styleUrl: './goods-receipt.component.css'
})
export class GoodsReceiptComponent implements OnInit {
  goodsReceipts: any[] = [];
  vendorId: string = '';
  searchTerm: string = '';
  sortAsc: boolean = true;

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

  filteredGoodsReceipts() {
    let filtered = this.goodsReceipts.filter(gr =>
      gr.Material.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      gr.PoNumber.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      const comparison = a.MaterialDoc.localeCompare(b.MaterialDoc);
      return this.sortAsc ? comparison : -comparison;
    });
  }

  toggleSort() {
    this.sortAsc = !this.sortAsc;
  }

  printTable() {
    window.print();
  }
}
