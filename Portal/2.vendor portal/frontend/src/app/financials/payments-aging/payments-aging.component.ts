import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { PaymentService } from '../../services/payment.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-payments-aging',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './payments-aging.component.html',
  styleUrl: './payments-aging.component.css',
  providers: [PaymentService]
})
export class PaymentsAgingComponent implements OnInit {
  payments: any[] = [];
  vendorId: string = '';
  searchTerm: string = '';
  sortAsc: boolean = true;

  constructor(
    private paymentService: PaymentService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.vendorId = this.authService.getVendorId() || '';
    if (this.vendorId) {
      this.paymentService.getPayments(this.vendorId).subscribe({
        next: (res: any) => {
          this.payments = res.data || [];
        },
        error: (err: any) => {
          console.error('❌ Error fetching payments:', err);
        }
      });
    }
  }

  parseDate(dateString: string): string {
    if (!dateString) return '';
    const timestamp = parseInt(dateString.replace(/[^\d]/g, ''), 10);
    return isNaN(timestamp) ? '' : new Date(timestamp).toLocaleDateString();
  }

  filteredPayments() {
    let filtered = this.payments.filter(payment =>
      payment.InvoiceNumber?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      payment.FiscalYear?.toString().includes(this.searchTerm)
    );

    return filtered.sort((a, b) => {
      const comparison = a.InvoiceNumber.localeCompare(b.InvoiceNumber);
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
