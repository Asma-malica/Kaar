import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-payments-aging',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatIconModule, FormsModule],
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
      payment.InvoiceNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      payment.FiscalYear.toString().includes(this.searchTerm)
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
}
