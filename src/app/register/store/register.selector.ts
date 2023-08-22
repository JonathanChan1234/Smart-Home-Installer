import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  RegisterState,
  RegisterStatus,
  registerFeatureKey,
} from './register.reducer';

const selectFeature = createFeatureSelector<RegisterState>(registerFeatureKey);

const selectIsLoading = createSelector(
  selectFeature,
  ({ status }) => status == RegisterStatus.loading
);

export const RegisterSelector = {
  selectIsLoading,
};
