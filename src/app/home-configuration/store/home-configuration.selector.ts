import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  HomeConfigurationState,
  homeConfigurationFeatureKey,
} from './home-configuration.reducer';
import { Room } from '../models/room';

const selectFeature = createFeatureSelector<HomeConfigurationState>(
  homeConfigurationFeatureKey
);

const selectFloorListStatus = createSelector(
  selectFeature,
  ({ status }) => status
);

const selectFloorListError = createSelector(
  selectFeature,
  ({ error }) => error
);

const selectFloorListEditMode = createSelector(
  selectFeature,
  ({ editMode }) => editMode
);

const selectFloors = createSelector(selectFeature, ({ floors }) => floors);

const selectRooms = createSelector(selectFeature, ({ floors }) =>
  floors.reduce<Room[]>((acc, val) => acc.concat(val.rooms), [])
);

const selectAddFloorLoading = createSelector(
  selectFeature,
  ({ addFloor }) => addFloor.loading
);

const selectDeleteLoading = createSelector(
  selectFeature,
  ({ deleteLoading }) => deleteLoading
);

const selectCurrentRoom = createSelector(
  selectFeature,
  ({ currentRoomId }) => currentRoomId
);

const selectHomeId = createSelector(selectFeature, ({ homeId }) => homeId);

export const HomeConfigurationSelector = {
  selectFloorListStatus,
  selectFloorListError,
  selectFloorListEditMode,
  selectRooms,
  selectFloors,
  selectAddFloorLoading,
  selectDeleteLoading,
  selectCurrentRoom,
  selectHomeId,
};
