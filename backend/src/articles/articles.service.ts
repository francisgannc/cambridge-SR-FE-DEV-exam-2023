import {
  InjectInMemoryDBService,
  InMemoryDBService,
} from '@nestjs-addons/in-memory-db';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from 'src/articles/dto/create-article.dto';
import { UpdateArticleDto } from 'src/articles/dto/update-article.dto';
import { ArticleEntity } from 'src/entities/ArticleEntity';
import { v4 as uuid } from 'uuid';
import { faker } from '@faker-js/faker';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectInMemoryDBService('articles')
    private articleDBService: InMemoryDBService<ArticleEntity>,
    private userService: UsersService,
  ) {}

  seed(): void {
    const users = this.userService.getUsers();

    if (!users.length) {
      throw new NotFoundException(
        'Users not found, add users first before running this command.',
      );
    }

    const userIds = users.map((user) => user.id);

    const data = (): ArticleEntity => {
      return {
        id: uuid(),
        userId: userIds[Math.floor(userIds.length * Math.random())],
        title: faker.lorem.word(),
        body: faker.lorem.paragraph(),
        date: new Date().getTime(),
      };
    };

    this.articleDBService.seed(data);
  }

  getArticles(): ArticleEntity[] {
    return this.articleDBService.getAll();
  }

  createArticle({ userId, title, body }: CreateArticleDto): ArticleEntity {
    const article: ArticleEntity = {
      id: uuid(),
      userId,
      title,
      body,
      date: new Date().getTime(),
    };

    this.articleDBService.create(article);

    return article;
  }

  getArticleById(id: string): ArticleEntity {
    const found = this.articleDBService.get(id);

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  updateArticle(id: string, updateArticleDto: UpdateArticleDto): ArticleEntity {
    const article = this.getArticleById(id);

    const payload = { ...updateArticleDto };

    for (const key in payload) {
      if (!payload[key]) {
        delete payload[key];
      }

      if (key === 'date') {
        payload[key] = new Date(payload[key]).getTime();
      }
    }

    this.articleDBService.update({ ...article, ...payload });

    return this.getArticleById(id);
  }
}
