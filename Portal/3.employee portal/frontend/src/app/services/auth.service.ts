import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private employeeId: string = '';

  // Set Employee ID when login succeeds
  setEmployeeId(id: string): void {
    this.employeeId = id;
  }

  // Get the current Employee ID
  getEmployeeId(): string {
    return this.employeeId;
  }

  // Clear Employee ID on logout
  clearEmployeeId(): void {
    this.employeeId = '';
  }

  // Example auth management (if still needed)
  private readonly AUTH_KEY = 'employee_portal_auth';

  setAuthenticated(value: boolean): void {
    localStorage.setItem(this.AUTH_KEY, value ? 'true' : 'false');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.AUTH_KEY) === 'true';
  }

  clearAuth(): void {
    localStorage.removeItem(this.AUTH_KEY);
    this.clearEmployeeId();
  }
}
