import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DpcClient } from './client/dpc-client';
import { ConfigModule } from './config/config.module';
import { MongooseConfig } from './config/mongoose-config';
import { RegionsModule } from './regions/regions.module';

@Module({
  imports: [
    RegionsModule,
    NestConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: MongooseConfig,
    }),
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService, DpcClient],
})
export class AppModule { }
