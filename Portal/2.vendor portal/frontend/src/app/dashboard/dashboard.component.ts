import { Component } from '@angular/core';
import { Router, ActivatedRoute, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatCardModule, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  viewProfile() {
    this.router.navigate(['profile'], { relativeTo: this.route });
  }

  navigateTo(path: string) {
    this.router.navigate([path], { relativeTo: this.route });
  }
}
