import { createAction, props } from '@ngrx/store';
import { ArticleEntity } from 'src/app/shared/models/article.model';

export const getArticleList = createAction('[article] Fetch List');

export const getArticleListSuccess = createAction(
  '[article] Fetch Success',
  props<{ articleList: ArticleEntity[] }>()
);

export const getArticleListFail = createAction(
  '[article] Fetch Failed',
  props<{ error: any }>()
);

export const searchArticles = createAction(
  '[article] Search Article',
  props<{ searchValue: string }>()
);

export const searchArticleSuccess = createAction(
  '[article] Search Article Success',
  props<{ articleList: ArticleEntity[] }>()
);
