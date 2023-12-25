import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, of, switchMap, tap } from 'rxjs';
import { DeviceService } from 'src/app/device/service/device.service';
import { HomeConfigurationSelector } from 'src/app/home-configuration/store/home-configuration.selector';
import { LightService } from '../service/light.service';
import { LightAction } from './light.action';

@Injectable()
export class LightEffects {
  constructor(
    private action$: Actions,
    private store: Store,
    private lightService: LightService,
    private deviceService: DeviceService,
    private matSnackBar: MatSnackBar,
    private matDialog: MatDialog
  ) {}

  fetchLightRequest$ = createEffect(() => {
    return this.action$.pipe(
      ofType(LightAction.fetchLightRequest),
      concatLatestFrom(() =>
        this.store.select(HomeConfigurationSelector.selectHomeId)
      ),
      switchMap(([{ roomId }, homeId]) => {
        if (!homeId)
          return of(
            LightAction.fetchLightFailure({ error: 'Missing home ID' })
          );
        return this.lightService.fetchLightInRoom(homeId, roomId).pipe(
          switchMap((lights) => of(LightAction.fetchLightSuccess({ lights }))),
          catchError((error) => of(LightAction.fetchLightFailure({ error })))
        );
      })
    );
  });

  addLightRequest$ = createEffect(() => {
    return this.action$.pipe(
      ofType(LightAction.addLightRequest),
      concatLatestFrom(() =>
        this.store.select(HomeConfigurationSelector.selectHomeId)
      ),
      exhaustMap(([{ dto }, homeId]) => {
        if (!homeId) {
          return of(LightAction.addLightFailure({ error: 'Missing home ID' }));
        }
        return this.lightService.createLight(homeId, dto).pipe(
          switchMap((light) => of(LightAction.addLightSuccess({ light }))),
          catchError((error) => of(LightAction.addLightFailure({ error })))
        );
      })
    );
  });

  addLightSuccess$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(LightAction.addLightSuccess),
        tap(({ light }) => {
          this.matDialog.closeAll();
          this.matSnackBar.open(
            `Add Light ${light.name} successfully`,
            undefined,
            {
              duration: 3000,
            }
          );
        })
      );
    },
    { dispatch: false }
  );

  editLightRequest$ = createEffect(() => {
    return this.action$.pipe(
      ofType(LightAction.editLightRequest),
      concatLatestFrom(() =>
        this.store.select(HomeConfigurationSelector.selectHomeId)
      ),
      exhaustMap(([{ light, name, roomId }, homeId]) => {
        if (!homeId) {
          return of(LightAction.addLightFailure({ error: 'Missing home ID' }));
        }
        return this.deviceService
          .updateDevice(homeId, light.id, name, roomId)
          .pipe(
            switchMap(() =>
              of(LightAction.editLightSuccess({ light, name, roomId }))
            ),
            catchError((error) =>
              of(
                LightAction.editLightFailure({
                  error: `Fail to edit light. ${error}`,
                })
              )
            )
          );
      })
    );
  });

  editLightSuccess$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(LightAction.editLightSuccess),
        tap(({ light, name, roomId }) => {
          this.matDialog.closeAll();
          let message = '';
          if (light.name !== name)
            message += `Change light name to ${name} successfully.\n`;
          if (light.roomId !== roomId) message += `Move device successfully`;
          this.matSnackBar.open(message, undefined, { duration: 3000 });
        })
      );
    },
    { dispatch: false }
  );

  deleteLightRequest$ = createEffect(() => {
    return this.action$.pipe(
      ofType(LightAction.deleteLightRequest),
      exhaustMap(({ light }) =>
        this.deviceService.deleteDevice(light.homeId, light.id).pipe(
          switchMap(() => of(LightAction.deleteLightSuccess({ light }))),
          catchError((error) => of(LightAction.deleteLightFailure({ error })))
        )
      )
    );
  });

  deleteLightSuccess$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(LightAction.deleteLightSuccess),
        tap(({ light }) => {
          this.matDialog.closeAll();
          this.matSnackBar.open(
            `Delete light ${light.name} successfully`,
            undefined,
            { duration: 3000 }
          );
        })
      );
    },
    { dispatch: false }
  );

  deleteLightFailure$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(LightAction.deleteLightFailure),
        tap(({ error }) => {
          this.matSnackBar.open(`Fail to delete light. ${error}`, undefined, {
            duration: 3000,
          });
        })
      );
    },
    { dispatch: false }
  );
}
