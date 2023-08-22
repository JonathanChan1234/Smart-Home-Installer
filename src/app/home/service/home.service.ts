import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { baseURL } from 'src/app/config';
import { AuthenticationError } from 'src/app/jwt/jwt.service';
import { CreateHomeDto } from '../models/create-home-dto';
import { Home } from '../models/home';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private httpClient: HttpClient) {}

  fetchOwnerHome() {
    return this.httpClient
      .get<Home[]>(`${baseURL}/home/owner`)
      .pipe(catchError(this.handleError));
  }

  ownerCreateHome(dto: CreateHomeDto) {
    return this.httpClient
      .post<Home>(`${baseURL}/home`, dto)
      .pipe(catchError(this.handleError));
  }

  ownerEditHome(id: string, dto: CreateHomeDto) {
    return this.httpClient
      .put(`${baseURL}/home/${id}`, dto)
      .pipe(catchError(this.handleError));
  }

  ownerDeleteHome(id: string) {
    return this.httpClient
      .delete(`${baseURL}/home/${id}`)
      .pipe(catchError(this.handleError));
  }

  fetchInstallerHome() {
    return this.httpClient
      .get<Home[]>(`${baseURL}/home/installer`)
      .pipe(catchError(this.handleError));
  }

  installerJoinHome(homeId: string, password: string) {
    return this.httpClient
      .post<Home>(`${baseURL}/home/${homeId}/installer`, { password })
      .pipe(catchError(this.handleError));
  }

  installerRemoveHome(homeId: string) {
    return this.httpClient
      .delete(`${baseURL}/home/${homeId}/installer`)
      .pipe(catchError(this.handleError));
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
