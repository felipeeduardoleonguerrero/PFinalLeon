import { Action, createReducer, on } from '@ngrx/store';
import { Students } from 'src/app/services/students';
import * as StudentsActions from './students.actions';

export const studentsFeatureKey = 'students';

export interface State {
  students: Students[];
  loading:boolean,
  studentDetailed:any
}

export const initialState: State = {
  students:[],
  loading:true,
  studentDetailed:{}

};

export const reducer = createReducer(
  initialState,

  on(StudentsActions.loadStudentss, (state) => {
    return {...state}
  }),
  on(StudentsActions.loadStudentssSuccess, (state, {students}) => {
    return {...state, students, loading:false}
  }),
  on(StudentsActions.loadStudentssFailure, (state, action) => state),

  on(StudentsActions.getDetailedStudentsSuccess, (state, {studentDetailed})=>{
    return {...state, studentDetailed}
  })

);
