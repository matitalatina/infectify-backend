import { ConfigModule } from './config.module';
import { Test, TestingModule } from '@nestjs/testing';
import { MongooseConfig } from './mongoose-config';

describe('MongooseConfig', () => {
  let provider: MongooseConfig;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [MongooseConfig],
    }).compile();

    provider = module.get<MongooseConfig>(MongooseConfig);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
