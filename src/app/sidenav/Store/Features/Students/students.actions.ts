import { createAction, props } from '@ngrx/store';
import { Students } from 'src/app/services/students';

export const loadStudentss = createAction(
  '[Students] Load Studentss'
);

export const loadStudentssSuccess = createAction(
  '[Students] Load Studentss Success',
  props<{ students: Students[] }>()
);

export const loadStudentssFailure = createAction(
  '[Students] Load Studentss Failure',
  props<{ error: any }>()
);

export const deleteStudents = createAction (
  '[Students] delete students',
  props<{id:string}>()
);

export const postStudents = createAction (
  '[Students] post students',
  props<{student:Students}>()
);

export const getDetailedStudents = createAction (
  '[Students] getDetailed students',
  props<{id:string}>()
);

export const getDetailedStudentsSuccess = createAction (
  '[Students] getDetailed students success',
  props<{studentDetailed:Students}>()
);