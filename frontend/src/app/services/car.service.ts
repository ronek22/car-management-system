import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Car} from "../models/models";

@Injectable({
  providedIn: 'root'
})
export class CarService {
  baseUrl = `${environment.apiUrl}/cars`;

  constructor(private http: HttpClient) {
  }

  getCarList(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.baseUrl}/`);
  }
}
