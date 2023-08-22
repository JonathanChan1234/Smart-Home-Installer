import { createAction, props } from '@ngrx/store';

const registerSuccess = createAction('[Register Component] registerSuccess');
const registerFailure = createAction(
  '[Register Component] registerFailure',
  props<{ error: string }>()
);
const registerSubmitted = createAction(
  '[Register Component] RegisterSubmitted',
  props<{ email: string; username: string; password: string }>()
);

export const RegisterAction = {
  registerSuccess,
  registerFailure,
  registerSubmitted,
};
