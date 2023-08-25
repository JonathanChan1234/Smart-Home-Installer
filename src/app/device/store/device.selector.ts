import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DeviceState, deviceFeatureKey } from './device.reducer';

const selectFeature = createFeatureSelector<DeviceState>(deviceFeatureKey);

const selectDeviceStatus = createSelector(
  selectFeature,
  ({ status }) => status
);

const selectDeviceCount = createSelector(
  selectFeature,
  ({ deviceCount }) => deviceCount
);

const selectError = createSelector(
  selectFeature,
  ({error}) => error
)

export const DeviceSelector = {
  selectDeviceCount,
  selectDeviceStatus,
  selectError,
};
