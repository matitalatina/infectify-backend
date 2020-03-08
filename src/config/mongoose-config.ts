import { Injectable } from '@nestjs/common';
import { MongooseOptionsFactory, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoDbConfig } from './mongo-db.config';

@Injectable()
export class MongooseConfig implements MongooseOptionsFactory {
  constructor(
    private readonly mongoDbConfig: MongoDbConfig,
  ) { }
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.mongoDbConfig.uri,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    };
  }
}
