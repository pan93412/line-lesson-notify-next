import { Injectable } from '@nestjs/common';
import { CourseManagerService } from './course-manager/course-manager.service';
import { LineNotifyService } from './line-notify/line-notify.service';
import { StatusImageService } from './status-image/status-image.service';
import { chineseWeekOfDay } from './course-manager/lesson/lesson-utils';

@Injectable()
export class AppService {
  constructor(
    private readonly courseManagerService: CourseManagerService,
    private readonly lineNotifyService: LineNotifyService,
    private readonly statusImageService: StatusImageService,
  ) {}

  onApplicationBootstrap() {
    this.courseManagerService.onClassStart = async (meta) => {
      const { subject, nextLesson, startAt } = meta;
      await this.lineNotifyService.sendWithImage(
        `-> 開始上課。本節是${subject}。`,
        this.statusImageService.lessonStartImage({
          currentLesson: subject,
          currentLessonTime: startAt,
          nextLesson: nextLesson.subject,
        }),
      );
    };

    this.courseManagerService.onClassDismiss = async (meta) => {
      const { subject, startAt } = meta.nextLesson;
      await this.lineNotifyService.sendWithImage(
        `-> 下課時間。下節是${subject}。`,
        this.statusImageService.lessonDismissImage({
          currentLesson: subject,
          currentLessonTime: startAt,
        }),
      );
    };

    this.courseManagerService.onLastClassDismiss = async (meta) => {
      const { subject, weekOfDay, startAt } = meta.nextLesson;
      await this.lineNotifyService.sendWithImage(
        `-> 本日課程結束。${chineseWeekOfDay(weekOfDay)}第一節是${subject}。`,
        this.statusImageService.lessonDismissImage({
          currentLesson: subject,
          currentLessonTime: startAt,
        }),
      );
    };

    this.courseManagerService.schedule();
  }
}
