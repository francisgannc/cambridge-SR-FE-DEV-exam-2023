import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [InMemoryDBModule.forFeature('users', {})],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
