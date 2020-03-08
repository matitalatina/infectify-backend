import { MongoDbConfig } from './config/mongo-db.config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegionsModule } from './regions/regions.module';
import { DpcClient } from './client/dpc-client';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigModule } from './config/config.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    RegionsModule,
    NestConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (mongoDbConfig: MongoDbConfig) => ({
        uri: mongoDbConfig.uri,
      }),
      inject: [MongoDbConfig],
    }),
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService, DpcClient],
})
export class AppModule { }
