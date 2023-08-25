import { createReducer, on } from '@ngrx/store';
import { Light } from '../models/light';
import { LightAction } from './light.action';

export const lightFeatureKey = 'light';
export enum LightStatus {
  initial,
  loading,
  success,
  failure,
}

export interface LightState {
  status: LightStatus;
  lights: Light[];
  error?: string;
  handlingRequest: boolean;
  requestError?: string;
}

const initialState: LightState = {
  status: LightStatus.initial,
  lights: [],
  handlingRequest: false,
};

export const lightReducer = createReducer(
  initialState,
  on(
    LightAction.fetchLightRequest,
    (state): LightState => ({ ...state, status: LightStatus.loading })
  ),
  on(
    LightAction.fetchLightSuccess,
    (state, { lights }): LightState => ({
      ...state,
      status: LightStatus.success,
      lights,
    })
  ),
  on(
    LightAction.fetchLightFailure,
    (state, { error }): LightState => ({
      ...state,
      error,
    })
  ),
  on(
    LightAction.addLightRequest,
    (state): LightState => ({
      ...state,
      handlingRequest: true,
    })
  ),
  on(
    LightAction.addLightSuccess,
    (state, { light }): LightState => ({
      ...state,
      lights: state.lights.concat(light),
    })
  ),
  on(
    LightAction.addLightFailure,
    (state, { error }): LightState => ({
      ...state,
      requestError: error,
    })
  )
);
