import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[authentication] Login',
  props<{ usernamae: string; password: string }>()
);

export const loginSuccess = createAction('[authentication] Login Success');

export const loginFail = createAction(
  '[authentication] Login Failed',
  props<{ message: string }>()
);

export const logoutSuccess = createAction('[authentication] Logout Success');

export const logoutFail = createAction(
  '[authentication] Logout Failed',
  props<{ message: string }>()
);
