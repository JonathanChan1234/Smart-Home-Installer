import { createAction, props } from '@ngrx/store';
import { Room } from '../models/room';
import { EditableType, FloorItem } from './home-configuration.reducer';

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

const setAddRoomFormVisibility = createAction(
  '[FloorItem Component] setAddRoomFormVisibility',
  props<{ floorId: string; show: boolean }>()
);

const addRoomRequest = createAction(
  '[FloorItem Component] addRoomRequest',
  props<{ homeId: string; floorId: string; name: string }>()
);

const addRoomSuccess = createAction(
  '[FloorItem Component] addRoomSuccess',
  props<{ room: Room }>()
);

const addRoomFailure = createAction(
  '[FloorItem Component] addRoomFailure',
  props<{ floorId: string; error: string }>()
);

const setRoomEditMode = createAction(
  '[RoomItem Component] setRoomEditMode',
  props<{ room: EditableType<Room>; editMode: boolean }>()
);

const editRoomRequest = createAction(
  '[RoomItem Component] editRoomRequest',
  props<{ homeId: string; room: EditableType<Room>; name: string }>()
);

const editRoomSuccess = createAction(
  '[RoomItem Component] editRoomSuccess',
  props<{ room: EditableType<Room>; name: string }>()
);

const editRoomFailure = createAction(
  '[RoomItem Component] editRoomFailure',
  props<{ room: EditableType<Room>; error: string }>()
);

const deleteRoomRequest = createAction(
  '[DeleteRoomDialog Component] deleteRoomRequest',
  props<{ homeId: string; room: Room }>()
);

const deleteRoomSuccess = createAction(
  '[DeleteRoomDialog Component] deleteRoomSuccess',
  props<{ room: Room }>()
);

const deleteRoomFailure = createAction(
  '[DeleteRoomDialog Component] deleteRoomFailure',
  props<{ room: Room; error: string }>()
);

const changeRoomFloor = createAction(
  '[FloorList Component] changeRoomFloor',
  props<{ roomId: string; oldFloorId: string; newFloorId: string }>()
);

const setCurrentHome = createAction(
  '[HomeConfiguration Item] setCurrentHome',
  props<{ homeId: string }>()
);

const setCurrentRoom = createAction(
  '[RoomItem Component] setCurrentRoom',
  props<{ roomId: string }>()
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
  setAddRoomFormVisibility,
  addRoomRequest,
  addRoomSuccess,
  addRoomFailure,
  setRoomEditMode,
  editRoomRequest,
  editRoomSuccess,
  editRoomFailure,
  deleteRoomRequest,
  deleteRoomSuccess,
  deleteRoomFailure,
  changeRoomFloor,
  setCurrentHome,
  setCurrentRoom,
};
