import { createReducer, on, Action } from '@ngrx/store';
import { ArticleEntity } from 'src/app/shared/models/article.model';
import * as ArticleActions from './article.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const articleFeatureKey = 'article';

export interface ArticleState extends EntityState<ArticleEntity> {
  selectedId?: string;
  loading: boolean;
  loadErr: any;
  updating: boolean;
  updateErr: any;
  creating: boolean;
  createErr: any;
}

export const articleAdapter: EntityAdapter<ArticleEntity> =
  createEntityAdapter<ArticleEntity>({
    selectId: (article: ArticleEntity) => article.id!,
  });

export const articleIntialState: ArticleState = articleAdapter.getInitialState({
  loading: false,
  loadErr: null,
  updating: false,
  updateErr: null,
  creating: false,
  createErr: null,
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
    })
  ),
  on(ArticleActions.getArticleListFail, (state, action) => ({
    ...state,
    loading: false,
    loadErr: action.error,
  }))
);

export function reducer(state: ArticleState | undefined, action: Action) {
  return authenticationReducer(state, action);
}
