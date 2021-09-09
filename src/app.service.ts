import { Injectable, Logger } from '@nestjs/common';
import { CourseManagerService } from './course-manager/course-manager.service';
import { chineseWeekOfDay } from './course-manager/lesson/lesson-utils';
import { BroadcastService } from './broadcast/broadcast.service';
import { LineNotifyBroadcast } from './line-notify/line-notify.broadcast';
import { TelegramBotBroadcast } from './telegram-bot/telegram-bot.broadcast';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    private readonly courseManagerService: CourseManagerService,
    private readonly broadcastService: BroadcastService,
    private readonly lineNotifyBroadcast: LineNotifyBroadcast,
    private readonly telegramNotifyBroadcast: TelegramBotBroadcast,
  ) {}

  private async registerBroadcastProviders() {
    this.broadcastService
      .addService(this.lineNotifyBroadcast)
      .addService(this.telegramNotifyBroadcast);
  }

  private async scheduleClass() {
    this.courseManagerService.onClassStart = async (meta) => {
      const { subject, startAt } = meta;
      this.logger.log(`onClassStart - (${startAt}) ${subject}`);
      await this.broadcastService
        .sendTextMessage(`📖 開始上課。本節是${subject}。`)
        .catch(this.logger.error);
    };

    this.courseManagerService.onClassDismiss = async (meta) => {
      const { subject, startAt } = meta.nextLesson;
      this.logger.log(`onClassDismiss - (${startAt}) ${subject}`);
      await this.broadcastService
        .sendTextMessage(`✅ 下課時間。下節是${subject}。`)
        .catch(this.logger.error);
    };

    this.courseManagerService.onLastClassDismiss = async (meta) => {
      const { subject, weekOfDay, startAt } = meta.nextLesson;
      this.logger.log(`onLastClassDismiss - (${startAt}) ${subject}`);
      await this.broadcastService
        .sendTextMessage(
          `👍 本日課程結束。${chineseWeekOfDay(weekOfDay)}第一節是${subject}。`,
        )
        .catch(this.logger.error);
    };

    this.courseManagerService.schedule();
  }

  async onApplicationBootstrap() {
    await Promise.all([
      this.registerBroadcastProviders(),
      this.scheduleClass(),
    ]);
  }
}
