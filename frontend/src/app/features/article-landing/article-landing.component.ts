import { Component } from '@angular/core';
import { AuthenticationFacade } from 'src/app/authentication/+state/authentication.facade';

@Component({
  selector: 'app-article-landing',
  templateUrl: './article-landing.component.html',
  styleUrls: ['./article-landing.component.scss'],
})
export class ArticleLandingComponent {
  title = 'Articles'

  constructor(public authFacade: AuthenticationFacade) {}

  public logout(): void {
    this.authFacade.logout();
  }
}
