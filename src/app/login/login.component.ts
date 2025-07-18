import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData = {
    customerId: '',
    password: '',
  };

  showPassword: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private http: HttpClient) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    const payload = {
      customerId: this.loginData.customerId,
      password: this.loginData.password,
    };

    this.http.post('/api/customer/login', payload).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.successMessage = 'Login successful! Redirecting...';
          this.errorMessage = '';
        } else {
          this.errorMessage = 'Invalid Customer ID or Password';
          this.successMessage = '';
        }
      },
      error: () => {
        this.errorMessage = 'Server error. Please try again later.';
        this.successMessage = '';
      },
    });
  }
}
