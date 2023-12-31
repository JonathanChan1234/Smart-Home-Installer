import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, switchMap, tap } from 'rxjs';
import { FloorService } from '../service/floor/floor.service';
import { RoomService } from '../service/room/room.service';
import { HomeConfigurationAction } from './home-configuration.action';

@Injectable()
export class HomeConfigurationEffects {
  constructor(
    private actions$: Actions,
    private floorService: FloorService,
    private roomService: RoomService,
    private matSnackBar: MatSnackBar,
    private matDialog: MatDialog
  ) {}

  fetchHomeFloor$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HomeConfigurationAction.fetchHomeFloor),
      switchMap(({ homeId }) =>
        this.floorService.fetchFloorList(homeId).pipe(
          switchMap((floors) =>
            of(
              HomeConfigurationAction.fetchHomeFloorSuccess({
                floors: floors.map((floor) => ({
                  ...floor,
                  editLoading: false,
                  editMode: false,
                  showAddRoomForm: false,
                  addRoomLoading: false,
                  rooms: floor.rooms.map((room) => ({
                    ...room,
                    editMode: false,
                    editLoading: false,
                  })),
                })),
              })
            )
          ),
          catchError((error) =>
            of(HomeConfigurationAction.fetchHomeFloorFailure({ error }))
          )
        )
      )
    );
  });

  addFloorRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HomeConfigurationAction.addFloorRequest),
      switchMap(({ homeId, name }) =>
        this.floorService.createFloor(homeId, name).pipe(
          switchMap((floor) =>
            of(
              HomeConfigurationAction.addFloorSuccess({
                floor: {
                  ...floor,
                  editLoading: false,
                  editMode: false,
                  showAddRoomForm: false,
                  addRoomLoading: false,
                  rooms: [],
                },
              })
            )
          ),
          catchError((error) =>
            of(HomeConfigurationAction.addFloorFailure({ error }))
          )
        )
      )
    );
  });

  addFloorSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(HomeConfigurationAction.addFloorSuccess),
        tap(({ floor }) =>
          this.matSnackBar.open(`Create floor ${floor.name} successfully`)
        )
      );
    },
    { dispatch: false }
  );

  addFloorFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(HomeConfigurationAction.addFloorFailure),
        tap(({ error }) =>
          this.matSnackBar.open(`Fail to create floor. ${error}`)
        )
      );
    },
    { dispatch: false }
  );

  editFloorRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HomeConfigurationAction.editFloorRequest),
      switchMap(({ homeId, floorId, name }) =>
        this.floorService.editFloor(homeId, floorId, name).pipe(
          switchMap(() =>
            of(HomeConfigurationAction.editFloorSuccess({ floorId, name }))
          ),
          catchError((error) =>
            of(HomeConfigurationAction.editFloorFailure({ error, floorId }))
          )
        )
      )
    );
  });

  editFloorSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(HomeConfigurationAction.editFloorSuccess),
        tap(() =>
          this.matSnackBar.open('Edit floor name successfully', undefined, {
            duration: 3000,
          })
        )
      );
    },
    { dispatch: false }
  );

  editFloorFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(HomeConfigurationAction.editFloorFailure),
        tap(({ error }) =>
          this.matSnackBar.open(
            `Fail to edit floor name. ${error}`,
            undefined,
            {
              duration: 3000,
            }
          )
        )
      );
    },
    { dispatch: false }
  );

  deleteFloorRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HomeConfigurationAction.deleteFloorRequest),
      switchMap(({ homeId, floorId }) =>
        this.floorService.deleteFloor(homeId, floorId).pipe(
          switchMap(() =>
            of(HomeConfigurationAction.deleteFloorSuccess({ floorId }))
          ),
          catchError((error) =>
            of(HomeConfigurationAction.deleteFloorFailure({ error }))
          )
        )
      )
    );
  });

  deleteFloorSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(HomeConfigurationAction.deleteFloorSuccess),
        tap(() => {
          this.matDialog.closeAll();
          this.matSnackBar.open('Delete floor successfully', undefined, {
            duration: 3000,
          });
        })
      );
    },
    { dispatch: false }
  );

  deleteFloorFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(HomeConfigurationAction.deleteFloorFailure),
        tap(() => {
          this.matDialog.closeAll();
          this.matSnackBar.open('Fail to delete floor', undefined, {
            duration: 3000,
          });
        })
      );
    },
    { dispatch: false }
  );

  addRoomRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HomeConfigurationAction.addRoomRequest),
      switchMap(({ homeId, floorId, name }) =>
        this.roomService.createRoom(homeId, floorId, name).pipe(
          switchMap((room) =>
            of(HomeConfigurationAction.addRoomSuccess({ room }))
          ),
          catchError((error) =>
            of(HomeConfigurationAction.addRoomFailure({ floorId, error }))
          )
        )
      )
    );
  });

  addRoomSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(HomeConfigurationAction.addRoomSuccess),
        tap(() =>
          this.matSnackBar.open('Create Room successfully', undefined, {
            duration: 3000,
          })
        )
      );
    },
    { dispatch: false }
  );

  addRoomFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(HomeConfigurationAction.addRoomFailure),
        tap(({ error }) =>
          this.matSnackBar.open(`Fail to create room. ${error}`, undefined, {
            duration: 3000,
          })
        )
      );
    },
    { dispatch: false }
  );

  editRoomRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HomeConfigurationAction.editRoomRequest),
      switchMap(({ homeId, room, name }) =>
        this.roomService
          .updateRoom(homeId, room.floorId, {
            id: room.id,
            name,
            floorId: room.floorId,
          })
          .pipe(
            switchMap(() =>
              of(
                HomeConfigurationAction.editRoomSuccess({
                  room,
                  name,
                })
              )
            ),
            catchError((error) =>
              of(HomeConfigurationAction.editRoomFailure({ room, error }))
            )
          )
      )
    );
  });

  editRoomSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(HomeConfigurationAction.editRoomSuccess),
        tap(() =>
          this.matSnackBar.open(`Change room name successfully`, undefined, {
            duration: 3000,
          })
        )
      );
    },
    { dispatch: false }
  );

  editRoomFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(HomeConfigurationAction.editRoomFailure),
        tap(({ error }) =>
          this.matSnackBar.open(
            `Fail to change room name. ${error}`,
            undefined,
            {
              duration: 3000,
            }
          )
        )
      );
    },
    { dispatch: false }
  );

  deleteRoomRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HomeConfigurationAction.deleteRoomRequest),
      switchMap(({ homeId, room }) =>
        this.roomService.deleteRoom(homeId, room.floorId, room.id).pipe(
          switchMap(() =>
            of(HomeConfigurationAction.deleteRoomSuccess({ room }))
          ),
          catchError((error) =>
            of(HomeConfigurationAction.deleteRoomFailure({ room, error }))
          )
        )
      )
    );
  });

  deleteRoomSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(HomeConfigurationAction.deleteRoomSuccess),
        tap(({ room }) => {
          this.matDialog.closeAll();
          this.matSnackBar.open(
            `Delete room ${room.name} successfully`,
            undefined,
            { duration: 3000 }
          );
        })
      );
    },
    { dispatch: false }
  );

  deleteRoomFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(HomeConfigurationAction.deleteRoomFailure),
        tap(({ room, error }) =>
          this.matSnackBar.open(`Fail to delete room ${room.name}. ${error}`)
        )
      );
    },
    { dispatch: false }
  );
}
