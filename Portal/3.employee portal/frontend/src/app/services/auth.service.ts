import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_KEY = 'employee_portal_auth';

  setAuthenticated(value: boolean) {
    localStorage.setItem(this.AUTH_KEY, value ? 'true' : 'false');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.AUTH_KEY) === 'true';
  }

  clearAuth() {
    localStorage.removeItem(this.AUTH_KEY);
  }
}
