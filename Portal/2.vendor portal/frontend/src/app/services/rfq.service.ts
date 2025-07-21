import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RfqService {
  private apiUrl = 'http://localhost:3000/api/rfq';

  constructor(private http: HttpClient) {}

  getRfqData(vendorId: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { VendorId: vendorId });
  }
}
