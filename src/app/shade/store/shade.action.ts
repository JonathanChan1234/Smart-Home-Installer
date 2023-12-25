import { createAction, props } from '@ngrx/store';
import { CreateShadeDto } from '../models/create-shade-dto';
import { Shade } from '../models/shade';

const fetchShadeRequest = createAction(
  '[ShadeOverview Component] fetchShadeRequest',
  props<{ roomId: string }>()
);

const fetchShadeSuccess = createAction(
  '[ShadeOverview Component] fetchShadeSuccess',
  props<{ shades: Shade[] }>()
);

const fetchShadeFailure = createAction(
  '[ShadeOverview Component] fetchShadeFailure',
  props<{ error: string }>()
);

const addShadeRequest = createAction(
  '[AddShadeDialog Component] addLightRequest',
  props<{ dto: CreateShadeDto }>()
);

const addShadeSuccess = createAction(
  '[AddShadeDialog Component] addShadeSuccess',
  props<{ shade: Shade }>()
);

const addShadeFailure = createAction(
  '[AddShadeDialog Component] addShadeFailure',
  props<{ error: string }>()
);

const editShadeRequest = createAction(
  '[EditShadeDialog Component] editShadeRequest',
  props<{ shade: Shade; name: string; roomId: string }>()
);

const editShadeSuccess = createAction(
  '[EditShadeDialog Component] editShadeSuccess',
  props<{ shade: Shade; name: string; roomId: string }>()
);

const editShadeFailure = createAction(
  '[EditShadeDialog Component] editShadeFailure',
  props<{ error: string }>()
);

const deleteShadeRequest = createAction(
  '[DeleteShadeDialog Component] deleteShadeRequest',
  props<{ shade: Shade }>()
);

const deleteShadeSuccess = createAction(
  '[DeleteShadeDialog Component] deleteShadeSuccess',
  props<{ shade: Shade }>()
);

const deleteShadeFailure = createAction(
  '[DeleteShadeDialog Component] deleteShadeFailure',
  props<{ error: string }>()
);

export const ShadeAction = {
  fetchShadeRequest,
  fetchShadeSuccess,
  fetchShadeFailure,
  addShadeRequest,
  addShadeSuccess,
  addShadeFailure,
  editShadeRequest,
  editShadeSuccess,
  editShadeFailure,
  deleteShadeRequest,
  deleteShadeSuccess,
  deleteShadeFailure,
};
