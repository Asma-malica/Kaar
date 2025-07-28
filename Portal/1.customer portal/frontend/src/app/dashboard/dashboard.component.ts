import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  customerId: string = '';
  sidebarOpen = false;

  constructor(private authService: AuthService, private router: Router) {
    this.customerId = this.authService.getCustomerId() || 'Guest';
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  navigateTo(routeKey: string): void {
    const routeMap: Record<string, string> = {
      inquiry: '/dashboard/inquiry',
      'salesorder': '/dashboard/salesorder',
      'delivery': '/dashboard/delivery',
      'financial': '/dashboard/financial',
    };
    const route = routeMap[routeKey] || '/dashboard';
    this.router.navigate([route]);
    this.sidebarOpen = false; // close sidebar after nav
  }

  goToProfile(): void {
    // Navigate to profile page (component to be created later)
    this.router.navigate(['/profile']);
  }

  logout(): void {
    if (this.authService.logout) {
      this.authService.logout();
    }
    this.router.navigate(['/login']);
  }

  // Close sidebar if click outside sidebar or hamburger
  @HostListener('document:click', ['$event.target'])
  onClick(target: HTMLElement): void {
    const clickedInsideSidebar =
      target.closest('.sidebar') || target.closest('.hamburger');
    if (!clickedInsideSidebar) {
      this.sidebarOpen = false;
    }
  }
}
