import { Module } from '@nestjs/common';
import { CourseManagerService } from './course-manager.service';

@Module({
  providers: [CourseManagerService],
  exports: [CourseManagerService],
})
export class CourseManagerModule {}
