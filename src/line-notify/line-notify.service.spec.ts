import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import LineNotifyConfig from '../config/line-notify';
import { LineNotifyService } from './line-notify.service';

describe('LineNotifyService', () => {
  let service: LineNotifyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        HttpModule,
        ConfigModule.forFeature(LineNotifyConfig),
      ],
      providers: [LineNotifyService],
    }).compile();

    service = module.get<LineNotifyService>(LineNotifyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('can send text messages', async () => {
    await service.sendText('Hello, World');
  });
});
