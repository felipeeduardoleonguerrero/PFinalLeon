import { createAction, props } from '@ngrx/store';
import { Users } from 'src/app/sidenav/users/users';

export const loadUserss = createAction(
  '[Users] Load Userss'
);

export const loadUserssSuccess = createAction(
  '[Users] Load Userss Success',
  props<{ users: Users[] }>()
);

export const loadUserssFailure = createAction(
  '[Users] Load Userss Failure',
  props<{ error: any }>()
);

export const deleteUser = createAction (
  '[Users] delete user',
  props<{id:string}>()
);

export const postUser = createAction (
  '[Users] post user',
  props<{user:Users}>()
);

export const getDetailedUser = createAction (
  '[Users] getDetailed user',
  props<{id:string}>()
);

export const getDetailedUserSuccess = createAction (
  '[Users] getDetailed user success',
  props<{userDetailed:Users}>()
);