import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PaymentService } from '../../services/payment.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-payments-aging',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, HttpClientModule],
  templateUrl: './payments-aging.component.html',
  styleUrl: './payments-aging.component.css',
  providers: [PaymentService]
})
export class PaymentsAgingComponent implements OnInit {
  payments: any[] = [];
  vendorId: string = '';

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
}
