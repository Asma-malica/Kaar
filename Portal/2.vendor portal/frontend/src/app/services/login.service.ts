import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/api/login';

  constructor(private http: HttpClient) {}

  loginVendor(credentials: { vendorId: string; password: string }) {
    return this.http.post(this.apiUrl, {
      VendorId: credentials.vendorId,
      Password: credentials.password
    });
  }
}
