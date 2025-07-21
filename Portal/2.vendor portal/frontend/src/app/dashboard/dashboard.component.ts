import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatCardModule, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  vendorId: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.vendorId = this.authService.getVendorId() || '';
  }

  viewProfile() {
    this.router.navigate(['dashboard/profile']);
  }

  navigateTo(path: string) {
    this.router.navigate([`/dashboard/${path}`]);
  }
}
