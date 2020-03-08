import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegionsModule } from './regions/regions.module';
import { DpcClient } from './client/dpc-client';

@Module({
  imports: [RegionsModule],
  controllers: [AppController],
  providers: [AppService, DpcClient],
})
export class AppModule {}
