import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateChildGuard } from 'src/app/shared/guards/can-activate-child.guard';
import { CanActivateGuard } from 'src/app/shared/guards/can-activate.guard';
import { AddCourseComponent } from './add-course/add-course.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CursosComponent } from './cursos.component';

const routes: Routes = [
  {
    path:'', component:CursosComponent, 
    children: [
      {path:'add-edit', component:AddCourseComponent},
      {path:'list', component:CoursesListComponent}
    ],
    canActivate: [CanActivateGuard],
    canActivateChild: [CanActivateChildGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
