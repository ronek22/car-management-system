import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Offer } from '../models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  baseUrl = `${environment.apiUrl}/offers`;

  constructor(private http: HttpClient) {}

  getOfferList(params?: {}): Observable<any> {
    if (params) return this.http.get<any>(`${this.baseUrl}/`, params);
    return this.http.get<any>(`${this.baseUrl}/`);
  }

  getOfferDetail(id: number): Observable<Offer> {
    return this.http.get<Offer>(`${this.baseUrl}/${id}/`);
  }

  addOffer(offer: Offer): Observable<Offer> {
    return this.http.post<Offer>(`${this.baseUrl}/`, offer);
  }

  editOffer(offer: any): Observable<Offer> {
    return this.http.patch<Offer>(`${this.baseUrl}/${offer.id}/`, offer);
  }

  deleteOffer(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}/`);
  }
}
