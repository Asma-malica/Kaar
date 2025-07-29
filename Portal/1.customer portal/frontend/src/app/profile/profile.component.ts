import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Profile, ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  customerId: string = '';
  profile: Profile | null = null;
  loading: boolean = false;
  errorMsg: string = '';

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerId = this.authService.getCustomerId() || '';

    if (!this.customerId) {
      console.error('Customer ID not found, redirecting to login.');
      this.router.navigate(['/login']);
      return;
    }

    this.loadProfile();
  }

  loadProfile(): void {
    this.loading = true;
    this.errorMsg = '';
    this.profileService.getProfile(this.customerId).subscribe({
      next: (profileData: Profile) => {
        this.profile = profileData;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching profile:', err);
        this.errorMsg = 'Failed to load profile data. Please try again later.';
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
