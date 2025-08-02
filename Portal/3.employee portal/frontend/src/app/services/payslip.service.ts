import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PayslipItem {
  EMPID: string;
  EMPNAME: string;
  GENDER: string;
  PAYROLL_AREA: string;
  COMPANY_CODE: string;
  COST_CENTER: string;
  BASIC_PAY: string;
  PAY_SCALE_TYPE: string;
  PAY_SCALE_AREA: string;
  PAY_GRADE: string;
  PAY_LEVEL: string;
  AMOUNT: string;
  CURRENCY: string;
  WAGETYPE: string;
  WORKING_HOURS: string;
}

export interface PayslipResponse {
  payslip: PayslipItem[];
}

@Injectable({
  providedIn: 'root',
})
export class PayslipService {
  private http = inject(HttpClient);
  private apiBaseUrl = 'http://localhost:3000/api/payslip';

  fetchPayslip(empId: string): Observable<PayslipResponse> {
    return this.http.post<PayslipResponse>(`${this.apiBaseUrl}`, { empId });
  }

  fetchPayslipPdf(empId: string): Observable<Blob> {
    // Request the PDF as a binary blob
    return this.http.post(`${this.apiBaseUrl}/pdf`, { empId }, { responseType: 'blob' });
  }
}
