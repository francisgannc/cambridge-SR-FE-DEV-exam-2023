import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { ArticleFormComponent } from './article-form/article-form.component';
import { ArticleListViewComponent } from './article-list-view/article-list-view.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';

@NgModule({
  declarations: [
    ArticleFormComponent,
    ArticleListViewComponent,
    ArticleDetailComponent,
  ],
  imports: [CommonModule, FeaturesRoutingModule],
})
export class FeaturesModule {}
