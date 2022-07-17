import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsers from './users.reducer';

export const selectUsersState = createFeatureSelector<fromUsers.State>(
  fromUsers.usersFeatureKey
);

export const selectUsers=createSelector(
  selectUsersState,
  (state)=>state.users
);

export const selectLoading=createSelector(
  selectUsersState,
  (state)=>state.loading
);

export const selectUsersSuccess=createSelector(
  selectUsers,
  selectLoading,
  (users,loading)=>({users,loading})
);

export const selectUsersDetailedSuccess=createSelector(
  selectUsersState,
  (state)=>state.userDetailed
)