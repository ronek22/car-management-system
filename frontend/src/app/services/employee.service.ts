import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl = `${environment.apiUrl}/employees`;

  constructor(private http: HttpClient) {
  }

  getEmployeesList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/`);
  }
}
