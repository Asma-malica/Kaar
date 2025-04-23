import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiURL = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  // Get the data
  getEmployee(): Observable<any> {
    return this.http.get<any>(this.apiURL);
  }

  // // Post the data
  // postEmployee(employee: any): Observable<any> {
  //   return this.http.post<any>(this.apiURL, employee);
  // }
}

