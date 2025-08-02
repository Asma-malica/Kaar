import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProfileService, ProfileData } from '../services/profile.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private profileService = inject(ProfileService);
  private authService = inject(AuthService);
  private router = inject(Router);

  employeeId = this.authService.getEmployeeId() ?? '';

  profile = signal<ProfileData | null>(null);
  loading = signal(true);
  error = signal('');

  ngOnInit() {
    if (!this.employeeId) {
      this.error.set('Employee ID not found. Please login again.');
      this.loading.set(false);
      return;
    }

    this.profileService.fetchProfile(this.employeeId).subscribe({
      next: (res) => {
        this.profile.set(res.profile);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err?.error?.message || 'Failed to load profile');
        this.loading.set(false);
      }
    });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
