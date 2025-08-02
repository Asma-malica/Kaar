import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule]
})
export class DashboardComponent {
  sidebarOpen = false;

  authService = inject(AuthService);
  router = inject(Router);

  // Use a getter to always get fresh employeeId from AuthService
  get employeeId(): string {
    return this.authService.getEmployeeId() || 'Employee';
  }

  openSidebar() {
    this.sidebarOpen = true;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToLeave() {
    this.closeSidebar();
    this.router.navigate(['/leave']);
  }

  goToPayslip() {
    this.closeSidebar();
    this.router.navigate(['/payslip']);
  }

  signOut() {
    this.authService.clearAuth();
    this.router.navigate(['/login']);
  }
}
