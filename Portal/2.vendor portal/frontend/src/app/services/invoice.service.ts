import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  private apiUrl = 'http://localhost:3000/api/invoice';

  constructor(private http: HttpClient) {}

  getInvoicesByVendor(vendorId: string): Observable<any[]> {
    console.log('[InvoiceService] Fetching invoices for vendor:', vendorId);
    return this.http.get<any[]>(`${this.apiUrl}?vendorId=${vendorId}`);
  }

  downloadInvoicePDF(belnr: string): void {
    const url = `http://localhost:3000/api/invoice/pdf/${belnr}`;
    window.open(url, '_blank');
  }
}
