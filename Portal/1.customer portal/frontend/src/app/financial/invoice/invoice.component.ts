import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Invoice, InvoiceService } from '../../services/invoice.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  customerId = '';
  invoices: Invoice[] = [];
  filteredInvoices: Invoice[] = [];
  searchTerm = '';
  sortKey: keyof Invoice | null = null; // null = no sorting yet
  sortAscending = true;
  loading = false;
  errorMsg = '';

  constructor(
    private invoiceService: InvoiceService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerId = this.authService.getCustomerId() || '';
    if (!this.customerId) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadInvoices();
  }

  loadInvoices(): void {
    this.loading = true;
    this.errorMsg = '';
    this.invoiceService.getInvoices(this.customerId).subscribe({
      next: (result: Invoice[]) => {
        this.invoices = result || [];
        this.filteredInvoices = [...this.invoices];
        this.applySort();
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Failed to load invoices. Please try again later.';
        this.loading = false;
      },
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredInvoices = [...this.invoices];
      this.applySort();
      return;
    }
    this.filteredInvoices = this.invoices.filter((invoice) =>
      Object.values(invoice).some((val) =>
        String(val).toLowerCase().includes(term)
      )
    );
    this.applySort();
  }

  setSort(columnKey: keyof Invoice | null): void {
    if (!columnKey) return;

    if (this.sortKey === columnKey) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.sortKey = columnKey;
      this.sortAscending = true;
    }
    this.applySort();
  }

  applySort(): void {
    if (!this.sortKey) return;

    this.filteredInvoices.sort((a, b) => {
      const valA = a[this.sortKey!];
      const valB = b[this.sortKey!];

      // Try numeric comparison if possible
      const numA = Number(valA);
      const numB = Number(valB);

      if (!isNaN(numA) && !isNaN(numB)) {
        return this.sortAscending ? numA - numB : numB - numA;
      }

      // Fallback to string comparison
      return this.sortAscending
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }

  trackByInvoiceNumber(_index: number, invoice: Invoice): string {
    return invoice.VBELN;
  }

  downloadPDF(invoiceNumber: string): void {
    this.invoiceService.downloadInvoicePDF(invoiceNumber).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `invoice_${invoiceNumber}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => {
        alert('Failed to download PDF. Please try again later.');
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
