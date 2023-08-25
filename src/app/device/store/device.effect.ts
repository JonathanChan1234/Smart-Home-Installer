import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, of, switchMap } from 'rxjs';
import { HomeConfigurationAction } from 'src/app/home-configuration/store/home-configuration.action';
import { HomeConfigurationSelector } from 'src/app/home-configuration/store/home-configuration.selector';
import { DeviceCount, mainCategories } from '../models/device-count';
import { DeviceService } from '../service/device.service';
import { DeviceAction } from './device.action';

const mapDeviceSubset = (devices: DeviceCount[]): DeviceCount[] => {
  const devicesSubset: DeviceCount[] = [];
  for (const category of mainCategories) {
    let count = 0;
    for (const device of devices) {
      if (device.mainCategory === category) {
        count = device.count;
      }
    }
    devicesSubset.push({ mainCategory: category, count });
  }
  return devicesSubset;
};

@Injectable()
export class DeviceEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private deviceService: DeviceService
  ) {}

  setCurrentRoom$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DeviceAction.fetchDeviceCountRequest),
      switchMap(({ roomId }) =>
        of(HomeConfigurationAction.setCurrentRoom({ roomId }))
      )
    );
  });

  fetchDeviceRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DeviceAction.fetchDeviceCountRequest),
      concatLatestFrom(() =>
        this.store.select(HomeConfigurationSelector.selectHomeId)
      ),
      switchMap(([{ roomId }, homeId]) => {
        if (!homeId)
          return of(
            DeviceAction.fetchDeviceCountFailure({ error: 'Missing home id' })
          );
        return this.deviceService.fetchDeviceCount(homeId, roomId).pipe(
          switchMap((deviceCount) =>
            of(
              DeviceAction.fetchDeviceCountSuccess({
                deviceCount: mapDeviceSubset(deviceCount),
              })
            )
          ),
          catchError((error) =>
            of(DeviceAction.fetchDeviceCountFailure({ error }))
          )
        );
      })
    );
  });
}
