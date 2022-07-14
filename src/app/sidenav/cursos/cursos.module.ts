import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './cursos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/modules/material.module';
import { AddCourseComponent } from './add-course/add-course.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CursosRoutingModule } from './cursos-routing.module';

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
    CursosRoutingModule
  ],
  exports: [
    AddCourseComponent,
    CoursesListComponent
  ]
})
export class CursosModule { }
