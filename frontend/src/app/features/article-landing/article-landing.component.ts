import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, tap } from 'rxjs';
import { AuthenticationFacade } from 'src/app/authentication/+state/authentication.facade';
import { ArticleFacade } from '../+state/article.facade';

@Component({
  selector: 'app-article-landing',
  templateUrl: './article-landing.component.html',
  styleUrls: ['./article-landing.component.scss'],
})
export class ArticleLandingComponent implements OnInit {
  title = 'Articles';

  searchControl = new FormControl('');

  constructor(
    public authFacade: AuthenticationFacade,
    public facade: ArticleFacade
  ) {}

  ngOnInit(): void {
    this.searchControlSubscribe();
  }

  public logout(): void {
    this.authFacade.logout();
  }

  private searchControlSubscribe(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(450),
        tap((searchValue) => {
          if (!searchValue) {
            this.facade.getArticleList();
          } else {
            this.facade.searchArticles(searchValue);
          }
        })
      )
      .subscribe();
  }
}
