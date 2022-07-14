//import { CursorError } from '@angular/compiler/src/ml_parser/lexer';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CanActivateChildGuard } from './shared/guards/can-activate-child.guard';
import { CanActivateGuard } from './shared/guards/can-activate.guard';
import { AlumnosComponent } from './sidenav/alumnos/alumnos.component';
import { StudentListComponent } from './sidenav/alumnos/student-list/student-list.component';
import { StudentsFormComponent } from './sidenav/alumnos/students-form/students-form.component';
import { AddCourseComponent } from './sidenav/cursos/add-course/add-course.component';
import { CoursesListComponent } from './sidenav/cursos/courses-list/courses-list.component';
import { CursosComponent } from './sidenav/cursos/cursos.component';
import { AddRegistrationComponent } from './sidenav/inscripciones/add-registration/add-registration.component';
import { InscripcionesComponent } from './sidenav/inscripciones/inscripciones.component';
import { RegistrationListComponent } from './sidenav/inscripciones/registration-list/registration-list.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { WelcomeComponent } from './sidenav/welcome/welcome.component';

//Implementación de Lazy Loading y child routes de los módulos dentro de "Sidenav".

const routes: Routes = [
  {path:'home', component:SidenavComponent, children:[
    {
      path: 'welcome', component: WelcomeComponent,
      canActivate: [CanActivateGuard]
    },
    {
      path: 'login', component:LoginComponent
    },
    {path: 'students', loadChildren: ()=>import('./sidenav/alumnos/alumnos.module').then(m=>m.AlumnosModule) },
    {path: 'courses', loadChildren: ()=>import('./sidenav/cursos/cursos.module').then(m=>m.CursosModule) },
    {path: 'registration', loadChildren: ()=>import('./sidenav/inscripciones/inscripciones.module').then(m=>m.InscripcionesModule) },
    {path: 'users', loadChildren: ()=>import('./sidenav/users/users.module').then(m=>m.UsersModule) }
  ]},
  {path: '', redirectTo: 'home/login', pathMatch:'full'},
  {path: '**', component:PageNotFoundComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
