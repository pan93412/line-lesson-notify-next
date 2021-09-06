import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { StatusImageController } from './status-image.controller';

describe('StatusImageController', () => {
  let controller: StatusImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusImageController],
    }).compile();

    controller = module.get<StatusImageController>(StatusImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
