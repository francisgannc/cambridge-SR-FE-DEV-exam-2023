import { LoginDto } from './../../shared/models/auth.models';
import { createAction, props } from '@ngrx/store';

export const setLoginValues = createAction(
  '[authentication] Set Login Values',
  props<{
    isLoggedIn: boolean | null;
    loginDto: LoginDto | null;
    loginLoading: boolean;
    loginError: any;
  }>()
);

export const login = createAction(
  '[authentication] Login',
  props<{ loginDto: LoginDto }>()
);

export const loginSuccess = createAction(
  '[authentication] Login Success',
  props<{ loginDto: LoginDto }>()
);

export const loginFail = createAction(
  '[authentication] Login Failed',
  props<{ error: any }>()
);

export const logoutSuccess = createAction('[authentication] Logout Success');

export const logoutFail = createAction(
  '[authentication] Logout Failed',
  props<{ error: any }>()
);
