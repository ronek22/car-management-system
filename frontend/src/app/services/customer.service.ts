import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../models/models';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseUrl = `${environment.apiUrl}/customers`;

  constructor(private http: HttpClient) {
  }

  getCustomersList(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseUrl}/`);
  }
}
