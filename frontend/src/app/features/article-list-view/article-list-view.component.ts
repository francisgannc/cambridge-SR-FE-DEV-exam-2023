import { Component, OnInit } from '@angular/core';
import { ArticleFacade } from '../+state/article.facade';

@Component({
  selector: 'app-article-list-view',
  templateUrl: './article-list-view.component.html',
  styleUrls: ['./article-list-view.component.scss'],
})
export class ArticleListViewComponent implements OnInit {
  constructor(public facade: ArticleFacade) {}

  ngOnInit(): void {
    this.facade.getArticleList();
  }
}
