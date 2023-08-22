import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { baseURL } from 'src/app/config';
import { AuthenticationError, JwtService } from '../jwt/jwt.service';
import { TokenResponse } from './tokenResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly jwtService: JwtService
  ) {}

  login(userName: string, password: string): Observable<TokenResponse> {
    return this.httpClient
      .post<TokenResponse>(`${baseURL}/auth/login`, {
        userName,
        password,
      })
      .pipe(
        tap(({ accessToken, refreshToken }) =>
          this.jwtService.writeToken(accessToken, refreshToken)
        ),
        catchError(this.handleError)
      );
  }

  register(
    email: string,
    userName: string,
    password: string
  ): Observable<TokenResponse> {
    return this.httpClient
      .post<TokenResponse>(`${baseURL}/auth/register`, {
        email,
        userName,
        password,
      })
      .pipe(
        tap(({ accessToken, refreshToken }) =>
          this.jwtService.writeToken(accessToken, refreshToken)
        ),
        catchError(this.handleError)
      );
  }

  logout(refreshToken: string) {
    return this.httpClient
      .post(`${baseURL}/auth/logout`, { refreshToken })
      .pipe(
        tap(() => this.jwtService.removeToken()),
        catchError(this.handleError)
      );
  }

  refreshToken(
    accessToken: string,
    refreshToken: string
  ): Observable<TokenResponse> {
    return this.httpClient
      .post<TokenResponse>(`${baseURL}/auth/refreshToken`, {
        accessToken,
        refreshToken,
      })
      .pipe(
        tap(({ accessToken, refreshToken }) =>
          this.jwtService.writeToken(accessToken, refreshToken)
        ),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      if (error.status === 500) console.error(error);

      if (error instanceof AuthenticationError)
        return throwError(() => new Error(error.message));

      return throwError(() => new Error(error.error.message));
    }
    console.error(error);
    return throwError(() => new Error(error.message));
  }
}
