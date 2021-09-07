import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { PNGStream } from 'canvas';
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

  describe('startCourseImage', () => {
    it('can successfully generate image without errors', () => {
      expect(
        service.startCourseImage({
          currentCourse: 'Course A',
          currentCourseTime: new Date(),
          nextCourse: 'Course B',
        }),
      ).toBeInstanceOf(PNGStream);
    });
  });

  describe('endCourseImage', () => {
    it('can successfully generate image without errors', () => {
      expect(
        service.endCourseImage({
          currentCourse: 'Course B',
          currentCourseTime: new Date(),
        }),
      ).toBeInstanceOf(PNGStream);
    });
  });
});
