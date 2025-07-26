import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { InvoiceService } from '../../services/invoice.service';
import { AuthService } from '../../services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-invoices-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule,  MatToolbarModule,   // ✅ Needed for <mat-toolbar>
    MatIconModule,      // ✅ Needed for <mat-icon>
    MatButtonModule,    // ✅ Needed for <button mat-icon-button>
    MatInputModule  ],
  templateUrl: './invoices-details.component.html',
  styleUrls: ['./invoices-details.component.css']
})
export class InvoicesDetailsComponent implements OnInit {
  invoices: any[] = [];
  filteredInvoices: any[] = [];
  vendorId: string = '';
  loading = true;
  error = '';
  searchTerm: string = '';
  sortAsc: boolean = true;

  constructor(private invoiceService: InvoiceService, private authService: AuthService) {}

  ngOnInit(): void {
    const vendorIdRaw = this.authService.getVendorId();

    if (!vendorIdRaw) {
      this.error = 'Vendor ID not found. Please log in again.';
      this.loading = false;
      return;
    }

    this.vendorId = vendorIdRaw.toString().padStart(10, '0');
    console.log('[InvoicesDetailsComponent] Padded Vendor ID:', this.vendorId);

    this.invoiceService.getInvoicesByVendor(this.vendorId).subscribe({
      next: (data) => {
        this.invoices = data || [];
        this.filterAndSort();
        this.loading = false;
      },
      error: (err) => {
        console.error('[InvoicesDetailsComponent] Error fetching invoices:', err);
        this.error = 'Failed to load invoices.';
        this.loading = false;
      }
    });
  }

  formatDate(dateString: string): string {
    const timestamp = parseInt(dateString.replace(/\/Date\((\d+)\)\//, '$1'));
    return isNaN(timestamp) ? dateString : new Date(timestamp).toLocaleDateString();
  }

  downloadInvoice(belnr: string): void {
    this.invoiceService.downloadInvoicePDF(belnr);
  }

  filterAndSort(): void {
    const term = this.searchTerm.toLowerCase();

    const filtered = this.invoices.filter(invoice =>
      invoice.InvoiceNo?.toLowerCase().includes(term)
    );

    this.filteredInvoices = filtered.sort((a, b) => {
      const comparison = a.InvoiceNo.localeCompare(b.InvoiceNo);
      return this.sortAsc ? comparison : -comparison;
    });
  }

  toggleSort(): void {
    this.sortAsc = !this.sortAsc;
    this.filterAndSort();
  }

  goBack(): void {
    window.history.back();
  }
}
