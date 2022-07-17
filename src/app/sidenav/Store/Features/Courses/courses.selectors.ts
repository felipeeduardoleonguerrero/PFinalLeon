import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCourses from './courses.reducer';

export const selectCoursesState = createFeatureSelector<fromCourses.State>(
  fromCourses.coursesFeatureKey
);

export const selectCourses=createSelector(
  selectCoursesState,
  (state)=>state.courses
);

export const selectLoading=createSelector(
  selectCoursesState,
  (state)=>state.loading
);

export const selectCoursesSuccess=createSelector(
  selectCourses,
  selectLoading,
  (courses,loading)=>({courses,loading})
);

export const selectCourseDetailedSuccess=createSelector(
  selectCoursesState,
  (state)=>state.courseDetailed
)
