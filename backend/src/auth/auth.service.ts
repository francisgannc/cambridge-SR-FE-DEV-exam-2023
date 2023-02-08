import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from 'src/auth/dto/login.dto';
import { UserEntity } from 'src/entities/UserEntity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  login({ username, email }: LoginDto): UserEntity {
    const user = this.userService.queryUser(
      (data: UserEntity) => data.email === email && data.username === username,
    );

    if (!user.length) {
      throw new UnauthorizedException();
    }

    return user[0];
  }
}
