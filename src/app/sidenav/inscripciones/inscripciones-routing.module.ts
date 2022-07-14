import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateChildGuard } from 'src/app/shared/guards/can-activate-child.guard';
import { CanActivateGuard } from 'src/app/shared/guards/can-activate.guard';
import { AddRegistrationComponent } from './add-registration/add-registration.component';
import { InscripcionesComponent } from './inscripciones.component';
import { RegistrationListComponent } from './registration-list/registration-list.component';

const routes: Routes = [
  {
    path:'', component:InscripcionesComponent,
    children: [
      {path: 'list', component:RegistrationListComponent},
      {path: 'add-edit', component:AddRegistrationComponent}
    ],
    canActivate: [CanActivateGuard],
    canActivateChild: [CanActivateChildGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InscripcionesRoutingModule { }
