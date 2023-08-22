import { createAction, props } from '@ngrx/store';
import { CreateHomeDto } from '../models/create-home-dto';
import { Home } from '../models/home';

const fetchOwnerHomeList = createAction(
  '[OwnerHomeList Component] fetchOwnerHomeListLoaded'
);

const fetchOwnerHomeListSuccess = createAction(
  '[OwnerHomeList Component] fetchOwnerHomeListSuccess',
  props<{ homes: Home[] }>()
);

const fetchOwnerHomeListFailure = createAction(
  '[OwnerHomeList Component] fetchOwnerHomeListFailure',
  props<{ error: string }>()
);

const ownerCreateHomeInit = createAction(
  '[CreateHomeDialog Component] ownerCreateHomeInit'
);

const ownerCreateHome = createAction(
  '[CreateHomeDialog Component] ownerCreateHome',
  props<{ dto: CreateHomeDto }>()
);

const ownerCreateHomeSuccess = createAction(
  '[CreateHomeDialog Component] ownerCreateHomeSuccess',
  props<{ home: Home }>()
);

const ownerCreateHomeFailure = createAction(
  '[CreateHomeDialog Component] ownerCreateHomeFailure',
  props<{ error: string }>()
);

const ownerEditHomeInit = createAction(
  '[CreateHomeDialog Component] ownerEditHomeInit'
);

const ownerEditHome = createAction(
  '[CreateHomeDialog Component] ownerEditHome',
  props<{ id: string; dto: CreateHomeDto }>()
);

const ownerEditHomeSuccess = createAction(
  '[CreateHomeDialog Component] ownerEditHomeSuccess',
  props<{ id: string; dto: CreateHomeDto }>()
);

const ownerEditHomeFailure = createAction(
  '[CreateHomeDialog Component] ownerEditHomeFailure',
  props<{ error: string }>()
);

const ownerDeleteHomeInit = createAction(
  '[DeleteHomeDialog Component] ownerDeleteHomeInit'
);

const ownerDeleteHome = createAction(
  '[DeleteHomeDialog Component] ownerDeleteHome',
  props<{ id: string }>()
);

const ownerDeleteHomeSuccess = createAction(
  '[DeleteHomeDialog Component] ownerDeleteHomeSuccess',
  props<{ id: string }>()
);

const ownerDeleteHomeFailure = createAction(
  '[DeleteHomeDialog Component] ownerDeleteHomeFailure',
  props<{ error: string }>()
);

const fetchInstallerHomeList = createAction(
  '[InstallerHomeList Component] fetchInstallerHomeListLoaded'
);

const fetchInstallerHomeListSuccess = createAction(
  '[InstallerHomeList Component] fetchInstallerHomeListSuccess',
  props<{ homes: Home[] }>()
);

const fetchInstallerHomeListFailure = createAction(
  '[InstallerHomeList Component] fetchInstallerHomeListFailure',
  props<{ error: string }>()
);

const installerJoinHome = createAction(
  '[InstallerJoinHomeDialog Component] installerJoinHome',
  props<{ id: string; password: string }>()
);

const installerJoinHomeSuccess = createAction(
  '[InstallerJoinHomeDialog Component] installerJoinHomeSuccess',
  props<{ home: Home }>()
);

const installerJoinHomeFailure = createAction(
  '[InstallerJoinHomeDialog Component] installerJoinHomeFailure',
  props<{ error: string }>()
);

const installerRemoveHome = createAction(
  '[InstallerRemoveHomeDialog Component] installerRemoveHome',
  props<{ id: string }>()
);

const installerRemoveHomeSuccess = createAction(
  '[InstallerRemoveHomeDialog Component] installerRemoveHomeSuccess',
  props<{ id: string }>()
);

const installerRemoveHomeFailure = createAction(
  '[InstallerRemoveHomeDialog Component] installerRemoveHomeFailure',
  props<{ error: string }>()
);

export const HomeAction = {
  fetchOwnerHomeList,
  fetchOwnerHomeListSuccess,
  fetchOwnerHomeListFailure,
  ownerCreateHomeInit,
  ownerCreateHome,
  ownerCreateHomeSuccess,
  ownerCreateHomeFailure,
  ownerEditHomeInit,
  ownerEditHome,
  ownerEditHomeSuccess,
  ownerEditHomeFailure,
  ownerDeleteHomeInit,
  ownerDeleteHome,
  ownerDeleteHomeSuccess,
  ownerDeleteHomeFailure,
  fetchInstallerHomeList,
  fetchInstallerHomeListSuccess,
  fetchInstallerHomeListFailure,
  installerJoinHome,
  installerJoinHomeSuccess,
  installerJoinHomeFailure,
  installerRemoveHome,
  installerRemoveHomeSuccess,
  installerRemoveHomeFailure,
};
