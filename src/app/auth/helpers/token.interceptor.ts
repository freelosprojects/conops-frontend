import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'app/auth/service';

@Injectable({ providedIn: 'root' })
export class TokenInterceptor implements HttpInterceptor {

  constructor(private _authenticationService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this._authenticationService.currentUserValue;
    const isLogged = user && user.token;

    if (!isLogged) return next.handle(req);

    const reqClone = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user.token}`
      }
    });

    return next.handle(reqClone);
  }
}