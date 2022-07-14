import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStudents from './students.reducer';

export const selectStudentsState = createFeatureSelector<fromStudents.State>(
  fromStudents.studentsFeatureKey
);

export const selectStudents=createSelector(
  selectStudentsState,
  (state)=>state.students
);

export const selectLoading=createSelector(
  selectStudentsState,
  (state)=>state.loading
);

export const selectStudentsSuccess=createSelector(
  selectStudents,
  selectLoading,
  (students,loading)=>({students,loading})
);

export const selectStudentsDetailedSuccess=createSelector(
  selectStudentsState,
  (state)=>state.studentDetailed
)
