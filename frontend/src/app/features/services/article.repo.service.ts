import { HttpClient } from '@angular/common/http';
import { ArticleEntity } from './../../shared/models/article.model';
import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ArticleRepoService {
  private articleBaseUrl = `http://localhost:3000/articles`;

  constructor(private htpp: HttpClient) {}

  public getArticleList(): Observable<ArticleEntity[]> {
    return this.htpp.get<ArticleEntity[]>(this.articleBaseUrl).pipe(
      map((value) => {
        return value;
      })
    );
  }

  public getArticleById(id: string): Observable<ArticleEntity> {
    return this.htpp.get<ArticleEntity>(`${this.articleBaseUrl}/${id}`).pipe(
      map((value) => {
        return value;
      })
    );
  }
}
