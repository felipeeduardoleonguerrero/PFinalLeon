import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRegistrationComponent } from './add-registration/add-registration.component';
import { RegistrationListComponent } from './registration-list/registration-list.component';
import { MaterialModule } from 'src/app/modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InscripcionesComponent } from './inscripciones.component';
import { InscripcionesRoutingModule } from './inscripciones-routing.module';

//Módulo que sirve a la lista de inscripciones y sus registros

@NgModule({
  declarations: [
    InscripcionesComponent,
    AddRegistrationComponent,
    RegistrationListComponent
  ],
  imports: [
    CommonModule,
    InscripcionesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AddRegistrationComponent,
    RegistrationListComponent
  ]
})
export class InscripcionesModule { }
