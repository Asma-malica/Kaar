import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button'; // Ensure MatButtonModule is imported
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule // Added MatButtonModule here if it wasn't already
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  vendorId: string = '';
  isSidebarCollapsed: boolean = false; // Initial state: sidebar is open by default on desktop

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.vendorId = this.authService.getVendorId() || '';
    // You can set initial collapse state here if desired, e.g., based on screen size
    // For "always visible hamburger and collapse in place", no specific init based on screen size is strictly needed here.
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  navigateTo(path: string) {
    this.router.navigate([`/dashboard/${path}`]);
    // No automatic sidebar collapse after navigation for this type of in-place collapse
  }

  viewProfile() {
    this.router.navigate(['dashboard/profile']);
  }

  logout() {
    this.authService.clearVendorId();
    this.router.navigate(['/login']);
  }
}