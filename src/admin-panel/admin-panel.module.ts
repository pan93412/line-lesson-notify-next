import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import adminPanelConfig from '../config/admin-panel';
import { UndefinedEnvironmentVariable } from '../common/exception/undefined-environment-variable';
import { AdminPanelService } from './admin-panel.service';
import { AdminPanelUpdate } from './admin-panel.update';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      imports: [ConfigModule.forFeature(adminPanelConfig)],
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
  providers: [AdminPanelUpdate, AdminPanelService],
  exports: [AdminPanelService],
})
export class AdminPanelModule {}
