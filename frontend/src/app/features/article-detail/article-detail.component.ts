import { ArticleEntity } from 'src/app/shared/models/article.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent {
  @Input()
  article!: ArticleEntity;
}
