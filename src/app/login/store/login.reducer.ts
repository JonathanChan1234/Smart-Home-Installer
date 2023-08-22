import { createReducer, on } from '@ngrx/store';
import { LoginAction } from './login.action';

export const loginFeatureKey = 'login';

export enum LoginStatus {
  initial,
  loading,
  success,
  failure,
}

export interface LoginState {
  status: LoginStatus;
  requestError: string;
}

export const initialState: LoginState = {
  status: LoginStatus.initial,
  requestError: '',
};

export const loginReducer = createReducer(
  initialState,
  on(
    LoginAction.loginSubmitted,
    (state): LoginState => ({
      ...state,
      status: LoginStatus.loading,
    })
  ),
  on(
    LoginAction.loginSuccess,
    (state): LoginState => ({
      ...state,
      status: LoginStatus.success,
    })
  ),
  on(
    LoginAction.loginFailure,
    (state, { error }): LoginState => ({
      ...state,
      status: LoginStatus.failure,
      requestError: error,
    })
  )
);
