import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  articleFeatureKey,
  ArticleState,
  articleAdapter,
} from './article.reducer';

export const getArticleState =
  createFeatureSelector<ArticleState>(articleFeatureKey);

const { selectAll, selectEntities } = articleAdapter.getSelectors();

export const getArticles = createSelector(
  getArticleState,
  (state: ArticleState) => selectAll(state)
);

export const getFilteredArticles = createSelector(
  getArticleState,
  (state: ArticleState) => state.filteredArticles
);

export const getArticlesLoading = createSelector(
  getArticleState,
  (state: ArticleState) => state.loading
);

export const getArticlesError = createSelector(
  getArticleState,
  (state: ArticleState) => state.loadErr
);

export const articleQuesry = {
  getArticles,
  getArticlesLoading,
  getArticlesError,
  getFilteredArticles,
};
