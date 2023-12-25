import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ShadeState, shadeFeatureKey } from './shade.reducer';

const selectFeature = createFeatureSelector<ShadeState>(shadeFeatureKey);

const selectShadeStatus = createSelector(selectFeature, ({ status }) => status);
const selectShades = createSelector(selectFeature, ({ shades }) => shades);
const selectError = createSelector(selectFeature, ({ error }) => error);
const selectHandlingRequest = createSelector(
  selectFeature,
  ({ handlingRequest }) => handlingRequest
);
const selectRequestError = createSelector(
  selectFeature,
  ({ requestError }) => requestError
);

export const ShadeSelector = {
  selectShadeStatus,
  selectShades,
  selectError,
  selectHandlingRequest,
  selectRequestError,
};
