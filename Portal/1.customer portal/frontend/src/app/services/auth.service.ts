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
}
