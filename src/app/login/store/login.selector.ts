import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginState, loginFeatureKey } from './login.reducer';

const selectFeature = createFeatureSelector<LoginState>(loginFeatureKey);

const selectLoginStatus = createSelector(selectFeature, ({ status }) => status);

export const LoginSelector = {
  selectLoginStatus,
};
