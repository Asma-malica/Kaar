import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface CreditDebitMemo {
  BILL_NO: string;
  BILL_DATE: string;
  BILL_TYPE: string;
  MAT_CODE: string;
  DESCRIPTION: string;
  QUANTITY: string;
  UNIT: string;
  NET_AMOUNT: string;
  CURRENCY: string;
}

interface CreditDebitApiResponse {
  memos: CreditDebitMemo[];
}

@Injectable({
  providedIn: 'root',
})
export class CreditDebitService {
  private baseUrl = 'http://localhost:3000/api';  // Set your backend base URL here

  constructor(private http: HttpClient) {}

  getCreditDebitMemos(customerId: string): Observable<CreditDebitMemo[]> {
    const url = `${this.baseUrl}/creditdebit/${customerId}`;
    return this.http.post<CreditDebitApiResponse>(url, {}).pipe(
      map(response => response.memos || [])
    );
  }
}
