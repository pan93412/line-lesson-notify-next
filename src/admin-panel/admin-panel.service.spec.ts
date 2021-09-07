import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import adminPanelConfig from '../config/admin-panel';
import { AdminPanelService } from './admin-panel.service';

describe('AdminPanelService', () => {
  let service: AdminPanelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TelegrafModule.forRootAsync({
          imports: [
            ConfigModule.forRoot(),
            ConfigModule.forFeature(adminPanelConfig),
          ],
          useFactory: async (configService: ConfigService) => ({
            token: configService.get<string>('TELEGRAM_BOT_TOKEN'),
          }),
          inject: [ConfigService],
        }),
      ],
      providers: [AdminPanelService],
    }).compile();

    service = module.get<AdminPanelService>(AdminPanelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
