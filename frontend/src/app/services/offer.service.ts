import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Offer} from '../models/models';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  baseUrl = `${environment.apiUrl}/offers`;

  constructor(private http: HttpClient) {
  }

  getOfferList(): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.baseUrl}/`);
  }
}
