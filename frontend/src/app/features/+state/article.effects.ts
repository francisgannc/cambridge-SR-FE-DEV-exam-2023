import { ArticleRepoService } from './../services/article.repo.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import * as ArticleActions from './article.actions';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ArticleEffects {
  getArticleList$ = createEffect(() =>
    this.action$.pipe(
      ofType(ArticleActions.getArticleList),
      mergeMap(() => {
        return this.articlRepoService.getArticleList().pipe(
          map((articleList) => {
            return ArticleActions.getArticleListSuccess({
              articleList: articleList,
            });
          }),
          catchError((error) => {
            return of(ArticleActions.getArticleListFail({ error: error }));
          })
        );
      })
    )
  );

  constructor(
    private action$: Actions,
    private articlRepoService: ArticleRepoService,
    private router: Router,
    public snackBar: MatSnackBar
  ) {}
}
