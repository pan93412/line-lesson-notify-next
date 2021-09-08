import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import CourseManagerConfig from '../config/course-manager';
import { CourseManagerService } from './course-manager.service';

describe('CourseManagerService', () => {
  let service: CourseManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(CourseManagerConfig)],
      providers: [CourseManagerService],
    }).compile();

    service = module.get<CourseManagerService>(CourseManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
