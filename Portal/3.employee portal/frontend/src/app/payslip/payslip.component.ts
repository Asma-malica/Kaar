import { CommonModule } from '@angular/common'; 
import { Component, OnInit } from '@angular/core';
import { PayslipService } from '../services/payslip.service';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';
import { ViewEncapsulation } from '@angular/core';
interface PayslipData {
  [key: string]: string | number;
}

@Component({
  selector: 'app-payslip',
   standalone: true,
   imports: [CommonModule],  
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.css'],
  encapsulation: ViewEncapsulation.None 
})
export class PayslipComponent implements OnInit {

  payslip: PayslipData | null = null;
  payslipEntries: { key: string; value: string | number }[] = [];
  error = '';
  loading = false;
  pdfDownloading = false;
  employeeId = '';

  constructor(
    private payslipService: PayslipService,
    private authService: AuthService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.employeeId = this.authService.getEmployeeId();
    console.log('Employee ID:', this.employeeId); // Debug log

    if (!this.employeeId) {
      this.error = 'Employee ID not found. Please login again.';
      return;
    }
    this.fetchPayslip(this.employeeId);
  }

  fetchPayslip(employeeId: string): void {
    this.loading = true;
    this.error = '';
    this.payslipService.getPayslip(employeeId).subscribe({
      next: (resp: { payslip: PayslipData }) => {
        console.log('Payslip response:', resp); // Debug log
        this.payslip = resp.payslip;
        if (this.payslip) {
          this.payslipEntries = Object.entries(this.payslip).map(([key, value]) => ({
            key: this.formatLabel(key),
            value
          }));
        } else {
          this.payslipEntries = [];
        }
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error loading payslip:', err);
        this.error = 'Failed to load payslip data.';
        this.loading = false;
      }
    });
  }

  downloadPdf(): void {
    if (!this.payslip) return;
    this.pdfDownloading = true;
    this.payslipService.getPayslipPdf(this.employeeId).subscribe({
      next: (blob: Blob) => {
        this.pdfDownloading = false;
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `payslip_${this.employeeId}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err: any) => {
        console.error('Error downloading PDF:', err);
        this.pdfDownloading = false;
        this.error = 'Failed to download PDF.';
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  private formatLabel(key: string): string {
    return key
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, c => c.toUpperCase());
  }
}
