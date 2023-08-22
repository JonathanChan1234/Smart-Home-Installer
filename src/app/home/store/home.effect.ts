import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, switchMap, tap } from 'rxjs';
import { HomeService } from '../service/home.service';
import { HomeAction } from './home.action';

@Injectable()
export class HomeEffects {
  constructor(
    private actions$: Actions,
    private homeService: HomeService,
    private snackBar: MatSnackBar,
    private matDialogRef: MatDialog
  ) {}

  fetchOwnerHomeList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HomeAction.fetchOwnerHomeList),
      switchMap(() =>
        this.homeService.fetchOwnerHome().pipe(
          switchMap((homes) =>
            of(HomeAction.fetchOwnerHomeListSuccess({ homes }))
          ),
          catchError((error) =>
            of(HomeAction.fetchOwnerHomeListFailure({ error }))
          )
        )
      )
    );
  });

  ownerCreateHome$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HomeAction.ownerCreateHome),
      switchMap(({ dto }) =>
        this.homeService.ownerCreateHome(dto).pipe(
          switchMap((home) => of(HomeAction.ownerCreateHomeSuccess({ home }))),
          catchError((error) =>
            of(HomeAction.ownerCreateHomeFailure({ error }))
          )
        )
      )
    );
  });

  ownerCreateHomeSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(HomeAction.ownerCreateHomeSuccess),
        tap(() => {
          this.snackBar.open('Create home successfully', undefined, {
            duration: 3000,
          });
          this.matDialogRef.closeAll();
        })
      );
    },
    { dispatch: false }
  );

  ownerEditHome$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HomeAction.ownerEditHome),
      switchMap(({ id, dto }) =>
        this.homeService.ownerEditHome(id, dto).pipe(
          switchMap(() => of(HomeAction.ownerEditHomeSuccess({ id, dto }))),
          catchError((error) => of(HomeAction.ownerEditHomeFailure({ error })))
        )
      )
    );
  });

  ownerEditHomeSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(HomeAction.ownerEditHomeSuccess),
        tap(() => {
          this.snackBar.open('Edit home successfully', undefined, {
            duration: 3000,
          });
          this.matDialogRef.closeAll();
        })
      );
    },
    { dispatch: false }
  );

  ownerDeleteHome$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HomeAction.ownerDeleteHome),
      switchMap(({ id }) =>
        this.homeService.ownerDeleteHome(id).pipe(
          switchMap(() => of(HomeAction.ownerDeleteHomeSuccess({ id }))),
          catchError(({ error }) =>
            of(HomeAction.ownerDeleteHomeFailure({ error }))
          )
        )
      )
    );
  });

  ownerDeleteHomeSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(HomeAction.ownerDeleteHomeSuccess),
        tap(() => {
          this.snackBar.open('Delete home successfully', undefined, {
            duration: 3000,
          });
          this.matDialogRef.closeAll();
        })
      );
    },
    { dispatch: false }
  );

  ownerDeleteHomeFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(HomeAction.ownerDeleteHomeFailure),
        tap(({ error }) => {
          this.snackBar.open(
            `Fail to delete home. Error: ${error}`,
            undefined,
            {
              duration: 3000,
            }
          );
          this.matDialogRef.closeAll();
        })
      );
    },
    { dispatch: false }
  );

  fetchInstallerHomeList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HomeAction.fetchInstallerHomeList),
      switchMap(() =>
        this.homeService.fetchInstallerHome().pipe(
          switchMap((homes) =>
            of(HomeAction.fetchInstallerHomeListSuccess({ homes }))
          ),
          catchError((error) =>
            of(HomeAction.fetchInstallerHomeListFailure({ error }))
          )
        )
      )
    );
  });

  installerJoinHome$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HomeAction.installerJoinHome),
      switchMap(({ id, password }) =>
        this.homeService.installerJoinHome(id, password).pipe(
          switchMap((home) =>
            of(HomeAction.installerJoinHomeSuccess({ home }))
          ),
          catchError((error) =>
            of(HomeAction.installerJoinHomeFailure({ error }))
          )
        )
      )
    );
  });

  installerJoinHomeSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(HomeAction.installerJoinHomeSuccess),
        tap(({ home }) => {
          this.snackBar.open(
            `Join Home ${home.name} successfully.`,
            undefined,
            {
              duration: 3000,
            }
          );
          this.matDialogRef.closeAll();
        })
      );
    },
    { dispatch: false }
  );

  installerRemoveHome$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HomeAction.installerRemoveHome),
      switchMap(({ id }) =>
        this.homeService.installerRemoveHome(id).pipe(
          switchMap(() => of(HomeAction.installerRemoveHomeSuccess({ id }))),
          catchError((error) =>
            of(HomeAction.installerRemoveHomeFailure({ error }))
          )
        )
      )
    );
  });

  installerRemoveHomeSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(HomeAction.installerRemoveHomeSuccess),
        tap(() => {
          this.snackBar.open(`Remove Home successfully.`, undefined, {
            duration: 3000,
          });
          this.matDialogRef.closeAll();
        })
      );
    },
    { dispatch: false }
  );

  installerRemoveHomeFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(HomeAction.installerRemoveHomeFailure),
        tap(({ error }) => {
          this.snackBar.open(
            `Fail to remove home. Error: ${error}`,
            undefined,
            {
              duration: 3000,
            }
          );
          this.matDialogRef.closeAll();
        })
      );
    },
    { dispatch: false }
  );
}
