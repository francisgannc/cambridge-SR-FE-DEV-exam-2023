import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthenticationFacade } from './authentication/+state/authentication.facade';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import * as fromAuthentication from './authentication/+state/authentication.reducer';
import { AuthenticationEffects } from './authentication/+state/authentication.effects';
import { AuthenticationRepoService } from './authentication/services/authentication.repo.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot({}),
    HttpClientModule,
    MatSnackBarModule,

    StoreModule.forFeature(
      fromAuthentication.authenticationFeatureKey,
      fromAuthentication.reducer
    ),
    EffectsModule.forFeature([AuthenticationEffects]),
  ],
  providers: [AuthenticationFacade, AuthenticationRepoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
