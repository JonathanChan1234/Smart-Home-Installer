import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { baseURL } from 'src/app/config';
import { AuthenticationError } from 'src/app/jwt/jwt.service';
import { Room } from '../../models/room';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private httpClient: HttpClient) {}

  createRoom(homeId: string, floorId: string, name: string): Observable<Room> {
    return this.httpClient
      .post<Room>(`${baseURL}/home/${homeId}/floor/${floorId}/room`, { name })
      .pipe(catchError(this.handleError));
  }

  updateRoom(
    homeId: string,
    floorId: string,
    room: { id: string; name: string; floorId: string }
  ): Observable<object> {
    return this.httpClient
      .put(`${baseURL}/home/${homeId}/floor/${floorId}/room/${room.id}`, {
        name: room.name,
        floorId: room.floorId,
      })
      .pipe(catchError(this.handleError));
  }

  deleteRoom(
    homeId: string,
    floorId: string,
    roomId: string
  ): Observable<object> {
    return this.httpClient
      .delete(`${baseURL}/home/${homeId}/floor/${floorId}/room/${roomId}`)
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
