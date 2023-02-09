import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AuthenticationFacade } from './+state/authentication.facade';
import { AuthenticationRepoService } from './services/authentication.repo.service';
import { AngularMaterialModule } from './../shared/angular-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { EffectsModule } from '@ngrx/effects';
import { AuthenticationEffects } from './+state/authentication.effects';
import * as fromAuthentication from './+state/authentication.reducer';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    StoreModule.forFeature(
      fromAuthentication.authenticationFeatureKey,
      fromAuthentication.reducer
    ),
    EffectsModule.forFeature([AuthenticationEffects]),
  ],
  providers: [AuthenticationRepoService, AuthenticationFacade],
})
export class AuthenticationModule {}
