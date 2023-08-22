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
      deleteLoading: true,
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
  )
);

const editFloors = (
  originalFloors: FloorItem[],
  id: string,
  params: Partial<FloorItem>
): FloorItem[] => {
  const floorIndex = originalFloors.findIndex((floor) => floor.id === id);
  if (floorIndex === -1) return originalFloors;
  const floors = [...originalFloors];
  const floor = floors[floorIndex];
  floors[floorIndex] = {
    ...floor,
    ...params,
  };
  return floors;
};
