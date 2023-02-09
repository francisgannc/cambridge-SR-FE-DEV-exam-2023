import { AuthState } from './authentication.reducer';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { authQuery } from './authentication.selectors';
import { LoginDto } from 'src/app/shared/models/auth.models';
import * as AuthenticationActions from './authentication.actions';

@Injectable()
export class AuthenticationFacade {
  isLoggedIn$ = this.store.pipe(select(authQuery.getIsLoggedIn));
  loginDto$ = this.store.pipe(select(authQuery.getUserDetails));
  loginLoading$ = this.store.pipe(select(authQuery.getLoginLoading));
  loginError$ = this.store.pipe(select(authQuery.getLoginError));

  constructor(private store: Store<AuthState>) {}

  public login(loginDto: LoginDto): void {
    this.store.dispatch(AuthenticationActions.login({ loginDto }));
  }

  public setLoginValues(
    isLoggedIn: boolean | null,
    loginDto: LoginDto | null,
    loginLoading: boolean,
    loginError: any
  ): void {
    this.store.dispatch(
      AuthenticationActions.setLoginValues({
        isLoggedIn,
        loginDto,
        loginLoading,
        loginError,
      })
    );
  }

  public logout(): void {
    this.store.dispatch(AuthenticationActions.logout());
  }
}
