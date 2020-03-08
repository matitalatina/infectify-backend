import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MongoDbConfig {
  constructor(
    private readonly configService: ConfigService,
  ) { }

  get uri(): string {
    return this.configService.get('MONGODB_URI');
  }

}
