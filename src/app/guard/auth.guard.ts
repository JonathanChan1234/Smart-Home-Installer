import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { JwtService } from '../jwt/jwt.service';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtService);
  const router = inject(Router);

  const path = state.url;
  const authenticated = !jwtService.checkIfTokenIsExpired();
  if (!authenticated) {
    const accessToken = jwtService.getAccessToken();
    const refreshToken = jwtService.getRefreshToken();
    if (!accessToken || !refreshToken) return pathHandler(false, path, router);
    return inject(AuthService)
      .refreshToken(accessToken, refreshToken)
      .pipe(
        map(() => pathHandler(true, path, router)),
        catchError(() => of(pathHandler(false, path, router)))
      );
  }
  return pathHandler(true, path, router);
};

const pathHandler = (authenticated: boolean, path: string, router: Router) => {
  if (path === '/register' || path === '/login' || path === '/') {
    return authenticated ? router.parseUrl('/home') : true;
  }
  return authenticated ? true : router.parseUrl('/login');
};
