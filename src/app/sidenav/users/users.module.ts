import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersFormComponent } from './users-form/users-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/modules/material.module';
import { UsersComponent } from './users.component';
import { StoreModule } from '@ngrx/store';
import * as fromUsers from '../Store/Features/Users/users.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from '../Store/Features/Users/users.effects';


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
    MaterialModule,
    StoreModule.forFeature(fromUsers.usersFeatureKey, fromUsers.reducer),
    EffectsModule.forFeature([UsersEffects])
  ],
  exports: [
    UsersListComponent,
    UsersFormComponent
  ]
})
export class UsersModule { }
