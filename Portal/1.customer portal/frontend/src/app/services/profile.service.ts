import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Profile {
  CustomerId: string;
  Name: string;
  Country: string;
  City: string;
  Pincode: string;
  Street: string;
  Email: string;
  Phone: string;
}

interface ProfileApiResponse {
  message: string;
  profile: Profile;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getProfile(customerId: string): Observable<Profile> {
    const url = `${this.baseUrl}/profile`;
    return this.http.post<ProfileApiResponse>(url, { CustomerId: customerId }).pipe(
      map(response => response.profile)
    );
  }
}
