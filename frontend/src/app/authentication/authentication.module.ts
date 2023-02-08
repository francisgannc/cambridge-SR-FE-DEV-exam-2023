import { AngularMaterialModule } from './../shared/angular-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, AuthenticationRoutingModule, AngularMaterialModule],
})
export class AuthenticationModule {}
