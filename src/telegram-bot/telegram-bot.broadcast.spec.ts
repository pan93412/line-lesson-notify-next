import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import telegramBotConfig from '../config/telegram-bot';
import type { BroadcastServiceProvider } from '../broadcast/broadcast-service-provider';
import { TelegramBotBroadcast } from './telegram-bot.broadcast';
import { TelegramBotService } from './telegram-bot.service';

describe('TelegramBotBroadcast', () => {
  let service: BroadcastServiceProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        ConfigModule.forFeature(telegramBotConfig),
        TelegrafModule.forRootAsync({
          imports: [
            ConfigModule.forRoot(),
            ConfigModule.forFeature(telegramBotConfig),
          ],
          useFactory: async (configService: ConfigService) => ({
            token: configService.get<string>('TELEGRAM_BOT_TOKEN') || '',
          }),
          inject: [ConfigService],
        }),
      ],
      providers: [TelegramBotService, TelegramBotBroadcast],
    }).compile();

    service = module.get<TelegramBotBroadcast>(TelegramBotBroadcast);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should has the ability to send a text message', async () =>
    service.sendTextMessage('hello, world\\!'));

  it('should has the ability to send a text message when passing object', async () =>
    service.sendTextMessage('hello, world\\!', {}));
});
