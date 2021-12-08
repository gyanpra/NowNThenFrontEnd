import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { User } from '@nownthenfrontend/users';

import * as UsersActions from './users.actions';
import { UsersEntity } from './users.models';

export const USERS_FEATURE_KEY = 'users';


export interface usersState{
  user: User,
  isAuthenticated: boolean;
}


export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: usersState;
}

export const initialUserState : usersState = {
  user: null as any,
  isAuthenticated: false
}

const usersReducer = createReducer(
  initialUserState,
  on(UsersActions.buildUserSession, (state) => ({  
    ...state,
    isAuthenticated: true
  })),
  on(UsersActions.buildUserSessionSuccess, (state,action) => ({  //updating the state based on the success action
    ...state,
    user: action.user,
    isAuthenticated: true
  })),
  on(UsersActions.buildUserSessionFailure, (state,action) => ({  //updating the state based on the failed action
    ...state,
    user: null as any,
    isAuthenticated: true
  }))

);

export function reducer(state: usersState | undefined, action: Action) {
  return usersReducer(state, action);
}
