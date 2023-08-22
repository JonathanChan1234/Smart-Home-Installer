import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { LoginAction } from './login.action';

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) {}

  loginSubmitted$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginAction.loginSubmitted),
      switchMap(({ username, password }) =>
        this.authService.login(username, password).pipe(
          switchMap(() => {
            return of(LoginAction.loginSuccess());
          }),
          catchError((error) => of(LoginAction.loginFailure({ error })))
        )
      )
    );
  });

  loginSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(LoginAction.loginSuccess),
        tap(() => {
          this.snackBar.open('Success', undefined, { duration: 1000 });
          this.router.navigate(['home']);
        })
      );
    },
    { dispatch: false }
  );

  loginFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(LoginAction.loginFailure),
        tap(({ error }) =>
          this.snackBar.open(error, undefined, { duration: 1000 })
        )
      );
    },
    { dispatch: false }
  );
}
