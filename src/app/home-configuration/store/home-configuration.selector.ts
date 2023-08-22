import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  HomeConfigurationState,
  homeConfigurationFeatureKey,
} from './home-configuration.reducer';

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

const selectAddFloorLoading = createSelector(
  selectFeature,
  ({ addFloor }) => addFloor.loading
);

const selectDeleteLoading = createSelector(
  selectFeature,
  ({ deleteLoading }) => deleteLoading
);

export const HomeConfigurationSelector = {
  selectFloorListStatus,
  selectFloorListError,
  selectFloorListEditMode,
  selectFloors,
  selectAddFloorLoading,
  selectDeleteLoading,
};
