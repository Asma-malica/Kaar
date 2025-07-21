import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CreditDebitService } from '../../services/creditdebit.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-credit-debit-memo',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, HttpClientModule],
  templateUrl: './credit-debit-memo.component.html',
  styleUrl: './credit-debit-memo.component.css',
  providers: [CreditDebitService]
})
export class CreditDebitMemoComponent implements OnInit {
  creditDebits: any[] = [];
  vendorId: string = '';

  constructor(
    private creditDebitService: CreditDebitService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.vendorId = this.authService.getVendorId() || '';
    if (this.vendorId) {
      this.creditDebitService.getCreditDebits(this.vendorId).subscribe({
        next: (res: any) => {
          this.creditDebits = res.data || [];
        },
        error: (err: any) => {
          console.error('❌ Error fetching credit/debit memos:', err);
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
