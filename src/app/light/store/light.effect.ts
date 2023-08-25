import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, of, switchMap, tap } from 'rxjs';
import { HomeConfigurationSelector } from 'src/app/home-configuration/store/home-configuration.selector';
import { LightService } from '../service/light.service';
import { LightAction } from './light.action';

@Injectable()
export class LightEffects {
  constructor(
    private action$: Actions,
    private store: Store,
    private lightService: LightService,
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
          this.matSnackBar.open(`Add Light ${light.name} successfully`);
        })
      );
    },
    { dispatch: false }
  );
}
