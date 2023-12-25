import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, of, switchMap, tap } from 'rxjs';
import { DeviceService } from 'src/app/device/service/device.service';
import { HomeConfigurationSelector } from 'src/app/home-configuration/store/home-configuration.selector';
import { ShadeService } from '../service/shade.service';
import { ShadeAction } from './shade.action';

@Injectable()
export class ShadeEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private shadeService: ShadeService,
    private deviceService: DeviceService,
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar
  ) {}

  fetchShadeRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ShadeAction.fetchShadeRequest),
      concatLatestFrom(() =>
        this.store.select(HomeConfigurationSelector.selectHomeId)
      ),
      switchMap(([{ roomId }, homeId]) => {
        if (!homeId)
          return of(
            ShadeAction.fetchShadeFailure({ error: 'Missing home ID' })
          );
        return this.shadeService.fetchShadeInRoom(homeId, roomId).pipe(
          switchMap((shades) => of(ShadeAction.fetchShadeSuccess({ shades }))),
          catchError((error) => of(ShadeAction.fetchShadeFailure({ error })))
        );
      })
    );
  });

  addShadeRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ShadeAction.addShadeRequest),
      concatLatestFrom(() =>
        this.store.select(HomeConfigurationSelector.selectHomeId)
      ),
      exhaustMap(([{ dto }, homeId]) => {
        if (!homeId) {
          return of(ShadeAction.addShadeFailure({ error: 'Missing home ID' }));
        }
        return this.shadeService.createShade(homeId, dto).pipe(
          switchMap((shade) => of(ShadeAction.addShadeSuccess({ shade }))),
          catchError((error) => of(ShadeAction.addShadeFailure({ error })))
        );
      })
    );
  });

  addShadeSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ShadeAction.addShadeSuccess),
        tap(({ shade }) => {
          this.matDialog.closeAll();
          this.matSnackBar.open(
            `Add Shade ${shade.name} successfully`,
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

  editShadeRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ShadeAction.editShadeRequest),
      concatLatestFrom(() =>
        this.store.select(HomeConfigurationSelector.selectHomeId)
      ),
      exhaustMap(([{ shade, name, roomId }, homeId]) => {
        if (!homeId) {
          return of(ShadeAction.addShadeFailure({ error: 'Missing home ID' }));
        }
        return this.deviceService
          .updateDevice(homeId, shade.id, name, roomId)
          .pipe(
            switchMap(() =>
              of(ShadeAction.editShadeSuccess({ shade, name, roomId }))
            ),
            catchError((error) =>
              of(
                ShadeAction.editShadeFailure({
                  error: `Fail to edit shade. ${error}`,
                })
              )
            )
          );
      })
    );
  });

  editShadeSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ShadeAction.editShadeSuccess),
        tap(({ shade, name, roomId }) => {
          this.matDialog.closeAll();
          let message = '';
          if (shade.name !== name)
            message += `Change shade name to ${name} successfully.\n`;
          if (shade.roomId !== roomId) message += `Move device successfully`;
          this.matSnackBar.open(message, undefined, { duration: 3000 });
        })
      );
    },
    { dispatch: false }
  );

  deleteShadeRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ShadeAction.deleteShadeRequest),
      exhaustMap(({ shade }) =>
        this.deviceService.deleteDevice(shade.homeId, shade.id).pipe(
          switchMap(() => of(ShadeAction.deleteShadeSuccess({ shade }))),
          catchError((error) => of(ShadeAction.deleteShadeFailure({ error })))
        )
      )
    );
  });

  deleteShadeSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ShadeAction.deleteShadeSuccess),
        tap(({ shade }) => {
          this.matDialog.closeAll();
          this.matSnackBar.open(
            `Delete shade ${shade.name} successfully`,
            undefined,
            { duration: 3000 }
          );
        })
      );
    },
    { dispatch: false }
  );

  deleteShadeFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ShadeAction.deleteShadeFailure),
        tap(({ error }) => {
          this.matSnackBar.open(`Fail to delete shade. ${error}`, undefined, {
            duration: 3000,
          });
        })
      );
    },
    { dispatch: false }
  );
}
