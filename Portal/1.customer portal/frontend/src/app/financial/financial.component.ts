import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';  // Import Router
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-financial',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './financial.component.html',
  styleUrls: ['./financial.component.css'],
})
export class FinancialComponent implements OnInit {
  customerId = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.customerId = this.authService.getCustomerId() || '';
  }

  navigateTo(path: string): void {
    // Navigate to child route under 'dashboard/financial'
    this.router.navigate(['/dashboard/financial', path]);
  }
}
