import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import jwtDecode from 'jwt-decode';
import {User} from "../models/models";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;


  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') as string));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<User> {
    return this.http.post<any>(`${environment.apiUrl}/${environment.jwtLogin}`, {username, password})
      .pipe(
        map(response => {
          let currentUser: User;
          if (response.access) {
            currentUser = jwtDecode(response.access);
            currentUser.token = response.access;
            currentUser.refreshToken = response.refresh;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            this.currentUserSubject.next(currentUser);
          }
          // @ts-ignore
          return currentUser;
        }),
      );
  }

  refreshToken(): Observable<User> {
    console.log('this.currentUserValue.refreshToken');
    console.log(this.currentUserValue.refreshToken);
    const refreshToken = this.currentUserValue.refreshToken;
    return this.http.post<any>(`${environment.apiUrl}/${environment.jwtRefresh}`, {refresh: refreshToken})
      .pipe(
        map(response => {
          let currentUser: User;
          if (response.access) {
            currentUser = jwtDecode(response.access);
            currentUser.token = response.access;
            currentUser.refreshToken = response.refresh;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            this.currentUserSubject.next(currentUser);
          }
          // @ts-ignore
          return currentUser;
        }),
      );
  }

  logout(): void{
    localStorage.removeItem('currentUser');
    // @ts-ignore
    this.currentUserSubject.next(null);
  }
}
