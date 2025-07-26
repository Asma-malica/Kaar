import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

// Services
import { GoodsReceiptService } from '../services/goodsreceipt.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-goods-receipt',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule
  ],
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
    const term = this.searchTerm.toLowerCase();
    const filtered = this.goodsReceipts.filter(gr =>
      gr.Material.toLowerCase().includes(term) ||
      gr.PoNumber.toLowerCase().includes(term)
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

  goBack(): void {
    window.history.back();
  }
}
