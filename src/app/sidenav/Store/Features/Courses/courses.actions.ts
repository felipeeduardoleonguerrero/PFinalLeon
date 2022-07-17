import { createAction, props } from '@ngrx/store';
import { Course } from 'src/app/services/course';

export const loadCoursess = createAction(
  '[Courses] Load Coursess'
);

export const loadCoursessSuccess = createAction(
  '[Courses] Load Coursess Success',
  props<{ courses: Course[] }>()
);

export const loadCoursessFailure = createAction(
  '[Courses] Load Coursess Failure',
  props<{ error: any }>()
);

export const deleteCourse = createAction (
  '[Courses] delete course',
  props<{id:string}>()
);

export const postCourse = createAction (
  '[Courses] post course',
  props<{course:Course}>()
);

export const getDetailedCourse = createAction (
  '[Courses] getDetailed course',
  props<{id:string}>()
);

export const getDetailedCourseSuccess = createAction (
  '[Courses] getDetailed course success',
  props<{courseDetailed:Course}>()
);