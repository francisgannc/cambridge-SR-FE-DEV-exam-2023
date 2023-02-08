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
            article?.userId?.toLocaleLowerCase().includes(searchValue)
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

  addArticle$ = createEffect(() =>
    this.action$.pipe(
      ofType(ArticleActions.addArticle),
      mergeMap((action) => {
        return this.articlRepoService.addArticle(action.article).pipe(
          map((article: ArticleEntity) => {
            const result: ArticleEntity = {
              ...action.article,
              id: article.id,
            };

            return ArticleActions.addArticleSuccess({
              article: result,
            });
          }),
          catchError((error) => {
            return of(ArticleActions.addArticleFail({ error: error }));
          })
        );
      })
    )
  );

  addArticleSuccess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(ArticleActions.addArticleSuccess),
        tap(() => {
          this.snackBar.open('Succefully Added', '', {
            duration: 2000,
          });

          this.router.navigate(['./features'], {
            queryParams: {
              title: 'Articles',
            },
          });
        })
      ),
    { dispatch: false }
  );

  addArticleFail$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(ArticleActions.addArticleFail),
        tap(() => {
          this.snackBar.open('Something went wrong', '', {
            duration: 3000,
          });
        })
      ),
    { dispatch: false }
  );

  updateArticle$ = createEffect(() =>
    this.action$.pipe(
      ofType(ArticleActions.updateArticle),
      mergeMap((action) => {
        return this.articlRepoService.updateArticle(action.article).pipe(
          map((article) => {
            return ArticleActions.updateArticleSuccess({
              article: { id: action.article.id!, changes: action.article },
            });
          }),
          catchError((error) => {
            return of(ArticleActions.updateArticleFail({ error: error }));
          })
        );
      })
    )
  );

  updateArticleSuccess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(ArticleActions.updateArticleSuccess),
        tap(() => {
          this.snackBar.open('Succefully Updated', '', {
            duration: 2000,
          });
          this.router.navigate(['./features'], {
            queryParams: {
              title: 'Articles',
            },
          });
        })
      ),
    { dispatch: false }
  );

  updateArticleFail$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(ArticleActions.updateArticleFail),
        tap(() => {
          this.snackBar.open('Something went wrong', '', {
            duration: 3000,
          });
        })
      ),
    { dispatch: false }
  );

  constructor(
    private action$: Actions,
    private articlRepoService: ArticleRepoService,
    private router: Router,
    public snackBar: MatSnackBar,
    private facade: ArticleFacade
  ) {}
}
