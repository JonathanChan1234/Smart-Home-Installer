import { createAction, props } from '@ngrx/store';
import { FloorItem } from './home-configuration.reducer';

const fetchHomeFloor = createAction(
  '[FloorList Component] fetchHomeFloor',
  props<{ homeId: string }>()
);

const fetchHomeFloorSuccess = createAction(
  '[FloorList Component] fetchHomeFloorSuccess',
  props<{ floors: FloorItem[] }>()
);

const fetchHomeFloorFailure = createAction(
  '[FloorList Component] fetchHomeFloorFailure',
  props<{ error: string }>()
);

const changeFloorListEditMode = createAction(
  '[FloorList Component] changeFloorListEditMode',
  props<{ editMode: boolean }>()
);

const addFloorRequest = createAction(
  '[FloorList Component] addFloorRequest',
  props<{ homeId: string; name: string }>()
);

const addFloorSuccess = createAction(
  '[FloorList Component] addFloorSuccess',
  props<{ floor: FloorItem }>()
);

const addFloorFailure = createAction(
  '[FloorList Component] addFloorFailure',
  props<{ error: string }>()
);

const changeFloorItemEditMode = createAction(
  '[FloorItem Component] changeFloorItemEditMode',
  props<{ floorId: string; editMode: boolean }>()
);

const editFloorRequest = createAction(
  '[FloorItem Component] editFloorRequest',
  props<{ homeId: string; floorId: string; name: string }>()
);

const editFloorSuccess = createAction(
  '[FloorItem Component] editFloorSuccess',
  props<{ floorId: string; name: string }>()
);

const editFloorFailure = createAction(
  '[FloorItem Component] editFloorFailure',
  props<{ floorId: string; error: string }>()
);

const deleteFloorRequest = createAction(
  '[DeleteFloorDialog Component] deleteFloorRequest',
  props<{ homeId: string; floorId: string }>()
);

const deleteFloorSuccess = createAction(
  '[DeleteFloorDialog Component] deleteFloorSuccess',
  props<{ floorId: string }>()
);

const deleteFloorFailure = createAction(
  '[DeleteFloorDialog Component] deleteFloorFailure',
  props<{ error: string }>()
);

const changeRoomFloor = createAction(
  '[FloorList Component] changeRoomFloor',
  props<{ roomId: string; oldFloorId: string; newFloorId: string }>()
);

export const HomeConfigurationAction = {
  fetchHomeFloor,
  fetchHomeFloorSuccess,
  fetchHomeFloorFailure,
  changeFloorListEditMode,
  addFloorRequest,
  addFloorSuccess,
  addFloorFailure,
  changeFloorItemEditMode,
  editFloorRequest,
  editFloorSuccess,
  editFloorFailure,
  deleteFloorRequest,
  deleteFloorSuccess,
  deleteFloorFailure,
  changeRoomFloor,
};
