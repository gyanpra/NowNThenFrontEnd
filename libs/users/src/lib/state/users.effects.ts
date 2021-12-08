import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { UsersService } from '@nownthenfrontend/users';
import { catchError, concatMap, map, of } from 'rxjs';
import { LocalstorageService } from '../services/localstorage.service';
import * as UsersActions from './users.actions';
import * as UsersFeature from './users.reducer';




@Injectable()
export class UsersEffects {
  buildUserSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.buildUserSession),
      concatMap(() =>{
        if(this.localStorageService.isValidToken()) {
        const userId = this.localStorageService.getUserIdByToken();
        if (userId) {
          return this.usersService.getUser(userId).pipe(
            map((user) => {
              return UsersActions.buildUserSessionSuccess({ user : user });
            }),
            catchError(() => of (UsersActions.buildUserSessionFailure()))
            );
          } else {
              return of(UsersActions.buildUserSessionFailure());
          }
        } else {
          return of(UsersActions.buildUserSessionFailure());
        }
      })
    )
  );



constructor(
  private actions$: Actions,
  private usersService: UsersService,
  private localStorageService: LocalstorageService
) { }
}



//   constructor(private actions$: Actions, private localStorageService: LocalstorageService, private usersService:UsersService) {}
// }
