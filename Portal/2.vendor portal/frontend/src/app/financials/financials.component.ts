import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-financials',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './financials.component.html',
  styleUrl: './financials.component.css'
})
export class FinancialsComponent {

  constructor(private router: Router) {}

  /**
   * Navigates to a specific financial sub-path within the dashboard.
   * @param path The sub-path to navigate to (e.g., 'invoices', 'payments-aging', 'credit-debit-memo').
   */
  navigateTo(path: string) {
    this.router.navigate([`/dashboard/financials/${path}`]);
  }
}