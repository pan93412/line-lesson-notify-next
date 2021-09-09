import { Injectable } from '@nestjs/common';
import { BroadcastServiceProvider } from '../broadcast/broadcast-service-provider';
import { TelegramBotService } from './telegram-bot.service';

@Injectable()
export class TelegramBotBroadcast extends BroadcastServiceProvider {
  constructor(private readonly telegramBotService: TelegramBotService) {
    super();
  }

  get ServiceId() {
    return 'telegram-bot';
  }

  get ServiceName() {
    return 'Telegram Bot Service';
  }

  async sendTextMessage(message: string): Promise<void> {
    await this.telegramBotService.sendTextMessageToManagementGroup(message);
  }
}
