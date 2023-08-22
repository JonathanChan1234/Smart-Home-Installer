import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { baseURL } from 'src/app/config';
import { AuthenticationError } from 'src/app/jwt/jwt.service';
import { Floor } from '../../models/floor';

@Injectable({
  providedIn: 'root',
})
export class FloorService {
  constructor(private httpClient: HttpClient) {}

  fetchFloorList(homeId: string): Observable<Floor[]> {
    return this.httpClient
      .get<Floor[]>(`${baseURL}/home/${homeId}/floor`)
      .pipe(catchError(this.handleError));
  }

  createFloor(homeId: string, name: string): Observable<Floor> {
    return this.httpClient
      .post<Floor>(`${baseURL}/home/${homeId}/floor`, {
        name,
      })
      .pipe(catchError(this.handleError));
  }

  editFloor(homeId: string, floorId: string, name: string): Observable<object> {
    return this.httpClient
      .put(`${baseURL}/home/${homeId}/floor/${floorId}`, { name })
      .pipe(catchError(this.handleError));
  }

  deleteFloor(homeId: string, floorId: string): Observable<object> {
    return this.httpClient
      .delete(`${baseURL}/home/${homeId}/floor/${floorId}`)
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
