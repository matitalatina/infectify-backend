import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { MongoDbConfig } from './mongo-db.config';
import { MongooseConfig } from './mongoose-config';

@Module({
  imports: [
    NestConfigModule,
  ],
  providers: [MongoDbConfig, MongooseConfig],
  exports: [MongoDbConfig, MongooseConfig],
})
export class ConfigModule { }
