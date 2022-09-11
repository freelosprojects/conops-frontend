import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/auth/service';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TokenInterceptor implements HttpInterceptor {
  constructor(private _authenticationService: AuthenticationService, private _router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this._authenticationService.currentUserValue;
    const isLogged = user;

    if (!isLogged) return next.handle(req);

    const reqClone = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    return next.handle(reqClone).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401 || error.status === 403) {
            this._authenticationService.logout();
            this._router.navigate(['/pages/authentication/login-v2']);
          }
        }

        return throwError(error);
      })
    );
  }
}
