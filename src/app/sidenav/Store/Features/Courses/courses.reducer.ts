import { Action, createReducer, on } from '@ngrx/store';
import { Course } from 'src/app/services/course';
import * as CoursesActions from './courses.actions';

export const coursesFeatureKey = 'courses';

export interface State {
  courses: Course[],
  loading:boolean,
  courseDetailed:any
}

export const initialState: State = {
  courses:[],
  loading:true,
  courseDetailed:{}
};

export const reducer = createReducer(
  initialState,

  on(CoursesActions.loadCoursess, (state) => {
    return {...state}
  }),
  on(CoursesActions.loadCoursessSuccess, (state, {courses}) => {
    return {...state, courses, loading:false}
  }),
  on(CoursesActions.loadCoursessFailure, (state, action) => state),

  on(CoursesActions.getDetailedCourseSuccess, (state, {courseDetailed})=>{
    return {...state, courseDetailed}
  })

);
