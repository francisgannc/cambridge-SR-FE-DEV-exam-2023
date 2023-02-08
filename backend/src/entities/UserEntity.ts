import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export class UserEntity implements InMemoryDBEntity {
  id: string;
  username: string;
  email: string;
}
