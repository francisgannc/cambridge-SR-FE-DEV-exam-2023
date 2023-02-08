import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthenticationFacade } from '../+state/authentication.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formGroup = this.fb.group({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(public facade: AuthenticationFacade, public fb: FormBuilder) {}

  public login() {
    this.facade.login({
      username: this.formGroup.get('username')?.value as string,
      email: this.formGroup.get('email')?.value as string,
    });
  }
}
