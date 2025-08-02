import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private loginService = inject(LoginService);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    empId: ['', Validators.required],
    password: ['', Validators.required]
  });

  loading = false;
  errorMessage = '';
  successMessage = '';

  get empId() {
    return this.loginForm.get('empId')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  onSubmit() {
  if (this.loginForm.invalid) {
    this.errorMessage = 'Please fill in all fields.';
    return;
  }

  this.errorMessage = '';
  this.successMessage = '';
  this.loading = true;

  const { empId, password } = this.loginForm.value;

  this.loginService.login(empId!, password!).subscribe({
    next: res => {
      this.loading = false;
      if (res.message === 'Login successful' && res.employee) {
        // Set auth flag
        this.authService.setAuthenticated(true);
        // Store employee ID in AuthService for dashboard usage
        this.authService.setEmployeeId(res.employee.empId || res.employee.id || empId!);
        this.successMessage = 'Login successful! Redirecting to dashboard...';

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1200);
      } else {
        this.errorMessage = res.message || 'Login failed.';
      }
    },
    error: err => {
      this.loading = false;
      this.errorMessage = err?.error?.message || 'Login failed. Please check your credentials.';
    }
  });
}



}
