import { createFeatureSelector, createSelector } from '@ngrx/store';
import { usersState, USERS_FEATURE_KEY} from './users.reducer';

// Lookup the 'Users' feature state managed by NgRx
export const getUsersState = createFeatureSelector<usersState>(USERS_FEATURE_KEY);

export const getUsers = createSelector(getUsersState,(state:usersState)=>state.user);

export const getUserIsAuthenticated = createSelector(getUsersState,(state:usersState)=>state.isAuthenticated);

