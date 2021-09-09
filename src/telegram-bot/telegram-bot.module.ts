import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import telegramBotConfiguration from '../config/telegram-bot';
import { UndefinedEnvironmentVariable } from '../common/exception/undefined-environment-variable';
import { TelegramBotService } from './telegram-bot.service';
import { TelegramBotUpdate } from './telegram-bot.update';
import { TelegramBotBroadcast } from './telegram-bot.broadcast';

@Module({
  imports: [
    ConfigModule.forFeature(telegramBotConfiguration),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule.forFeature(telegramBotConfiguration)],
      useFactory: async (configService: ConfigService) => {
        const token = configService.get<string>('TELEGRAM_BOT_TOKEN');

        if (!token)
          throw new UndefinedEnvironmentVariable('TELEGRAM_BOT_TOKEN');

        return {
          token,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [TelegramBotUpdate, TelegramBotService, TelegramBotBroadcast],
  exports: [TelegramBotService, TelegramBotBroadcast],
})
export class TelegramBotModule {}
