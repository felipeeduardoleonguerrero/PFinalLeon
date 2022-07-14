import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { MaterialModule } from '../modules/material.module';
import { SidenavComponent } from './sidenav.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AlumnosModule } from './alumnos/alumnos.module';
import { CursosModule } from './cursos/cursos.module';
import { InscripcionesModule } from './inscripciones/inscripciones.module';
import { HttpClientModule } from '@angular/common/http';
import { AlumnosRoutingModule } from './alumnos/alumnos-routing.module';
import { CursosRoutingModule } from './cursos/cursos-routing.module';
import { InscripcionesRoutingModule } from './inscripciones/inscripciones-routing.module';
import { UsersRoutingModule } from './users/users-routing.module';
import { UsersComponent } from './users/users.component';

//Este módulo sirve de módulo principal a los módulos principales de alumnos, cusos e inscripciones

@NgModule({
  declarations: [
    SidenavComponent,
    AlumnosComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    MaterialModule,
    AlumnosModule,
    CursosModule,
    InscripcionesModule,
    HttpClientModule,
    AlumnosRoutingModule,
    CursosRoutingModule,
    InscripcionesRoutingModule,
    UsersRoutingModule

  ],
  exports: [
    AlumnosComponent
  ],
  providers: []
})
export class StudentsModule { }