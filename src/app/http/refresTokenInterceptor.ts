import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, throwError } from 'rxjs';
import { disallowedRoutes } from '../config';
import { AuthenticationError, JwtService } from '../jwt/jwt.service';
import { AuthService } from '../service/auth.service';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isDisallowedRoutes = disallowedRoutes.find(
      (route) => route === req.url
    );
    if (isDisallowedRoutes) return next.handle(req);
    const accessToken = this.jwtService.getAccessToken();
    const refreshToken = this.jwtService.getRefreshToken();
    if (this.jwtService.checkIfTokenIsExpired()) {
      if (!accessToken || !refreshToken)
        return throwError(
          () => new AuthenticationError('Unauthenticated', 'Missing token')
        );
      return this.authService.refreshToken(accessToken, refreshToken).pipe(
        switchMap(({ accessToken }) => {
          const newReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
          });
          return next.handle(newReq);
        })
      );
    }
    const newReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
    });
    return next.handle(newReq);
  }
}
