import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import adminPanelConfig from '../config/telegram-bot';
import { TelegramBotService } from './telegram-bot.service';

describe('TelegramBotService', () => {
  let service: TelegramBotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TelegrafModule.forRootAsync({
          imports: [
            ConfigModule.forRoot(),
            ConfigModule.forFeature(adminPanelConfig),
          ],
          useFactory: async (configService: ConfigService) => ({
            token: configService.get<string>('TELEGRAM_BOT_TOKEN') || '',
          }),
          inject: [ConfigService],
        }),
      ],
      providers: [TelegramBotService],
    }).compile();

    service = module.get<TelegramBotService>(TelegramBotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
