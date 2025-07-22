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
import { AuthService } from '../services/auth.service'; // ✅ Import AuthService
import { MatIconModule } from '@angular/material/icon';

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

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private authService: AuthService // ✅ Inject AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      vendorId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginService.loginVendor(this.loginForm.value).subscribe({
        next: (response: any) => {
          console.log('✅ Login Successful:', response);

          const vendorId =
            response?.vendorId ||
            response?.data?.vendorId ||
            this.loginForm.value.vendorId;

          if (vendorId) {
            this.authService.setVendorId(vendorId);  // ✅ Store in AuthService
            this.router.navigate(['/dashboard']);
          } else {
            console.warn('⚠️ Vendor ID not found in response.');
            this.errorMessage = 'Vendor ID not found in response.';
          }
        },
        error: (error) => {
          console.error('❌ Login Failed:', error);
          this.errorMessage = error.error?.message || 'Login failed. Please try again.';
        }
      });
    }
  }
}
