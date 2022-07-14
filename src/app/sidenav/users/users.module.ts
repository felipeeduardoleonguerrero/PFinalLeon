import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersFormComponent } from './users-form/users-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/modules/material.module';
import { UsersComponent } from './users.component';


@NgModule({
  declarations: [
    UsersListComponent,
    UsersFormComponent,
    UsersComponent
    
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    UsersListComponent,
    UsersFormComponent
  ]
})
export class UsersModule { }
