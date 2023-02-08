import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { Module } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [InMemoryDBModule.forFeature('users', {})],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
