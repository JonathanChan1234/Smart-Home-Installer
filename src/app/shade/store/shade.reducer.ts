import { createReducer, on } from '@ngrx/store';
import { Shade } from '../models/shade';
import { ShadeAction } from './shade.action';

export const shadeFeatureKey = 'shade';

export enum ShadeStatus {
  initial,
  loading,
  success,
  failure,
}

export type ShadeState = {
  status: ShadeStatus;
  shades: Shade[];
  error?: string;
  handlingRequest: boolean;
  requestError?: string;
};

const initialState: ShadeState = {
  status: ShadeStatus.initial,
  shades: [],
  handlingRequest: false,
};

export const shadeReducer = createReducer(
  initialState,
  on(
    ShadeAction.fetchShadeRequest,
    (state): ShadeState => ({ ...state, status: ShadeStatus.loading })
  ),
  on(
    ShadeAction.fetchShadeSuccess,
    (state, { shades }): ShadeState => ({
      ...state,
      status: ShadeStatus.success,
      shades,
    })
  ),
  on(
    ShadeAction.fetchShadeFailure,
    (state, { error }): ShadeState => ({
      ...state,
      status: ShadeStatus.failure,
      error,
    })
  ),
  on(
    ShadeAction.addShadeRequest,
    (state): ShadeState => ({
      ...state,
      handlingRequest: true,
    })
  ),
  on(
    ShadeAction.addShadeSuccess,
    (state, { shade }): ShadeState => ({
      ...state,
      handlingRequest: false,
      shades: state.shades.concat(shade),
    })
  ),
  on(
    ShadeAction.addShadeFailure,
    (state, { error }): ShadeState => ({
      ...state,
      handlingRequest: false,
      requestError: error,
    })
  ),
  on(
    ShadeAction.editShadeRequest,
    (state): ShadeState => ({
      ...state,
      handlingRequest: true,
    })
  ),
  on(
    ShadeAction.editShadeSuccess,
    (state, { shade, name, roomId }): ShadeState => {
      if (shade.roomId !== roomId)
        return {
          ...state,
          handlingRequest: false,
          shades: state.shades.filter((l) => l.id !== shade.id),
        };
      const shades = [...state.shades];
      const shadeIndex = shades.findIndex((l) => l.id === shade.id);
      if (shadeIndex === -1) return { ...state, handlingRequest: false };
      shades[shadeIndex] = { ...shades[shadeIndex], name };
      return {
        ...state,
        handlingRequest: false,
        shades,
      };
    }
  ),
  on(
    ShadeAction.editShadeFailure,
    (state, { error }): ShadeState => ({
      ...state,
      handlingRequest: false,
      requestError: error,
    })
  ),
  on(
    ShadeAction.deleteShadeRequest,
    (state): ShadeState => ({
      ...state,
      handlingRequest: true,
    })
  ),
  on(
    ShadeAction.deleteShadeSuccess,
    (state, { shade }): ShadeState => ({
      ...state,
      handlingRequest: false,
      shades: state.shades.filter((l) => l.id !== shade.id),
    })
  ),
  on(
    ShadeAction.deleteShadeFailure,
    (state, { error }): ShadeState => ({
      ...state,
      handlingRequest: false,
      requestError: error,
    })
  )
);
