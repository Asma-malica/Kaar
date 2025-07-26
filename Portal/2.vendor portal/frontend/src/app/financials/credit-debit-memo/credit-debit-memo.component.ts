import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CreditDebitService } from '../../services/creditdebit.service';
import { AuthService } from '../../services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-credit-debit-memo',
  standalone: true,
  imports: [CommonModule, MatCardModule,  HttpClientModule, FormsModule, MatToolbarModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './credit-debit-memo.component.html',
  styleUrl: './credit-debit-memo.component.css',
  providers: [CreditDebitService]
})
export class CreditDebitMemoComponent implements OnInit {
  creditDebits: any[] = [];
  vendorId: string = '';
  searchTerm: string = '';
  sortAsc: boolean = true;

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

  filteredMemos() {
    let filtered = this.creditDebits.filter(memo =>
      memo.MemoNumber?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      const comparison = a.MemoNumber.localeCompare(b.MemoNumber);
      return this.sortAsc ? comparison : -comparison;
    });
  }

  toggleSort() {
    this.sortAsc = !this.sortAsc;
  }

  printTable() {
    window.print();
  }
  goBack() {
  window.history.back();
}

}
