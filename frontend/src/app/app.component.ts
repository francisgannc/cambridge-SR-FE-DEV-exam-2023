import { setLoginValues } from './authentication/+state/authentication.actions';
import { AuthenticationFacade } from './authentication/+state/authentication.facade';
import { Component, OnInit } from '@angular/core';
import { LOCSTOR_AUTH } from './shared/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'frontend';
  isLoggedIn = false;

  constructor(private authFacade: AuthenticationFacade) {}

  ngOnInit(): void {
    if (
      localStorage.getItem(LOCSTOR_AUTH.isLoggedIn) !== null &&
      localStorage.getItem(LOCSTOR_AUTH.isLoggedIn) !== undefined
    ) {
      if (localStorage.getItem(LOCSTOR_AUTH.isLoggedIn) === 'true') {
        this.authFacade.setLoginValues(
          true,
          JSON.parse(localStorage.getItem(LOCSTOR_AUTH.loginDto)!),
          false,
          null
        );
      } else {
        this.authFacade.setLoginValues(false, null, false, null);
      }
    } else {
      this.authFacade.setLoginValues(false, null, false, null);
    }
  }
}
