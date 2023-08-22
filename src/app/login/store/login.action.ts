import { createAction, props } from '@ngrx/store';

const loginSuccess = createAction('[Login Component] loginSuccess');
const loginFailure = createAction(
  '[Login Component] loginFailure',
  props<{ error: string }>()
);
const loginSubmitted = createAction(
  '[Login Component] LoginSubmitted',
  props<{ username: string; password: string }>()
);

export const LoginAction = {
  loginSuccess,
  loginSubmitted,
  loginFailure,
};
