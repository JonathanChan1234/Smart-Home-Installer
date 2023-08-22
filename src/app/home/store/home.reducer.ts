import { createReducer, on } from '@ngrx/store';
import { Home } from '../models/home';
import { HomeAction } from './home.action';

export const homeFeatureKey = 'home';

export enum HomeStatus {
  initial,
  loading,
  success,
  failure,
}

export interface HomeState {
  fetchOwnerHomeStatus: HomeStatus;
  ownerHome: Home[];
  fetchOwnerHomeError?: string;
  ownerCreateHome: {
    status: HomeStatus;
    error?: string;
  };
  ownerDeleteHome: {
    status: HomeStatus;
    error?: string;
  };
  installerJoinHome: {
    loading: boolean;
    error?: string;
  };
  installerRemoveHome: {
    loading: boolean;
    error?: string;
  };
  fetchInstallerHomeStatus: HomeStatus;
  installerHome: Home[];
  fetchInstallerHomeError?: string;
}

const initialState: HomeState = {
  fetchOwnerHomeStatus: HomeStatus.initial,
  ownerHome: [],
  ownerCreateHome: {
    status: HomeStatus.initial,
  },
  ownerDeleteHome: {
    status: HomeStatus.initial,
  },
  installerJoinHome: {
    loading: false,
  },
  installerRemoveHome: {
    loading: false,
  },
  fetchInstallerHomeStatus: HomeStatus.initial,
  installerHome: [],
};

export const homeReducer = createReducer(
  initialState,
  on(
    HomeAction.fetchOwnerHomeList,
    (state): HomeState => ({
      ...state,
      fetchOwnerHomeStatus: HomeStatus.loading,
    })
  ),
  on(
    HomeAction.fetchOwnerHomeListSuccess,
    (state, { homes }): HomeState => ({
      ...state,
      ownerHome: homes,
      fetchOwnerHomeStatus: HomeStatus.success,
      fetchOwnerHomeError: undefined,
    })
  ),
  on(
    HomeAction.fetchOwnerHomeListFailure,
    (state, { error }): HomeState => ({
      ...state,
      fetchOwnerHomeStatus: HomeStatus.failure,
      fetchOwnerHomeError: error,
    })
  ),
  on(
    HomeAction.ownerCreateHomeInit,
    (state): HomeState => ({
      ...state,
      ownerCreateHome: {
        status: HomeStatus.initial,
        error: undefined,
      },
    })
  ),
  on(
    HomeAction.ownerCreateHome,
    (state): HomeState => ({
      ...state,
      ownerCreateHome: {
        status: HomeStatus.loading,
        error: undefined,
      },
    })
  ),
  on(
    HomeAction.ownerCreateHomeSuccess,
    (state, { home }): HomeState => ({
      ...state,
      ownerHome: state.ownerHome.concat(home),
      ownerCreateHome: {
        status: HomeStatus.success,
      },
    })
  ),
  on(
    HomeAction.ownerCreateHomeFailure,
    (state, { error }): HomeState => ({
      ...state,
      ownerCreateHome: {
        status: HomeStatus.failure,
        error: error,
      },
    })
  ),
  on(
    HomeAction.ownerEditHomeInit,
    (state): HomeState => ({
      ...state,
      ownerCreateHome: {
        status: HomeStatus.initial,
        error: undefined,
      },
    })
  ),
  on(
    HomeAction.ownerEditHome,
    (state): HomeState => ({
      ...state,
      ownerCreateHome: {
        status: HomeStatus.loading,
        error: undefined,
      },
    })
  ),
  on(HomeAction.ownerEditHomeSuccess, (state, { id, dto }): HomeState => {
    const homeIndex = state.ownerHome.findIndex((home) => home.id === id);
    if (homeIndex === -1)
      return { ...state, ownerCreateHome: { status: HomeStatus.success } };
    const ownerHome = [...state.ownerHome];
    const home = ownerHome[homeIndex];
    ownerHome[homeIndex] = {
      ...home,
      name: dto.name,
      description: dto.description,
    };
    return {
      ...state,
      ownerHome: ownerHome,
      ownerCreateHome: {
        status: HomeStatus.success,
      },
    };
  }),
  on(
    HomeAction.ownerEditHomeFailure,
    (state, { error }): HomeState => ({
      ...state,
      ownerCreateHome: {
        status: HomeStatus.failure,
        error: error,
      },
    })
  ),
  on(
    HomeAction.ownerDeleteHomeInit,
    (state): HomeState => ({
      ...state,
      ownerDeleteHome: {
        status: HomeStatus.initial,
        error: undefined,
      },
    })
  ),
  on(
    HomeAction.ownerDeleteHome,
    (state): HomeState => ({
      ...state,
      ownerDeleteHome: {
        status: HomeStatus.loading,
        error: undefined,
      },
    })
  ),
  on(
    HomeAction.ownerDeleteHomeSuccess,
    (state, { id }): HomeState => ({
      ...state,
      ownerHome: state.ownerHome.filter((home) => home.id !== id),
      ownerDeleteHome: {
        status: HomeStatus.success,
      },
    })
  ),
  on(
    HomeAction.ownerDeleteHomeFailure,
    (state, { error }): HomeState => ({
      ...state,
      ownerDeleteHome: {
        status: HomeStatus.failure,
        error: error,
      },
    })
  ),
  on(
    HomeAction.fetchInstallerHomeList,
    (state): HomeState => ({
      ...state,
      fetchInstallerHomeStatus: HomeStatus.success,
    })
  ),
  on(
    HomeAction.fetchInstallerHomeListSuccess,
    (state, { homes }): HomeState => ({
      ...state,
      installerHome: homes,
      fetchInstallerHomeStatus: HomeStatus.success,
      fetchInstallerHomeError: undefined,
    })
  ),
  on(
    HomeAction.fetchInstallerHomeListFailure,
    (state, { error }): HomeState => ({
      ...state,
      fetchInstallerHomeStatus: HomeStatus.failure,
      fetchInstallerHomeError: error,
    })
  ),
  on(
    HomeAction.installerJoinHome,
    (state): HomeState => ({
      ...state,
      installerJoinHome: { loading: true, error: undefined },
    })
  ),
  on(
    HomeAction.installerJoinHomeSuccess,
    (state, { home }): HomeState => ({
      ...state,
      installerJoinHome: { loading: false, error: undefined },
      installerHome: state.installerHome.concat(home),
    })
  ),
  on(
    HomeAction.installerJoinHomeFailure,
    (state, { error }): HomeState => ({
      ...state,
      installerJoinHome: { loading: false, error },
    })
  ),
  on(
    HomeAction.installerRemoveHome,
    (state): HomeState => ({
      ...state,
      installerRemoveHome: { loading: true, error: undefined },
    })
  ),
  on(
    HomeAction.installerRemoveHomeSuccess,
    (state, { id }): HomeState => ({
      ...state,
      installerRemoveHome: { loading: false, error: undefined },
      installerHome: state.installerHome.filter((home) => home.id !== id),
    })
  ),
  on(
    HomeAction.installerRemoveHomeFailure,
    (state, { error }): HomeState => ({
      ...state,
      installerRemoveHome: { loading: false, error: error },
    })
  )
);
