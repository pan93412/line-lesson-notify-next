import { Injectable, Logger } from '@nestjs/common';
import { CourseManagerService } from './course-manager/course-manager.service';
import { chineseWeekOfDay } from './course-manager/lesson/lesson-utils';
import { BroadcastService } from './broadcast/broadcast.service';
import { LineNotifyBroadcast } from './line-notify/line-notify.broadcast';
import { TelegramBotBroadcast } from './telegram-bot/telegram-bot.broadcast';
import { TelegramBotEvents } from './telegram-bot/types/telegram-bot-events';
import { TelegramBotService } from './telegram-bot/telegram-bot.service';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    private readonly courseManagerService: CourseManagerService,
    private readonly broadcastService: BroadcastService,
    private readonly lineNotifyBroadcast: LineNotifyBroadcast,
    private readonly telegramNotifyBroadcast: TelegramBotBroadcast,
    private readonly telegramNotifyService: TelegramBotService,
  ) {}

  private async registerBroadcastProviders() {
    this.broadcastService
      .addService(this.lineNotifyBroadcast)
      .addService(this.telegramNotifyBroadcast);
  }

  private async setCourseManagerEventHandlers() {
    this.courseManagerService.onClassStart = async (meta) => {
      const { subject, startAt } = meta;
      this.logger.log(`onClassStart - (${startAt}) ${subject}`);
      await this.broadcastService
        .sendTextMessage(`π ιε§δΈθͺ²γζ¬η―ζ―${subject}γ`, {
          enableNotification: false,
        })
        .catch(this.logger.error);
    };

    this.courseManagerService.onClassDismiss = async (meta) => {
      const { subject, startAt } = meta.nextLesson;
      this.logger.log(`onClassDismiss - (${startAt}) ${subject}`);
      await this.broadcastService
        .sendTextMessage(`β δΈθͺ²ζιγδΈη―ζ―${subject}γ`, {
          enableNotification: false,
        })
        .catch(this.logger.error);
    };

    this.courseManagerService.onLastClassDismiss = async (meta) => {
      const { subject, weekOfDay, startAt } = meta.nextLesson;
      this.logger.log(`onLastClassDismiss - (${startAt}) ${subject}`);
      await this.broadcastService
        .sendTextMessage(
          `π ζ¬ζ₯θͺ²η¨η΅ζγ${chineseWeekOfDay(weekOfDay)}η¬¬δΈη―ζ―${subject}γ`,
          {
            enableNotification: false,
          },
        )
        .catch(this.logger.error);
    };
  }

  private async addCommandListeners() {
    this.telegramNotifyService.on(TelegramBotEvents.DISABLE_REMINDER, () => {
      this.logger.log(
        'Received disable_reminder event from TelegramNotifyService.',
      );
      this.courseManagerService.removeScheduledTasks();
    });
    this.telegramNotifyService.on(TelegramBotEvents.ENABLE_REMINDER, () => {
      this.logger.log(
        'Received enable_reminder event from TelegramNotifyService.',
      );
      this.courseManagerService.schedule();
    });
  }

  async onApplicationBootstrap() {
    await Promise.all([
      this.registerBroadcastProviders(),
      this.setCourseManagerEventHandlers(),
      this.addCommandListeners(),
    ]);

    this.courseManagerService.schedule();
  }
}
