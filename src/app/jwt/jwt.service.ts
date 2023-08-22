import { Injectable } from '@angular/core';
import jwtDecode, { JwtPayload } from 'jwt-decode';

export const ACCESS_TOKEN = 'access_token';
export const REFRESH_TOKEN = 'refresh_token';

export class AuthenticationError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;
  cause?: unknown;

  constructor(name: string, message: string) {
    this.name = name;
    this.message = message;
  }
}

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  _userIdKey =
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier';
  _usernameKey = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';

  checkCurrentUser(): { userId: string; username: string } | null {
    const accessToken = this.getAccessToken();
    if (!accessToken) return null;
    const payload = jwtDecode<JwtPayload & { [key: string]: string }>(
      accessToken
    );
    return {
      userId: payload[this._userIdKey],
      username: payload[this._usernameKey],
    };
  }

  parseJwt(token: string) {
    return jwtDecode<JwtPayload>(token);
  }

  isTokenExpired(accessToken: string) {
    const payload = this.parseJwt(accessToken);
    const expiration = new Date(0);
    expiration.setUTCSeconds(payload.exp ?? 0);
    return new Date() > expiration;
  }

  checkIfTokenIsExpired(): boolean {
    const accessToken = this.getAccessToken();
    if (accessToken) {
      return this.isTokenExpired(accessToken);
    }
    return true;
  }

  writeToken(accessToken: string, refreshToken: string): void {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN);
  }

  removeToken(): void {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  }
}
