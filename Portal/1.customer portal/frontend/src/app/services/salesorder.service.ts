import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface SalesOrder {
  ORDER_NO: string;        // maps backend ORDER_NO
  ORDER_DATE: string;
  MAT_CODE: string;        // maps backend MAT_CODE
  DESCRIPTION: string;
  ORDER_QTY: string;       // maps backend ORDER_QTY
  UNIT: string;
  STATUS: string;
  REQ_DEL_DATE: string;    // maps backend REQ_DEL_DATE
}

interface SalesOrderApiResponse {
  salesOrders: SalesOrder[];
}

@Injectable({
  providedIn: 'root',
})
export class SalesOrderService {
  private baseUrl = 'http://localhost:3000/api';  // Update to your backend URL

  constructor(private http: HttpClient) {}

  getSalesOrders(customerId: string): Observable<SalesOrder[]> {
    const url = `${this.baseUrl}/salesorder/${customerId}`;
    return this.http.post<SalesOrderApiResponse>(url, {}).pipe(
      map((res) => res.salesOrders || [])
    );
  }
}
