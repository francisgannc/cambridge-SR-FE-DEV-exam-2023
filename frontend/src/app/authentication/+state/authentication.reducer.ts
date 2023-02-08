import { LoginDto } from './../../shared/models/auth.models';
import { createReducer, on, Action } from '@ngrx/store';
import * as AuthenticationActions from './authentication.actions';

export const authenticationFeatureKey = 'authentication';

export interface AuthState {
  isLoggedIn: boolean | null;
  loginDto: LoginDto | null;
  loginLoading: boolean;
  loginError: any;
}

export const authInitialState: AuthState = {
  isLoggedIn: false,
  loginDto: null,
  loginLoading: false,
  loginError: null,
};

const authenticationReducer = createReducer(
  authInitialState,

  on(AuthenticationActions.login, (state) => ({
    ...state,
    loginLoading: true,
    isLoggedIn: false,
  })),
  on(AuthenticationActions.loginSuccess, (state, action) => ({
    ...state,
    loginLoading: false,
    loginDto: action.loginDto,
    isLoggedIn: true,
    loginError: null,
  })),
  on(AuthenticationActions.loginFail, (state, action) => ({
    ...state,
    loginLoading: false,
    loginDto: null,
    isLoggedIn: false,
    loginError: action.error,
  }))
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authenticationReducer(state, action);
}
