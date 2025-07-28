import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Inquiry {
  INQUIRY_NO: string;
  ITEM_DATE: string;
  MAT_CODE: string;
  DESCRIPTION: string;
  ORDER_QTY: string;
  UNIT: string;
  STATUS: string;
  REQ_DEL_DATE: string;
}

interface InquiryApiResponse {
  message: string;
  inquiries: Inquiry[];
}

@Injectable({
  providedIn: 'root',
})
export class InquiryService {
  private baseUrl = 'http://localhost:3000/api'; // Replace with your backend base URL

  constructor(private http: HttpClient) {}

  getInquiries(customerId: string): Observable<Inquiry[]> {
    // Assuming you POST to /inquiry/:customerId per your backend
    const url = `${this.baseUrl}/inquiry/${customerId}`;
    return this.http.post<InquiryApiResponse>(url, {}).pipe(
      map((res) => res.inquiries || [])
    );
  }
}
