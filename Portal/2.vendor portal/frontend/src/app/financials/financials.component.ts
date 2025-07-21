import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-financials',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './financials.component.html',
  styleUrl: './financials.component.css'
})
export class FinancialsComponent {
  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([`/dashboard/financials/${path}`]);
  }
}
