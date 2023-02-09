import { ArticleFacade } from './../+state/article.facade';
import { ArticleEntity } from 'src/app/shared/models/article.model';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent {
  @Input()
  article!: ArticleEntity;

  constructor(
    private facade: ArticleFacade,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  public gotoArticle(): void {
    this.facade.selectArticleById(this.article?.id!);

    this.router.navigate([`../detail/${this.article.id}`], {
      relativeTo: this.activatedRoute,
      queryParams: { title: 'Edit Article' },
    });
  }
}
