import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import config from './config/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config] }),
    UsersModule,
    AuthModule,
    PrismaModule,
  ],
  controllers: [],
})
export class AppModule {}
