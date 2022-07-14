import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateChildGuard } from 'src/app/shared/guards/can-activate-child.guard';
import { CanActivateGuard } from 'src/app/shared/guards/can-activate.guard';
import { AlumnosComponent } from './alumnos.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentsFormComponent } from './students-form/students-form.component';

const routes: Routes = [
  {
    path:'', component:AlumnosComponent,
    children: [
      {path: 'list', component: StudentListComponent},
      {path: 'add-edit', component: StudentsFormComponent}
    ],
    canActivate: [CanActivateGuard],
    canActivateChild: [CanActivateChildGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnosRoutingModule { }
