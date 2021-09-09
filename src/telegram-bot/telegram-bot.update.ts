import { Update, Start, Command } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { TelegramBotService } from './telegram-bot.service';

@Update()
export class TelegramBotUpdate {
  constructor(private readonly telegramBotService: TelegramBotService) {}

  @Start()
  async startCommand(ctx: Context) {
    return this.telegramBotService.welcomeMessage(ctx);
  }

  @Command('enable')
  async enableService(ctx: Context) {
    return this.telegramBotService.enableReminder(ctx);
  }

  @Command('disable')
  async disableService(ctx: Context) {
    return this.telegramBotService.disableReminder(ctx);
  }
}
