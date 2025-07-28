import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/api/login';

  constructor(private http: HttpClient) {}

  // ACCEPT object with VendorId and Password (matching backend)
  loginVendor(credentials: { VendorId: string; Password: string }) {
    return this.http.post(this.apiUrl, {
      VendorId: credentials.VendorId,
      Password: credentials.Password
    });
  }
}
