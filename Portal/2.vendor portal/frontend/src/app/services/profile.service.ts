// profile.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private apiUrl = 'http://localhost:3000/api/profile';

  constructor(private http: HttpClient) {}

  getVendorProfile(VendorId: string) {
    return this.http.post<any>(this.apiUrl, { VendorId });
  }
}
