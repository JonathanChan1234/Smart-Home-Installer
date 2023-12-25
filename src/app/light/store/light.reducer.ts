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
      status: LightStatus.failure,
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
      handlingRequest: false,
      lights: state.lights.concat(light),
    })
  ),
  on(
    LightAction.addLightFailure,
    (state, { error }): LightState => ({
      ...state,
      handlingRequest: false,
      requestError: error,
    })
  ),
  on(
    LightAction.editLightRequest,
    (state): LightState => ({
      ...state,
      handlingRequest: true,
    })
  ),
  on(
    LightAction.editLightSuccess,
    (state, { light, name, roomId }): LightState => {
      if (light.roomId !== roomId)
        return {
          ...state,
          handlingRequest: false,
          lights: state.lights.filter((l) => l.id !== light.id),
        };
      const lights = [...state.lights];
      const lightIndex = lights.findIndex((l) => l.id === light.id);
      if (lightIndex === -1) return { ...state, handlingRequest: false };
      lights[lightIndex] = { ...lights[lightIndex], name };
      return {
        ...state,
        handlingRequest: false,
        lights,
      };
    }
  ),
  on(
    LightAction.editLightFailure,
    (state, { error }): LightState => ({
      ...state,
      handlingRequest: false,
      requestError: error,
    })
  ),
  on(
    LightAction.deleteLightRequest,
    (state): LightState => ({
      ...state,
      handlingRequest: true,
    })
  ),
  on(
    LightAction.deleteLightSuccess,
    (state, { light }): LightState => ({
      ...state,
      handlingRequest: false,
      lights: state.lights.filter((l) => l.id !== light.id),
    })
  ),
  on(
    LightAction.deleteLightFailure,
    (state, { error }): LightState => ({
      ...state,
      handlingRequest: false,
      requestError: error,
    })
  )
);
