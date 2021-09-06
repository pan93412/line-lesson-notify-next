import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { StatusImageService } from './status-image.service';

describe('StatusImageService', () => {
  let service: StatusImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusImageService],
    }).compile();

    service = module.get<StatusImageService>(StatusImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
