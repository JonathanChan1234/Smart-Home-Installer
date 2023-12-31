import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { baseURL } from 'src/app/config';
import { AuthenticationError } from 'src/app/jwt/jwt.service';
import { DeviceCount } from '../models/device-count';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  constructor(private httpClient: HttpClient) {}

  fetchDeviceCount(homeId: string, roomId: string): Observable<DeviceCount[]> {
    return this.httpClient
      .get<DeviceCount[]>(
        `${baseURL}/home/${homeId}/device/count?roomId=${roomId}`
      )
      .pipe(catchError(this.handleError));
  }

  updateDevice(homeId: string, deviceId: string, name: string, roomId: string) {
    return this.httpClient
      .put(`${baseURL}/home/${homeId}/device/${deviceId}`, { name, roomId })
      .pipe(catchError(this.handleError));
  }

  deleteDevice(homeId: string, deviceId: string) {
    return this.httpClient
      .delete(`${baseURL}/home/${homeId}/device/${deviceId}`)
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
