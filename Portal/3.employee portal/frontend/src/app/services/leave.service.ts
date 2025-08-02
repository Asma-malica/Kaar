import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LeaveItem {
  EMPID: string;
  SUBTYPE: string;
  ABWTG: string;         // Amount of leave taken
  START_DATE: string;
  END_DATE: string;
  QUOTA_TYPE: string;
  TIME_QUOTA: string;
  ABSENCE_TYPE: string;
  ABSENCE_QUOTA_TYPE: string;
  APPLY_DATE: string;
  FULLDAY: string;
}

export interface LeaveResponse {
  message: string;
  leaveData: LeaveItem[];
}

@Injectable({ providedIn: 'root' })
export class LeaveService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/leave';  // Backend endpoint

  fetchLeaves(empId: string): Observable<LeaveResponse> {
    return this.http.post<LeaveResponse>(this.apiUrl, { empId });
  }
}
