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

export const selectArticleById = createAction(
  '[article] Select By ID',
  props<{ id: string }>()
);

export const getArticleById = createAction(
  '[article] Fetch By ID',
  props<{ id: string }>()
);

export const getArticleByIdSuccess = createAction(
  '[article] Fetch By ID Success',
  props<{ article: ArticleEntity }>()
);

export const getArticleByIdFail = createAction(
  '[article] Fetch By ID Failed',
  props<{ error: any }>()
);
