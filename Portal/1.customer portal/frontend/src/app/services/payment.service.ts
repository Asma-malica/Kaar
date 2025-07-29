import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Payment {
  BILLING_DOC_NO: string;
  BILLING_DATE: string;
  DUE_DATE: string;
  NET_VALUE: string;
  CURRENCY: string;
  AGING_DAYS: string;
}

interface PaymentApiResponse {
  payments: Payment[];
}

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private baseUrl = 'http://localhost:3000/api';  // Change as per your backend server

  constructor(private http: HttpClient) {}

  getPayments(customerId: string): Observable<Payment[]> {
    const url = `${this.baseUrl}/payment/${customerId}`;
    return this.http.post<PaymentApiResponse>(url, {}).pipe(
      map((res) => res.payments || [])
    );
  }
}
