import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as UsersActions from './users.actions';
import { UsersService } from 'src/app/services/users.service';


@Injectable()
export class UsersEffects {

  loadUserFeatures$ = createEffect(()=>{
    return this.actions$.pipe( 
      ofType(UsersActions.loadUserss),
      mergeMap(() => this.usersService.getUsersList()
        .pipe(
          map(users => UsersActions.loadUserssSuccess({ users })),
          catchError(() => EMPTY)
        )
      )
    )
  })

  deleteStudents$=createEffect(()=>{
    return this.actions$.pipe(
      ofType(UsersActions.deleteUser),
      mergeMap((user) => this.usersService.removeUser(user.id)
        .pipe(
          map(() => UsersActions.loadUserss()),
          catchError(() => EMPTY)
        ))
      )
    }
  )

  postStudents$=createEffect(()=>{
    return this.actions$.pipe(
      ofType(UsersActions.postUser),
      mergeMap((user) => this.usersService.postUser(user.user)
        .pipe(
          map(() => UsersActions.loadUserss()),
          catchError(() => EMPTY)
        ))
      )
    }
  )

  getUserDetailed$=createEffect(()=>{
    return this.actions$.pipe(
      ofType(UsersActions.getDetailedUser),
      mergeMap((user) => this.usersService.getUserDetails(user.id)
        .pipe(
          map((userDetailed) => UsersActions.getDetailedUserSuccess({userDetailed})),
          catchError(() => EMPTY)
        ))
      )
    }
  )

  constructor(private actions$: Actions, private usersService:UsersService) {}
}
