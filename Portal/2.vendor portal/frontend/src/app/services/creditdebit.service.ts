import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditDebitService {
  private apiUrl = 'http://localhost:3000/api/creditdebit';

  constructor(private http: HttpClient) {}

  getCreditDebits(vendorId: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { VendorId: vendorId });
  }
}
