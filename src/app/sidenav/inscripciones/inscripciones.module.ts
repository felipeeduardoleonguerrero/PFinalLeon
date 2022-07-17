import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRegistrationComponent } from './add-registration/add-registration.component';
import { RegistrationListComponent } from './registration-list/registration-list.component';
import { MaterialModule } from 'src/app/modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InscripcionesComponent } from './inscripciones.component';
import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { RegistrationEffects } from '../Store/Features/Registration/registration.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromRegistration from '../Store/Features/Registration/registration.reducer';

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
    ReactiveFormsModule,
    StoreModule.forFeature(fromRegistration.registrationFeatureKey, fromRegistration.reducer),
    EffectsModule.forFeature([RegistrationEffects])
  ],
  exports: [
    AddRegistrationComponent,
    RegistrationListComponent
  ]
})
export class InscripcionesModule { }
