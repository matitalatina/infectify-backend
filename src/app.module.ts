import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegionsModule } from './regions/regions.module';

@Module({
  imports: [RegionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
