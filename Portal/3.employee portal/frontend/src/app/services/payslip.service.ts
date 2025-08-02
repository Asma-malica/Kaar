import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface PayslipResponse {
  payslip: { [key: string]: string | number };
}

@Injectable({
  providedIn: 'root'
})
export class PayslipService {

  private baseUrl = 'http://localhost:3000/api/payslip';

  constructor(private http: HttpClient) {}

  getPayslip(employeeId: string): Observable<PayslipResponse> {
    return this.http.post<PayslipResponse>(this.baseUrl, { employeeId });
  }

  getPayslipPdf(employeeId: string): Observable<Blob> {
    const url = `${this.baseUrl}/pdf`;
    return this.http.post(url, { employeeId }, {
      responseType: 'blob',
      headers: new HttpHeaders({ 'Accept': 'application/pdf' })
    });
  }
}
