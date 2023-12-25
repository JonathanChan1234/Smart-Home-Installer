import { createAction, props } from '@ngrx/store';
import { CreateLightDto } from '../models/create-light-dto';
import { Light } from '../models/light';

const fetchLightRequest = createAction(
  '[LightOverview Component] fetchLightRequest',
  props<{ roomId: string }>()
);

const fetchLightSuccess = createAction(
  '[LightOverview Component] fetchLightSuccess',
  props<{ lights: Light[] }>()
);

const fetchLightFailure = createAction(
  '[LightOverview Component] fetchLightFailure',
  props<{ error: string }>()
);

const addLightRequest = createAction(
  '[AddLightDialog Component] addLightRequest',
  props<{ dto: CreateLightDto }>()
);

const addLightSuccess = createAction(
  '[AddLightDialog Component] addLightSuccess',
  props<{ light: Light }>()
);

const addLightFailure = createAction(
  '[AddLightDialog Component] addLightFailure',
  props<{ error: string }>()
);

const editLightRequest = createAction(
  '[EditLightDialog Component] editLightRequest',
  props<{ light: Light; name: string; roomId: string }>()
);

const editLightSuccess = createAction(
  '[EditLightDialog Component] editLightSuccess',
  props<{ light: Light; name: string; roomId: string }>()
);

const editLightFailure = createAction(
  '[EditLightDialog Component] editLightFailure',
  props<{ error: string }>()
);

const deleteLightRequest = createAction(
  '[DeleteLightDialog Component] deleteLightRequest',
  props<{ light: Light }>()
);

const deleteLightSuccess = createAction(
  '[DeleteLightDialog Component] deleteLightSuccess',
  props<{ light: Light }>()
);

const deleteLightFailure = createAction(
  '[DeleteLightDialog Component] deleteLightFailure',
  props<{ error: string }>()
);

export const LightAction = {
  fetchLightRequest,
  fetchLightSuccess,
  fetchLightFailure,
  addLightRequest,
  addLightSuccess,
  addLightFailure,
  editLightRequest,
  editLightSuccess,
  editLightFailure,
  deleteLightRequest,
  deleteLightSuccess,
  deleteLightFailure,
};
