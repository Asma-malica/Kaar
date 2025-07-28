import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Delivery {
  DELIVERY_NO: string;
  DELIVERY_DATE: string;
  STATUS: string;
  GI_DATE: string;
  MAT_CODE: string;
  DESCRIPTION: string;
  DELIVERY_QTY: string;
  TARGET_QTY: string;
  UNIT: string;
}

interface DeliveryApiResponse {
  deliveries: Delivery[];
}

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  private baseUrl = 'http://localhost:3000/api'; // Adjust if needed

  constructor(private http: HttpClient) {}

  getDeliveries(customerId: string): Observable<Delivery[]> {
    const url = `${this.baseUrl}/delivery/${customerId}`;
    return this.http.post<DeliveryApiResponse>(url, {}).pipe(
      map((res) => res.deliveries || [])
    );
  }
}
