import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
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
    MatButtonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  vendorId: string = '';
  isSidebarCollapsed: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.vendorId = this.authService.getVendorId() || '';
  }

  navigateTo(path: string) {
    this.router.navigate([`/dashboard/${path}`]);
  }

  viewProfile() {
    this.router.navigate(['dashboard/profile']);
  }

  logout() {
    this.authService.clearVendorId();
    this.router.navigate(['/login']);
   
  }
}
