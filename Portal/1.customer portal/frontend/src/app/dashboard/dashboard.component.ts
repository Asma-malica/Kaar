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
      salesorder: '/dashboard/salesorder',
      delivery: '/dashboard/delivery',
      financial: '/dashboard/financial',
    };
    const route = routeMap[routeKey] || '/dashboard';
    this.router.navigate([route]);
    this.sidebarOpen = false; // close sidebar after navigation
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  signOut(): void {
    if (this.authService.logout) {
      this.authService.logout();
    }
    this.router.navigate(['/login']);
  }

  // Close sidebar if clicking outside sidebar or hamburger button
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clickedInsideSidebar = target.closest('.sidebar');
    const clickedHamburger = target.closest('.hamburger');

    if (!clickedInsideSidebar && !clickedHamburger && this.sidebarOpen) {
      this.sidebarOpen = false;
    }
  }
}
