import { createReducer, on, Action } from '@ngrx/store';
import { ArticleEntity } from 'src/app/shared/models/article.model';
import * as ArticleActions from './article.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const articleFeatureKey = 'article';

export interface ArticleState extends EntityState<ArticleEntity> {
  filteredArticles?: ArticleEntity[];
  selectedId?: string;
  loading: boolean;
  loadErr: any;
  updating: boolean;
  updateErr: any;
  creating: boolean;
  createErr: any;
  selectedArticle?: ArticleEntity | null;
}

export const articleAdapter: EntityAdapter<ArticleEntity> =
  createEntityAdapter<ArticleEntity>({
    selectId: (article: ArticleEntity) => article.id!,
  });

export const articleIntialState: ArticleState = articleAdapter.getInitialState({
  filteredArticles: [],
  loading: false,
  loadErr: null,
  updating: false,
  updateErr: null,
  creating: false,
  createErr: null,
  selectedArticle: null,
});

const authenticationReducer = createReducer(
  articleIntialState,

  on(ArticleActions.getArticleList, (state) => ({
    ...state,
    loading: true,
    loadErr: null,
  })),
  on(ArticleActions.getArticleListSuccess, (state, { articleList }) =>
    articleAdapter.setAll(articleList, {
      ...state,
      loading: false,
      filteredArticles: [...articleList],
    })
  ),
  on(ArticleActions.getArticleListFail, (state, action) => ({
    ...state,
    loading: false,
    loadErr: action.error,
  })),
  on(ArticleActions.searchArticleSuccess, (state, action) => ({
    ...state,
    filteredArticles: action.articleList,
  })),
  on(ArticleActions.selectArticleById, (state, action) => ({
    ...state,
    selectedId: action.id,
  })),

  on(ArticleActions.getArticleById, (state, action) => ({
    ...state,
    selectedId: action.id,
    loading: true,
    loadErr: null,
  })),
  on(ArticleActions.getArticleByIdSuccess, (state, action) => ({
    ...state,
    loading: false,
    selectedArticle: action.article,
  })),
  on(ArticleActions.getArticleByIdFail, (state, action) => ({
    ...state,
    loading: false,
    loadErr: action.error,
  }))
);

export function reducer(state: ArticleState | undefined, action: Action) {
  return authenticationReducer(state, action);
}
