import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './cursos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/modules/material.module';
import { AddCourseComponent } from './add-course/add-course.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CursosRoutingModule } from './cursos-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromCourses from '../Store/Features/Courses/courses.reducer';
import { CoursesEffects } from '../Store/Features/Courses/courses.effects';
import { EffectsModule } from '@ngrx/effects';

//Módulo que sirve a la lista de cursos y sus registros

@NgModule({
  declarations: [
    CursosComponent,
    AddCourseComponent,
    CoursesListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    CursosRoutingModule,
    StoreModule.forFeature(fromCourses.coursesFeatureKey, fromCourses.reducer),
    EffectsModule.forFeature([CoursesEffects])
  ],
  exports: [
    AddCourseComponent,
    CoursesListComponent
  ]
})
export class CursosModule { }
