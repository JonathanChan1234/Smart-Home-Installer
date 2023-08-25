import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LightState, lightFeatureKey } from './light.reducer';

const selectFeature = createFeatureSelector<LightState>(lightFeatureKey);

const selectLightStatus = createSelector(selectFeature, ({ status }) => status);
const selectLights = createSelector(selectFeature, ({ lights }) => lights);
const selectError = createSelector(selectFeature, ({ error }) => error);

const selectHandlingRequest = createSelector(
  selectFeature,
  ({ handlingRequest }) => handlingRequest
);
const selectRequestError = createSelector(
  selectFeature,
  ({ requestError }) => requestError
);

export const LightSelector = {
  selectLightStatus,
  selectLights,
  selectError,
  selectHandlingRequest,
  selectRequestError,
};
