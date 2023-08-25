import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { baseURL } from 'src/app/config';
import { AuthenticationError } from 'src/app/jwt/jwt.service';
import { CreateLightDto } from '../models/create-light-dto';
import { Light } from '../models/light';

@Injectable({
  providedIn: 'root',
})
export class LightService {
  constructor(private httpClient: HttpClient) {}

  fetchLightInRoom(homeId: string, roomId: string): Observable<Light[]> {
    return this.httpClient
      .get<Light[]>(`${baseURL}/home/${homeId}/light?roomId=${roomId}`)
      .pipe(catchError(this.handleError));
  }

  createLight(homeId: string, dto: CreateLightDto): Observable<Light> {
    return this.httpClient
      .post<Light>(`${baseURL}/home/${homeId}/light`, dto)
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
