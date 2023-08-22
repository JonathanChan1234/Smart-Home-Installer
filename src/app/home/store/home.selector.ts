import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HomeState, homeFeatureKey } from './home.reducer';

const selectFeature = createFeatureSelector<HomeState>(homeFeatureKey);

const selectFetchOwnerHomeStatus = createSelector(
  selectFeature,
  ({ fetchOwnerHomeStatus }) => fetchOwnerHomeStatus
);

const selectFetchOwnerHomeError = createSelector(
  selectFeature,
  ({ fetchOwnerHomeError }) => fetchOwnerHomeError
);

const selectOwnerHome = createSelector(
  selectFeature,
  ({ ownerHome }) => ownerHome
);

const selectCreateHomeStatus = createSelector(
  selectFeature,
  ({ ownerCreateHome }) => ownerCreateHome.status
);

const selectCreateHomeError = createSelector(
  selectFeature,
  ({ ownerCreateHome }) => ownerCreateHome.error
);

const selectDeleteHomeStatus = createSelector(
  selectFeature,
  ({ ownerDeleteHome }) => ownerDeleteHome.status
);

const selectFetchInstallerHomeStatus = createSelector(
  selectFeature,
  ({ fetchInstallerHomeStatus }) => fetchInstallerHomeStatus
);

const selectFetchInstallerHomeError = createSelector(
  selectFeature,
  ({ fetchInstallerHomeError }) => fetchInstallerHomeError
);

const selectInstallerHome = createSelector(
  selectFeature,
  ({ installerHome }) => installerHome
);

const selectInstallerJoinHomeLoading = createSelector(
  selectFeature,
  ({ installerJoinHome }) => installerJoinHome.loading
);

const selectInstallerJoinHomeError = createSelector(
  selectFeature,
  ({ installerJoinHome }) => installerJoinHome.error
);

const selectInstallerRemoveHomeLoading = createSelector(
  selectFeature,
  ({ installerRemoveHome }) => installerRemoveHome.loading
);

export const HomeSelector = {
  selectFetchOwnerHomeStatus,
  selectFetchOwnerHomeError,
  selectOwnerHome,
  selectCreateHomeStatus,
  selectCreateHomeError,
  selectDeleteHomeStatus,
  selectFetchInstallerHomeStatus,
  selectFetchInstallerHomeError,
  selectInstallerHome,
  selectInstallerJoinHomeLoading,
  selectInstallerJoinHomeError,
  selectInstallerRemoveHomeLoading,
};
