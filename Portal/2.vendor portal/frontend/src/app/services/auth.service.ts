// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private vendorId: string | null = null;

  setVendorId(id: string) {
    this.vendorId = id;
  }

  getVendorId(): string | null {
    return this.vendorId;
  }

  clearSession() {
    this.vendorId = null;
  }
}
