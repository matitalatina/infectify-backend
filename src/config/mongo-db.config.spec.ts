import { Test, TestingModule } from '@nestjs/testing';
import { MongoDbConfig } from './mongo-db.config';
import { ConfigService } from '@nestjs/config';
import { mock, instance, when } from 'ts-mockito';

describe('MongoDbConfig', () => {
  let provider: MongoDbConfig;
  const configService: ConfigService = mock(ConfigService);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        MongoDbConfig,
        {
          provide: ConfigService,
          useValue: instance(configService),
        }
      ],
    }).compile();

    provider = module.get<MongoDbConfig>(MongoDbConfig);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should get uri', () => {
    const uri = 'mongodb://localhost:27017/db';
    when(configService.get<string>('MONGODB_URI')).thenReturn(uri);
    expect(provider.uri).toEqual(uri)
  })
});
