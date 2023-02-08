import { AuthenticationRepoService } from './../services/authentication.repo.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import * as AuthenticationActions from './authentication.actions';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationFacade } from './authentication.facade';
import { LOCSTOR_AUTH } from 'src/app/shared/constants';

@Injectable()
export class AuthenticationEffects {
  login$ = createEffect(() =>
    this.action$.pipe(
      ofType(AuthenticationActions.login),
      mergeMap((action) => {
        return this.authRepoService.login(action.loginDto).pipe(
          map((loginDto) => {
            return AuthenticationActions.loginSuccess({
              loginDto: loginDto,
            });
          }),
          catchError((error) => {
            return of(AuthenticationActions.loginFail({ error: error }));
          })
        );
      })
    )
  );

  loginSucess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthenticationActions.loginSuccess),
        tap((action) => {
          localStorage.setItem(LOCSTOR_AUTH.isLoggedIn, JSON.stringify(true));
          localStorage.setItem(
            LOCSTOR_AUTH.loginDto,
            JSON.stringify(action.loginDto)
          );
          this.router.navigate(['./features']);
        })
      ),
    { dispatch: false }
  );

  loginFail$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthenticationActions.loginFail),
        tap((action) => {
          if (action && action.error && action.error.error) {
            if (action.error.error.statusCode === 400) {
              if (
                action.error.error.message &&
                (action.error.error.message as string[]).length > 0
              ) {
                this.snackBar.open(
                  (action.error.error.message as string[])[0],
                  '',
                  {
                    duration: 2000,
                  }
                );
              }
            } else if (action.error.error.statusCode === 401) {
              this.snackBar.open(action.error.error.message, '', {
                duration: 2000,
              });
            } else {
              this.snackBar.open(action.error.error.message, '', {
                duration: 2000,
              });
            }
          } else {
            this.snackBar.open('Something went wrong', '', {
              duration: 2000,
            });
          }
        })
      ),
    { dispatch: false }
  );

  setLoginValues$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthenticationActions.setLoginValues),
        tap((action) => {
          localStorage.setItem(
            LOCSTOR_AUTH.isLoggedIn,
            JSON.stringify(action.isLoggedIn)
          );
          localStorage.setItem(
            LOCSTOR_AUTH.loginDto,
            JSON.stringify(action.loginDto)
          );
          if (action.isLoggedIn) {
            this.facade.login(action.loginDto!);
          }
        })
      ),
    { dispatch: false }
  );

  constructor(
    private action$: Actions,
    private authRepoService: AuthenticationRepoService,
    private router: Router,
    public snackBar: MatSnackBar,
    private facade: AuthenticationFacade
  ) {}
}
