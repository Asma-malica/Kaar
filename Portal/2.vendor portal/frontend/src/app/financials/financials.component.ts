import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-financials',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './financials.component.html',
  styleUrl: './financials.component.css'
})
export class FinancialsComponent implements OnInit {
  vendorId: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.vendorId = this.authService.getVendorId() || 'Unknown';
  }

  navigateTo(path: string) {
    this.router.navigate([`/dashboard/financials/${path}`]);
  }

  goBack(): void {
    window.history.back();
  }
}
