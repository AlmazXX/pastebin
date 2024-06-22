import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import config from './config/config';

@Module({
  imports: [ConfigModule.forRoot({load: [config]})],
  controllers: [],
  providers: [],
})
export class AppModule {}
