import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {
  private apiUrl = 'http://localhost:3000/api/purchaseorders';

  constructor(private http: HttpClient) {}

  getPurchaseOrders(vendorId: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { VendorId: vendorId });
  }
}
