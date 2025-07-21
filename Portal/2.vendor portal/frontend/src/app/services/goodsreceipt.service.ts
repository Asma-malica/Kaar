import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoodsReceiptService {
  private apiUrl = 'http://localhost:3000/api/goodsreceipts';

  constructor(private http: HttpClient) {}

  getGoodsReceipts(vendorId: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { VendorId: vendorId });
  }
}
