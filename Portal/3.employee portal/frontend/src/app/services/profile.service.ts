import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProfileData {
  EMPID: string;
  FIRST_NAME: string;
  LAST_NAME: string;
  DOB: string;
  GENDER: string;
  NATIONALITY: string;
  EMAIL: string;
  POSITION: string;
  ORG_UNIT: string;
  PAYROLL_AREA: string;
  EMPLOYEE_GROUP: string;
  COMPANY_CODE: string;
}

export interface ProfileResponse {
  message: string;
  profile: ProfileData;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/profile';

  fetchProfile(empId: string): Observable<ProfileResponse> {
    return this.http.post<ProfileResponse>(this.apiUrl, { empId });
  }
}
