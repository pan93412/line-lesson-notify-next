import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramBotModule } from './telegram-bot/telegram-bot.module';
import { LineNotifyModule } from './line-notify/line-notify.module';
import { CourseManagerModule } from './course-manager/course-manager.module';
import { BroadcastModule } from './broadcast/broadcast.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegramBotModule,
    LineNotifyModule,
    CourseManagerModule,
    BroadcastModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
