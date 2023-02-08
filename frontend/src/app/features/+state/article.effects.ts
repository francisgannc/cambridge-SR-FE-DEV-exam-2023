import { ArticleEntity } from 'src/app/shared/models/article.model';
import { ArticleFacade } from './article.facade';
import { ArticleRepoService } from './../services/article.repo.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap, withLatestFrom } from 'rxjs';
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

  searchArticles$ = createEffect(() =>
    this.action$.pipe(
      ofType(ArticleActions.searchArticles),
      withLatestFrom(this.facade.articleList$),
      mergeMap(([actions, list]) => {
        const searchValue = actions.searchValue.toLocaleLowerCase();
        let filteredResult: ArticleEntity[] = [];
        filteredResult = list.filter(
          (article) =>
            article.body.toLocaleLowerCase().includes(searchValue) ||
            article.title.toLocaleLowerCase().includes(searchValue) ||
            article.userId.toLocaleLowerCase().includes(searchValue)
        );

        return of(
          ArticleActions.searchArticleSuccess({
            articleList: filteredResult,
          })
        );
      })
    )
  );

  getArticleById$ = createEffect(() =>
    this.action$.pipe(
      ofType(ArticleActions.getArticleById),
      mergeMap((action) => {
        return this.articlRepoService.getArticleById(action.id).pipe(
          map((article) => {
            return ArticleActions.getArticleByIdSuccess({
              article: article,
            });
          }),
          catchError((error) => {
            return of(ArticleActions.getArticleByIdFail({ error: error }));
          })
        );
      })
    )
  );

  constructor(
    private action$: Actions,
    private articlRepoService: ArticleRepoService,
    private router: Router,
    public snackBar: MatSnackBar,
    private facade: ArticleFacade
  ) {}
}
