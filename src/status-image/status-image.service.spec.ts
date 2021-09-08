import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { Canvas } from 'canvas';
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

  describe('lessonStartImage', () => {
    it('can successfully generate image without errors', () => {
      expect(
        service.lessonStartImage({
          currentLesson: 'Course A',
          currentLessonTime: '10:00',
          nextLesson: 'Course B',
        }),
      ).toBeInstanceOf(Canvas);
    });
  });

  describe('lessonDismissImage', () => {
    it('can successfully generate image without errors', () => {
      expect(
        service.lessonDismissImage({
          currentLesson: 'Course B',
          currentLessonTime: '11:00',
        }),
      ).toBeInstanceOf(Canvas);
    });
  });
});
