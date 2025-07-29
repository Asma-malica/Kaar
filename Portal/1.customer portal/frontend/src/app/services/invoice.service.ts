import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Invoice {
  VBELN: string;       // Invoice Number
  FKDAT: string;       // Billing Date
  WAERK: string;       // Currency
  NETWR: string;       // Net amount
  KUNAG: string;       // Customer ID
  VKORG: string;       // Sales Organization
  KNUMV: string;       // Invoice Document Number
  FKART: string;       // Billing Type
  POSNR: string;       // Item number
  MATNR: string;       // Material number
  ARKTX: string;       // Material Description
  FKIMG: string;       // Quantity billed
  VRKME: string;       // Sales unit
  ITEM_NETWR: string;  // Item net value
  PRSDT: string;       // Pricing date
}

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getInvoices(customerId: string): Observable<Invoice[]> {
    const url = `${this.baseUrl}/invoices`;
    return this.http.post<Invoice[]>(url, { customerId });
  }

  downloadInvoicePDF(invoiceNumber: string): Observable<Blob> {
    const url = `${this.baseUrl}/invoices/pdf`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, { invoiceNumber }, { headers, responseType: 'blob' });
  }
}
