import { createReducer, on } from '@ngrx/store';
import { DeviceCount } from '../models/device-count';
import { DeviceAction } from './device.action';

export const deviceFeatureKey = 'device';
export enum DeviceStatus {
  initial,
  loading,
  success,
  failure,
}

export interface DeviceState {
  status: DeviceStatus;
  deviceCount: DeviceCount[];
  error?: string;
}

const initialState: DeviceState = {
  status: DeviceStatus.initial,
  deviceCount: [],
};

export const deviceReducer = createReducer(
  initialState,
  on(
    DeviceAction.fetchDeviceCountRequest,
    (state): DeviceState => ({
      ...state,
      status: DeviceStatus.loading,
    })
  ),
  on(
    DeviceAction.fetchDeviceCountSuccess,
    (state, { deviceCount }): DeviceState => ({
      ...state,
      status: DeviceStatus.success,
      deviceCount,
    })
  ),
  on(
    DeviceAction.fetchDeviceCountFailure,
    (state, { error }): DeviceState => ({
      ...state,
      status: DeviceStatus.failure,
      error,
    })
  )
);
