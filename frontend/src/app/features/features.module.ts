import { ArticleEffects } from './+state/article.effects';
import { ArticleFacade } from './+state/article.facade';
import { ArticleRepoService } from './services/article.repo.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { ArticleFormComponent } from './article-form/article-form.component';
import { ArticleListViewComponent } from './article-list-view/article-list-view.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { AuthenticationRepoService } from '../authentication/services/authentication.repo.service';
import { AuthenticationFacade } from '../authentication/+state/authentication.facade';
import { ArticleLandingComponent } from './article-landing/article-landing.component';
import * as fromArticle from './+state/article.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ArticleFormComponent,
    ArticleListViewComponent,
    ArticleDetailComponent,
    ArticleLandingComponent,
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature(fromArticle.articleFeatureKey, fromArticle.reducer),
    EffectsModule.forFeature([ArticleEffects]),
  ],
  providers: [
    AuthenticationRepoService,
    AuthenticationFacade,
    ArticleRepoService,
    ArticleFacade,
  ],
})
export class FeaturesModule {}
