import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { InvoiceService } from '../../services/invoice.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-invoices-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatTableModule, HttpClientModule],
  templateUrl: './invoices-details.component.html',
  styleUrl: './invoices-details.component.css',
  providers: [InvoiceService]
})
export class InvoicesDetailsComponent implements OnInit {
  invoices: any[] = [];
  vendorId: string = '';

  displayedColumns: string[] = [
    'InvoiceNumber',
    'FiscalYear',
    'InvoiceDate',
    'PoNumber',
    'PoItem',
    'Material',
    'Quantity',
    'Amount'
  ];

  constructor(
    private invoiceService: InvoiceService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.vendorId = this.authService.getVendorId() || '';
    if (this.vendorId) {
      this.invoiceService.getInvoices(this.vendorId).subscribe({
        next: (res: any) => {
          this.invoices = res.data || [];
        },
        error: (err: any) => {
          console.error('❌ Error fetching invoices:', err);
        }
      });
    }
  }

  parseDate(dateString: string): string {
    if (!dateString) return '';
    const timestamp = parseInt(dateString.replace(/[^\d]/g, ''), 10);
    return isNaN(timestamp) ? '' : new Date(timestamp).toLocaleDateString();
  }
}