import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserEntity } from 'src/entities/UserEntity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('seed')
  seedUser(): { message: string } {
    this.userService.seed();
    return { message: 'seed completed' };
  }

  @Get()
  getUsers(): UserEntity[] {
    return this.userService.getUsers();
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): UserEntity {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id')
  getUserById(@Param('id') id: string): UserEntity {
    return this.userService.getUserById(id);
  }
}
