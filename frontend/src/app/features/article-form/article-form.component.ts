import { ArticleEntity } from 'src/app/shared/models/article.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleFacade } from './../+state/article.facade';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import 'moment/locale/ja';
import 'moment/locale/fr';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ArticleFormComponent implements OnInit {
  formGroup = this.fb.group({
    title: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required),
  });

  articleId = '';
  article?: ArticleEntity;

  constructor(
    public facade: ArticleFacade,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idParamCheck();
  }

  private idParamCheck(): void {
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.articleId = this.activatedRoute.snapshot.paramMap
        .get('id')
        ?.toString()!;
      this.facade.getArticleById(this.articleId);
      this.selectedArticleSubscribe();
    }
  }

  private selectedArticleSubscribe(): void {
    this.facade.getSelectedArticle$.subscribe((value) => {
      if (value) {
        this.article = value as ArticleEntity;
        this.formGroup.get('title')?.setValue(this.article.title);
        this.formGroup
          .get('date')
          ?.setValue(this.convertDate(this.article.date).toISOString());
        this.formGroup.get('body')?.setValue(this.article.body);
      }
    });
  }

  private convertDate(date: number): Date {
    const _date = new Date(date);
    return new Date(
      Date.UTC(_date.getFullYear(), _date.getMonth(), _date.getDate())
    );
  }

  public cancel(): void {
    const route = this.articleId ? '../../' : '../';
    this.router.navigate([route], {
      relativeTo: this.activatedRoute,
      queryParams: {
        title: 'Articles',
      },
    });
  }
}
