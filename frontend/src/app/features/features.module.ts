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

@NgModule({
  declarations: [
    ArticleFormComponent,
    ArticleListViewComponent,
    ArticleDetailComponent,
    ArticleLandingComponent,
  ],
  imports: [CommonModule, FeaturesRoutingModule, AngularMaterialModule],
  providers: [AuthenticationRepoService, AuthenticationFacade],
})
export class FeaturesModule {}
