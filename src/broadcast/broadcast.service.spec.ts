import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { BroadcastService } from './broadcast.service';

describe('BroadcastService', () => {
  let service: BroadcastService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BroadcastService],
    }).compile();

    service = module.get<BroadcastService>(BroadcastService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendTextMessage', () => {
    it('can send text message to every registered platform', () => {});
  });
});
