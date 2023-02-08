import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { Module } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

@Module({
  imports: [
    InMemoryDBModule.forFeature('articles', {}),
    InMemoryDBModule.forFeature('users', {}),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService, UsersService],
})
export class ArticlesModule {}
