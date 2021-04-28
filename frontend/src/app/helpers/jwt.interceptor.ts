import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {Observable,  throwError, BehaviorSubject} from 'rxjs';
import {catchError, switchMap, filter, take} from 'rxjs/operators';
import {AuthenticationService} from '../services/authentication.service';
import {environment} from '../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {
  }

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authenticationService.currentUserValue;
    const isLoggedIn = currentUser && currentUser.token;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isLoggedIn
      && isApiUrl
      && currentUser
      && request.url !== `${environment.apiUrl}/${environment.jwtRefresh}`
      && request.url !== `${environment.apiUrl}/${environment.jwtLogin}`
    ) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }

    return next.handle(request).pipe(catchError(error => {

      if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403)
        && request.url === `${environment.apiUrl}/${environment.jwtRefresh}`) {
        this.authenticationService.logout();
        return throwError(error);
      } else if (error instanceof HttpErrorResponse && error.status === 403) {
        return this.handle403Error(request, next);
      } else {
        return throwError(error);
      }
    }));
  }


  // tslint:disable-next-line:typedef
  private handle403Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authenticationService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.jwt);
          return next.handle(this.addToken(request, token.jwt));
        }));

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }

  // tslint:disable-next-line:typedef
  private addToken(request: HttpRequest<any>, token: string) {
    const currentUser = this.authenticationService.currentUserValue;
    return request.clone({
      setHeaders: {
        Authorization: `Bearer  ${currentUser.token}`
      }
    });
  }
}
