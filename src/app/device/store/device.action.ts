import { createAction, props } from '@ngrx/store';
import { DeviceCount } from '../models/device-count';

const fetchDeviceCountRequest = createAction(
  '[DeviceOverview Component] fetchDeviceCountRequest',
  props<{ roomId: string }>()
);

const fetchDeviceCountSuccess = createAction(
  '[DeviceOverview Component] fetchDeviceCountSuccess',
  props<{ deviceCount: DeviceCount[] }>()
);

const fetchDeviceCountFailure = createAction(
  '[DeviceOverview Component] fetchDeviceCountFailure',
  props<{ error: string }>()
);

export const DeviceAction = {
  fetchDeviceCountRequest,
  fetchDeviceCountSuccess,
  fetchDeviceCountFailure,
};
