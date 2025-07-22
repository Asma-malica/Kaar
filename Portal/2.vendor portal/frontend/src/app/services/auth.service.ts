import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly VENDOR_ID_KEY = 'vendorId';

  setVendorId(id: string) {
    this.vendorId = id;
    localStorage.setItem(this.VENDOR_ID_KEY, id);
  }

  getVendorId(): string | null {
    if (!this.vendorId) {
      this.vendorId = localStorage.getItem(this.VENDOR_ID_KEY);
    }
    return this.vendorId;
  }

  clearVendorId() {
    this.vendorId = null;
    localStorage.removeItem(this.VENDOR_ID_KEY);
  }

  private vendorId: string | null = null;
}
