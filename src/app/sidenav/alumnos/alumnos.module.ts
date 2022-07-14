import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnosRoutingModule } from './alumnos-routing.module';
import { StudentListComponent } from './student-list/student-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/modules/material.module';
import { StudentsFormComponent } from './students-form/students-form.component';
import { NamesPipe } from './names.pipe';
import { EffectsModule } from '@ngrx/effects';
import { StudentsEffects } from '../Store/Features/Students/students.effects';
import { StoreModule } from '@ngrx/store';
import * as fromStudents from '../Store/Features/Students/students.reducer'

//Módulo que sirve a la lista de estudiantes y sus registros

@NgModule({
  declarations: [
    StudentListComponent,
    NamesPipe,
    StudentsFormComponent
  ],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forFeature(fromStudents.studentsFeatureKey, fromStudents.reducer),
    EffectsModule.forFeature([StudentsEffects])
  ],
  exports: [
    StudentListComponent,
    StudentsFormComponent
  ]
})
export class AlumnosModule { }
