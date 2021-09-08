import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import adminPanelConfig from '../config/admin-panel';
import { AdminPanelService } from './admin-panel.service';
import { AdminPanelUpdate } from './admin-panel.update';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      imports: [ConfigModule.forFeature(adminPanelConfig)],
      useFactory: async (configService: ConfigService) => ({
        token: configService.get<string>('TELEGRAM_BOT_TOKEN') || '',
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AdminPanelUpdate, AdminPanelService],
  exports: [AdminPanelService],
})
export class AdminPanelModule {}
