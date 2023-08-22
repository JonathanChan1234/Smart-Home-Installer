import { createReducer } from '@ngrx/store';

export const registerFeatureKey = 'register';

export enum RegisterStatus {
  initial,
  loading,
  success,
  failure,
}

export type RegisterState = {
  status: RegisterStatus;
  requestError?: string;
};

const initialState: RegisterState = {
  status: RegisterStatus.initial,
};

export const registerReducer = createReducer(initialState);
