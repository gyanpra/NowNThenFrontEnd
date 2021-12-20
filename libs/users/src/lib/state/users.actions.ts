import { createAction, props } from '@ngrx/store';
import { User } from '@nownthenfrontend/users';



export const buildUserSession = createAction('[Users] Build User Session');


export const buildUserSessionSuccess = createAction(
  '[Users] Build Users Session Success',
  props<{ user: User }>()
);

export const buildUserSessionFailure = createAction('[Users] Build Users Session Failure');
