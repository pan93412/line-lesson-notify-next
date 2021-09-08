import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import CourseManagerConfig from '../config/course-manager';
import { CourseManagerService } from './course-manager.service';

@Module({
  imports: [ConfigModule.forFeature(CourseManagerConfig)],
  providers: [CourseManagerService],
  exports: [CourseManagerService],
})
export class CourseManagerModule {}
