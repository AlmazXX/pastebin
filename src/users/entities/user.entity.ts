import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  id: number;
  email: string;
  @Exclude()
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: Partial<UserEntity>) {
    Object.assign(this, user);
  }
}
