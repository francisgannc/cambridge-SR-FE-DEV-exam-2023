import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationFacade } from './../../authentication/+state/authentication.facade';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private facade: AuthenticationFacade,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkIsLoggedIn().pipe(
      map((isLoggedIn: boolean | null) => {
        if (isLoggedIn) {
          return isLoggedIn as boolean;
        } else {
          this.router.navigate(['']);
          this.snackBar.open('Please Log in', 'Unauthorized', {
            duration: 2000,
          });
        }
        return isLoggedIn !== null ? isLoggedIn : false;
      })
    );
  }

  private checkIsLoggedIn() {
    return this.facade.isLoggedIn$.pipe(take(1));
  }
}
