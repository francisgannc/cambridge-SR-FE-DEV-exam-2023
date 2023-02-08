import { ArticleLandingComponent } from './article-landing/article-landing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../shared/guard/authentication.guard';
import { ArticleFormComponent } from './article-form/article-form.component';
import { ArticleListViewComponent } from './article-list-view/article-list-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/features/article-list', pathMatch: 'full' },
  {
    path: '',
    component: ArticleLandingComponent,
    children: [
      {
        path: 'article-list',
        component: ArticleListViewComponent,
      },
      { path: 'create', component: ArticleFormComponent },
      { path: ':id', component: ArticleFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
