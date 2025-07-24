// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private vendorId: string = '';

  setVendorId(id: string): void {
    this.vendorId = id;
  }

  getVendorId(): string {
    return this.vendorId;
  }

  clearVendorId(): void {
    this.vendorId = '';
  }
}
