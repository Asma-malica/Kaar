import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface OverallSale {
  BILLING_DOC_NO: string;
  BILLING_DATE: string;
  CUSTOMER_ID: string;
  SALES_ORG: string;
  DISTRIBUTION_CHANNEL: string;
  DIVISION: string;
  CURRENCY: string;
  NET_VALUE: string;
  BILLING_TYPE: string;
  ITEM_NO: string;
  MATERIAL_NO: string;
  MATERIAL_DESC: string;
  BILLED_QTY: string;
  SALES_UNIT: string;
}

interface OverallSalesApiResponse {
  overallSales: OverallSale[];
}

@Injectable({
  providedIn: 'root',
})
export class OverallSalesService {
  private baseUrl = 'http://localhost:3000/api'; // Adjust to your backend URL

  constructor(private http: HttpClient) {}

  getOverallSales(customerId: string): Observable<OverallSale[]> {
    const url = `${this.baseUrl}/overallsales/${customerId}`;
    return this.http.post<OverallSalesApiResponse>(url, {}).pipe(
      map((res) => res.overallSales || [])
    );
  }
}
