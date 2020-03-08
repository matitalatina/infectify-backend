import { Module, Global } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { MongoDbConfig } from './mongo-db.config';

@Module({
  imports: [
    NestConfigModule,
  ],
  providers: [MongoDbConfig],
  exports: [MongoDbConfig],
})
export class ConfigModule { }
