import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authenticationFeatureKey, AuthState } from './authentication.reducer';

export const getAuthenticationState = createFeatureSelector<AuthState>(
  authenticationFeatureKey
);

export const getIsLoggedIn = createSelector(
  getAuthenticationState,
  (state: AuthState) => state.isLoggedIn
);

export const getUserDetails = createSelector(
  getAuthenticationState,
  (state: AuthState) => state.loginDto
);

export const getLoginLoading = createSelector(
  getAuthenticationState,
  (state: AuthState) => state.loginLoading
);

export const getLoginError = createSelector(
  getAuthenticationState,
  (state: AuthState) => state.loginError
);

export const authQuery = {
  getIsLoggedIn,
  getUserDetails,
  getLoginLoading,
  getLoginError,
};
