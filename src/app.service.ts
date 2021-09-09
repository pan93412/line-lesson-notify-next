import { Injectable, Logger } from '@nestjs/common';
import { CourseManagerService } from './course-manager/course-manager.service';
import { LineNotifyService } from './line-notify/line-notify.service';
import { chineseWeekOfDay } from './course-manager/lesson/lesson-utils';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    private readonly courseManagerService: CourseManagerService,
    private readonly lineNotifyService: LineNotifyService,
  ) {}

  private scheduleClass() {
    this.courseManagerService.onClassStart = async (meta) => {
      const { subject, startAt } = meta;
      this.logger.log(`onClassStart - (${startAt}) ${subject}`);
      await this.lineNotifyService.sendText(`-> 開始上課。本節是${subject}。`);
    };

    this.courseManagerService.onClassDismiss = async (meta) => {
      const { subject, startAt } = meta.nextLesson;
      this.logger.log(`onClassDismiss - (${startAt}) ${subject}`);
      await this.lineNotifyService.sendText(`-> 下課時間。下節是${subject}。`);
    };

    this.courseManagerService.onLastClassDismiss = async (meta) => {
      const { subject, weekOfDay, startAt } = meta.nextLesson;
      this.logger.log(`onLastClassDismiss - (${startAt}) ${subject}`);
      await this.lineNotifyService.sendText(
        `-> 本日課程結束。${chineseWeekOfDay(weekOfDay)}第一節是${subject}。`,
      );
    };

    this.courseManagerService.schedule();
  }

  onApplicationBootstrap() {
    this.scheduleClass();
  }
}
