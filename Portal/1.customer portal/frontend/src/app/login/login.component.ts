import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials = {
    CustomerId: '',
    Password: '',
  };

  loading = false;
  message = '';
  messageType: 'error' | 'success' | '' = '';

  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.credentials.CustomerId || !this.credentials.Password) {
      this.message = 'Please fill in all required fields.';
      this.messageType = 'error';
      return;
    }

    this.loading = true;
    this.message = '';
    this.messageType = '';

    this.loginService.loginCustomer(this.credentials).subscribe({
      next: (response) => {
        this.authService.setCustomerId(response.CustomerId);
        this.message = 'Login Successful! Redirecting to dashboard...';
        this.messageType = 'success';

        // Brief delay so the user sees success message before navigation
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1500);
      },
      error: (error) => {
        this.message = error.error?.message || 'Login failed. Please try again.';
        this.messageType = 'error';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
