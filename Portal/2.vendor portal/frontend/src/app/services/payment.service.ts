import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:3000/api/payment';
  constructor(private http: HttpClient) {}
  getPayments(vendorId: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { VendorId: vendorId });
  }
}
