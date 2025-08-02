import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PayslipService, PayslipItem } from '../services/payslip.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-payslip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.css'],
})
export class PayslipComponent implements OnInit {
  private payslipService = inject(PayslipService);
  private authService = inject(AuthService);
  private router = inject(Router);

  employeeId = this.authService.getEmployeeId() ?? '';

  payslip = signal<PayslipItem[]>([]);
  loading = signal(true);
  error = signal('');

  ngOnInit() {
    if (!this.employeeId) {
      this.error.set('No employee ID found. Please login again.');
      this.loading.set(false);
      return;
    }

    this.payslipService.fetchPayslip(this.employeeId).subscribe({
      next: (res) => {
        this.payslip.set(res.payslip ?? []);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err?.error?.message || 'Failed to load payslip.');
        this.loading.set(false);
      },
    });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  viewPdf() {
    this.payslipService.fetchPayslipPdf(this.employeeId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
      },
      error: () => {
        alert('Failed to load payslip PDF.');
      }
    });
  }
}
