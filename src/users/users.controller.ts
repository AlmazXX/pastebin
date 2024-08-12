import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { User } from '../decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @HttpCode(204)
  @Patch()
  update(@User('sub') userId: number, @Body() dto: UpdateUserDto) {
    return this.usersService.update(userId, dto);
  }

  @UseGuards(JwtGuard)
  @HttpCode(204)
  @Delete()
  async remove(@User('sub') userId: number) {
    await this.usersService.remove(userId);
  }
}
