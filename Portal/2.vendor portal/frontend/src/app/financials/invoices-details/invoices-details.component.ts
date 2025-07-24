import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceService } from '../../services/invoice.service';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-invoices-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './invoices-details.component.html',
  styleUrls: ['./invoices-details.component.css']
})
export class InvoicesDetailsComponent implements OnInit {
  invoices: any[] = [];
  loading = true;
  error = '';

  constructor(private invoiceService: InvoiceService, private authService: AuthService) {}

  ngOnInit(): void {
    const vendorId = this.authService.getVendorId();
    if (!vendorId) {
      this.error = 'Vendor ID not found. Please log in again.';
      this.loading = false;
      return;
    }

    const paddedVendorId = vendorId.toString().padStart(10, '0');
    console.log('[InvoicesDetailsComponent] Padded Vendor ID:', paddedVendorId);

    this.invoiceService.getInvoicesByVendor(paddedVendorId).subscribe({
      next: (data) => {
        this.invoices = data;
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
    return new Date(timestamp).toLocaleDateString();
  }

  downloadInvoice(belnr: string) {
    this.invoiceService.downloadInvoicePDF(belnr);
  }
}
