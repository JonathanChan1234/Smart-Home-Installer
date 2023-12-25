import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { baseURL } from 'src/app/config';
import { AuthenticationError } from 'src/app/jwt/jwt.service';
import { CreateShadeDto } from '../models/create-shade-dto';
import { Shade } from '../models/shade';

@Injectable({
  providedIn: 'root',
})
export class ShadeService {
  constructor(private httpClient: HttpClient) {}

  fetchShadeInRoom(homeId: string, roomId: string): Observable<Shade[]> {
    return this.httpClient
      .get<Shade[]>(`${baseURL}/home/${homeId}/shade?roomId=${roomId}`)
      .pipe(catchError(this.handleError));
  }

  createShade(homeId: string, dto: CreateShadeDto): Observable<Shade> {
    return this.httpClient
      .post<Shade>(`${baseURL}/home/${homeId}/shade`, dto)
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
