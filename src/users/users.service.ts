import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map((user) => new UserEntity(user));
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findFirst({ where: { id } });

    if (!user) throw new NotFoundException('User not found');

    return new UserEntity(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const existingUser = await this.prisma.user.findFirst({ where: { id } });

    if (!existingUser) throw new NotFoundException('User not found');

    const updatedUser = { name: updateUserDto.name };

    await this.prisma.user.update({ where: { id }, data: updatedUser });
  }

  async remove(id: number) {
    await this.prisma.user.delete({ where: { id } });
  }
}
