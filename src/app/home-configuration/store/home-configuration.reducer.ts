import { createReducer, on } from '@ngrx/store';
import { Floor } from '../models/floor';
import { Room } from '../models/room';
import { HomeConfigurationAction } from './home-configuration.action';

export const homeConfigurationFeatureKey = 'homeConfiguration';

export enum HomeConfigurationFloorStatus {
  initial,
  loading,
  success,
  failure,
}

export type EditableType<T> = T & {
  editMode: boolean;
  editLoading: boolean;
};
export type FloorItem = Omit<EditableType<Floor>, 'rooms'> & {
  showAddRoomForm: boolean;
  addRoomLoading: boolean;
  rooms: EditableType<Room>[];
};

export interface HomeConfigurationState {
  status: HomeConfigurationFloorStatus;
  floors: FloorItem[];
  error?: string;
  editMode: boolean;
  deleteLoading: boolean;
  addFloor: {
    loading: boolean;
    error?: string;
  };
  homeId?: string;
  currentRoomId?: string;
}

const initialState: HomeConfigurationState = {
  status: HomeConfigurationFloorStatus.initial,
  floors: [],
  editMode: false,
  deleteLoading: false,
  addFloor: {
    loading: false,
  },
};

export const homeConfigurationReducer = createReducer(
  initialState,
  on(
    HomeConfigurationAction.fetchHomeFloor,
    (state): HomeConfigurationState => ({
      ...state,
      status: HomeConfigurationFloorStatus.loading,
    })
  ),
  on(
    HomeConfigurationAction.fetchHomeFloorSuccess,
    (state, { floors }): HomeConfigurationState => ({
      ...state,
      floors,
      error: undefined,
      status: HomeConfigurationFloorStatus.success,
    })
  ),
  on(
    HomeConfigurationAction.fetchHomeFloorFailure,
    (state, { error }): HomeConfigurationState => ({
      ...state,
      error,
      status: HomeConfigurationFloorStatus.failure,
    })
  ),
  on(
    HomeConfigurationAction.changeFloorListEditMode,
    (state, { editMode }): HomeConfigurationState => ({
      ...state,
      editMode,
    })
  ),
  on(
    HomeConfigurationAction.addFloorRequest,
    (state): HomeConfigurationState => ({
      ...state,
      addFloor: {
        loading: true,
      },
    })
  ),
  on(
    HomeConfigurationAction.addFloorSuccess,
    (state, { floor }): HomeConfigurationState => {
      const floors = [...state.floors, floor];
      return {
        ...state,
        floors,
        editMode: false,
        addFloor: {
          loading: false,
        },
      };
    }
  ),
  on(
    HomeConfigurationAction.addFloorFailure,
    (state, { error }): HomeConfigurationState => ({
      ...state,
      addFloor: {
        loading: false,
        error,
      },
    })
  ),
  on(
    HomeConfigurationAction.changeFloorItemEditMode,
    (state, { floorId, editMode }): HomeConfigurationState => ({
      ...state,
      floors: editFloors(state.floors, floorId, { editMode }),
    })
  ),
  on(
    HomeConfigurationAction.editFloorRequest,
    (state, { floorId, name }): HomeConfigurationState => {
      const floors = editFloors(state.floors, floorId, {
        editLoading: true,
        name,
      });
      return {
        ...state,
        floors,
      };
    }
  ),
  on(
    HomeConfigurationAction.editFloorSuccess,
    (state, { floorId, name }): HomeConfigurationState => {
      const floors = editFloors(state.floors, floorId, {
        editLoading: false,
        editMode: false,
        name,
      });
      return {
        ...state,
        floors,
      };
    }
  ),
  on(
    HomeConfigurationAction.editFloorFailure,
    (state, { floorId }): HomeConfigurationState => {
      const floors = editFloors(state.floors, floorId, { editLoading: false });
      return {
        ...state,
        floors,
      };
    }
  ),
  on(
    HomeConfigurationAction.deleteFloorRequest,
    (state): HomeConfigurationState => ({ ...state, deleteLoading: true })
  ),
  on(
    HomeConfigurationAction.deleteFloorSuccess,
    (state, { floorId }): HomeConfigurationState => ({
      ...state,
      floors: state.floors.filter((floor) => floor.id !== floorId),
      deleteLoading: false,
    })
  ),
  on(
    HomeConfigurationAction.deleteFloorFailure,
    (state): HomeConfigurationState => ({
      ...state,
      deleteLoading: false,
    })
  ),
  on(
    HomeConfigurationAction.setAddRoomFormVisibility,
    (state, { floorId, show: showAddRoomForm }): HomeConfigurationState => ({
      ...state,
      floors: editFloors(state.floors, floorId, { showAddRoomForm }),
    })
  ),
  on(
    HomeConfigurationAction.addRoomRequest,
    (state, { floorId }): HomeConfigurationState => ({
      ...state,
      floors: editFloors(state.floors, floorId, { addRoomLoading: true }),
    })
  ),
  on(
    HomeConfigurationAction.addRoomSuccess,
    (state, { room }): HomeConfigurationState => ({
      ...state,
      floors: editFloors(
        state.floors,
        room.floorId,
        {
          showAddRoomForm: false,
          addRoomLoading: false,
        },
        { ...room, editLoading: false, editMode: false }
      ),
    })
  ),
  on(
    HomeConfigurationAction.addRoomFailure,
    (state, { floorId }): HomeConfigurationState => ({
      ...state,
      floors: editFloors(state.floors, floorId, { addRoomLoading: false }),
    })
  ),
  on(
    HomeConfigurationAction.setRoomEditMode,
    (state, { room, editMode }): HomeConfigurationState => ({
      ...state,
      floors: editFloors(
        state.floors,
        room.floorId,
        {},
        { ...room, editMode },
        false
      ),
    })
  ),
  on(
    HomeConfigurationAction.editRoomRequest,
    (state, { room }): HomeConfigurationState => ({
      ...state,
      floors: editFloors(
        state.floors,
        room.floorId,
        {},
        { ...room, editLoading: true },
        false
      ),
    })
  ),
  on(
    HomeConfigurationAction.editRoomSuccess,
    (state, { room, name }): HomeConfigurationState => ({
      ...state,
      floors: editFloors(
        state.floors,
        room.floorId,
        {},
        { ...room, name, editLoading: false, editMode: false },
        false
      ),
    })
  ),
  on(
    HomeConfigurationAction.editRoomFailure,
    (state, { room }): HomeConfigurationState => ({
      ...state,
      floors: editFloors(
        state.floors,
        room.floorId,
        {},
        { ...room, editLoading: false },
        false
      ),
    })
  ),
  on(
    HomeConfigurationAction.deleteRoomRequest,
    (state): HomeConfigurationState => ({
      ...state,
      deleteLoading: true,
    })
  ),
  on(
    HomeConfigurationAction.deleteRoomSuccess,
    (state, { room }): HomeConfigurationState => ({
      ...state,
      deleteLoading: false,
      floors: editFloors(
        state.floors,
        room.floorId,
        {},
        { ...room, editLoading: false, editMode: false },
        true
      ),
    })
  ),
  on(
    HomeConfigurationAction.deleteRoomFailure,
    (state): HomeConfigurationState => ({
      ...state,
      deleteLoading: false,
    })
  ),
  on(
    HomeConfigurationAction.changeRoomFloor,
    (state, { roomId, oldFloorId, newFloorId }): HomeConfigurationState => {
      const oldFloorIndex = state.floors.findIndex(
        (floor) => floor.id === oldFloorId
      );
      if (oldFloorIndex === -1) return state;

      const newfloorIndex = state.floors.findIndex(
        (floor) => floor.id === newFloorId
      );
      // floor transferred does not exist
      if (newfloorIndex === -1) return state;

      const room = state.floors[oldFloorIndex].rooms.find(
        (room) => room.id === roomId
      );
      if (!room) return state;

      const floors = [...state.floors];
      const oldFloorRooms = floors[oldFloorIndex].rooms.filter(
        (room) => room.id !== roomId
      );
      floors[oldFloorIndex] = {
        ...floors[oldFloorIndex],
        rooms: oldFloorRooms,
      };

      const newFloorRooms = floors[newfloorIndex].rooms.concat(room);
      floors[newfloorIndex] = {
        ...floors[newfloorIndex],
        rooms: newFloorRooms,
      };
      return { ...state, floors };
    }
  ),
  on(
    HomeConfigurationAction.setCurrentRoom,
    (state, { roomId }): HomeConfigurationState => ({
      ...state,
      currentRoomId: roomId,
    })
  ),
  on(
    HomeConfigurationAction.setCurrentHome,
    (state, { homeId }): HomeConfigurationState => ({
      ...state,
      homeId,
    })
  )
);

const editFloors = (
  originalFloors: FloorItem[],
  floorId: string,
  params: Partial<FloorItem>,
  room?: EditableType<Room>,
  deleteRoom = false
): FloorItem[] => {
  // if the target floor id is not found, return the original obj
  const floorIndex = originalFloors.findIndex((floor) => floor.id === floorId);
  if (floorIndex === -1) return originalFloors;

  // copy the floors arr and reassign the properties of the target floor
  const floors = [...originalFloors];
  const floor = floors[floorIndex];

  // copy the rooms of the floor and reassign properties
  let rooms = [...floor.rooms];
  if (room != null) {
    const existingRoomIndex = floor.rooms.findIndex((r) => r.id === room?.id);
    if (existingRoomIndex === -1) {
      rooms = rooms.concat(room);
    } else if (deleteRoom) {
      rooms = rooms.filter((r) => r.id !== room.id);
    } else {
      rooms[existingRoomIndex] = room;
    }
  }

  floors[floorIndex] = {
    ...floor,
    ...params,
    rooms,
  };
  return floors;
};
