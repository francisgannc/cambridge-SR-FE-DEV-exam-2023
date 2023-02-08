import { ArticleState } from './article.reducer';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { articleQuesry } from './article.selectors';
import * as ArticleActions from './article.actions';

@Injectable()
export class ArticleFacade {
  articleList$ = this.store.pipe(select(articleQuesry.getArticles));
  filteredArticleList$ = this.store.pipe(
    select(articleQuesry.getFilteredArticles)
  );
  loading$ = this.store.pipe(select(articleQuesry.getArticlesLoading));
  loadErr$ = this.store.pipe(select(articleQuesry.getArticlesError));
  getSelectedArticle$ = this.store.pipe(
    select(articleQuesry.getSelectedArticle)
  );

  constructor(private store: Store<ArticleState>) {}

  public getArticleList(): void {
    this.store.dispatch(ArticleActions.getArticleList());
  }

  public searchArticles(searchValue: string): void {
    this.store.dispatch(ArticleActions.searchArticles({ searchValue }));
  }

  public selectArticleById(id: string): void {
    this.store.dispatch(ArticleActions.selectArticleById({ id }));
  }

  public getArticleById(id: string): void {
    this.store.dispatch(ArticleActions.getArticleById({ id }));
  }
}
