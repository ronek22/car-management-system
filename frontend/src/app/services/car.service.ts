import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Car} from '../models/models';

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

  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(`${this.baseUrl}/`, car);
  }

  editCar(car: Car): Observable<Car> {
    return this.http.put<Car>(`${this.baseUrl}/${car.id}/`, car);
  }

  deleteCar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
