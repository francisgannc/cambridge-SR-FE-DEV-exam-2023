import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export class ArticleEntity implements InMemoryDBEntity {
  id: string;
  userId: string;
  title: string;
  body: string;
  date: number;
}
