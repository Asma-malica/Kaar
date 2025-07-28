// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private customerId: string = '';

  setCustomerId(id: string) {
    this.customerId = id;
  }

  getCustomerId(): string {
    return this.customerId;
  }
  logout(): void {
    // Clear user data, tokens, etc.
    localStorage.removeItem('customerId');
    // Any other cleanup

    // Optional: you could also notify subscribers about logout here
  }
}
