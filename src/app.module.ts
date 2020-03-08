import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './config/config.module';
import { MongooseConfig } from './config/mongoose-config';
import { DpcModule } from './dpc/dpc.module';

@Module({
  imports: [
    DpcModule,
    NestConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: MongooseConfig,
    }),
    ConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
