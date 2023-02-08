import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';

@Module({
  imports: [
    ArticlesModule,
    UsersModule,
    AuthModule,
    InMemoryDBModule.forRoot({}),
  ],
})
export class AppModule {}
