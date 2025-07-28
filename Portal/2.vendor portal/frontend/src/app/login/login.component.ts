import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      VendorId: ['', Validators.required], // ✅ match backend key
      Password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.loginForm.invalid) {
      this.errorMessage = 'Please enter both Vendor ID and Password.';
      return;
    }

    this.isLoading = true;

   this.loginService.loginVendor(this.loginForm.value).subscribe({
  next: (response: any) => {
    const vendorId = response?.vendor?.VendorId || this.loginForm.value.VendorId;

    if (vendorId) {
      this.authService.setVendorId(vendorId);
      this.successMessage = 'Login successful! Redirecting to dashboard...';
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 1500);
    } else {
      this.errorMessage = 'Vendor ID not found in response.';
    }

    this.isLoading = false;
  },
  error: (error) => {
    this.errorMessage = error.error?.message || 'Login failed. Please try again.';
    console.error('Login Error:', error);
    this.isLoading = false;
  }
});



  }
}
