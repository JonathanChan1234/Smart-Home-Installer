import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { RegisterAction } from './register.action';

@Injectable()
export class RegisterEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) {}

  registerSubmitted$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RegisterAction.registerSubmitted),
      switchMap(({ username, password, email }) =>
        this.authService.register(email, username, password).pipe(
          switchMap(() => {
            return of(RegisterAction.registerSuccess());
          }),
          catchError((error) => of(RegisterAction.registerFailure({ error })))
        )
      )
    );
  });

  registerSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(RegisterAction.registerSuccess),
        tap(() => {
          this.snackBar.open('Registered successfully', undefined, {
            duration: 1000,
          });
          this.router.navigate(['home']);
        })
      );
    },
    { dispatch: false }
  );

  registerFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(RegisterAction.registerFailure),
        tap(({ error }) =>
          this.snackBar.open(error, undefined, { duration: 1000 })
        )
      );
    },
    { dispatch: false }
  );
}
