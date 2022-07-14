import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as StudentsActions from './students.actions';
import { StudentsService } from 'src/app/services/students.service';


@Injectable()
export class StudentsEffects {

  loadStudentFeature$=createEffect(()=>{
    return this.actions$.pipe(
      ofType(StudentsActions.loadStudentss),
      mergeMap(() => this.studentsService.getStudentsList()
        .pipe(
          map(students => StudentsActions.loadStudentssSuccess({ students })),
          catchError(() => EMPTY)
        ))
      )
    }
  )

  deleteStudents$=createEffect(()=>{
    return this.actions$.pipe(
      ofType(StudentsActions.deleteStudents),
      mergeMap((student) => this.studentsService.removeStudent(student.id)
        .pipe(
          map(() => StudentsActions.loadStudentss()),
          catchError(() => EMPTY)
        ))
      )
    }
  )

  postStudents$=createEffect(()=>{
    return this.actions$.pipe(
      ofType(StudentsActions.postStudents),
      mergeMap((student) => this.studentsService.postStudent(student.student)
        .pipe(
          map(() => StudentsActions.loadStudentss()),
          catchError(() => EMPTY)
        ))
      )
    }
  )

  getStudentsDetailed$=createEffect(()=>{
    return this.actions$.pipe(
      ofType(StudentsActions.getDetailedStudents),
      mergeMap((student) => this.studentsService.getStudentDetails(student.id)
        .pipe(
          map((studentDetailed) => StudentsActions.getDetailedStudentsSuccess({studentDetailed})),
          catchError(() => EMPTY)
        ))
      )
    }
  )

  constructor(private actions$: Actions, private studentsService:StudentsService) {}
}
