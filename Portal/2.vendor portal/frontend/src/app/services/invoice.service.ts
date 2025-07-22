import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiUrl = 'http://localhost:3000/api/invoice';

  constructor(private http: HttpClient) {}

  getInvoices(vendorId: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { VendorId: vendorId });
  }
}