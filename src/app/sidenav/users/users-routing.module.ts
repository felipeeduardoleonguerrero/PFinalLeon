import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateChildGuard } from 'src/app/shared/guards/can-activate-child.guard';
import { CanActivateGuard } from 'src/app/shared/guards/can-activate.guard';
import { UsersFormComponent } from './users-form/users-form.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path:'', component:UsersComponent,
    children: [
      {path: 'list', component: UsersListComponent},
      {path: 'add-edit', component: UsersFormComponent}
    ],
    canActivate: [CanActivateGuard],
    canActivateChild: [CanActivateChildGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
