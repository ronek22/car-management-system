import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Broker} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class BrokerService {

  baseUrl = `${environment.apiUrl}/brokers`;

  constructor(private http: HttpClient) {
  }

  getBrokersList(): Observable<Broker[]> {
    return this.http.get<Broker[]>(`${this.baseUrl}/`);
  }
}
