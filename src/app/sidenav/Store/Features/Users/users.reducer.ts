import { Action, createReducer, on } from '@ngrx/store';
import { Users } from 'src/app/sidenav/users/users';
import * as UsersActions from './users.actions';

export const usersFeatureKey = 'users';

export interface State {
  users: Users[],
  loading:boolean,
  userDetailed:any
}

export const initialState: State = {
  users:[],
  loading:true,
  userDetailed:{}
};

export const reducer = createReducer(
  initialState,
  on(UsersActions.loadUserss, (state) => {
    return {...state}
  }),
  on(UsersActions.loadUserssSuccess, (state, {users}) => {
    return {...state, users, loading:false}
  }),
  on(UsersActions.loadUserssFailure, (state, action) => state),
  on(UsersActions.getDetailedUserSuccess, (state, {userDetailed})=>{
    return {...state, userDetailed}
  })
);
