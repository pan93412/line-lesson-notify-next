import { Injectable } from '@nestjs/common';
import type { Context } from 'telegraf';

@Injectable()
export class AdminPanelService {
  private serviceName = 'LINE Course Notify';

  private buildServiceMessage(message: string) {
    return `[${this.serviceName}] ${message}`;
  }

  async welcomeMessage(ctx: Context): Promise<void> {
    await ctx.reply(`歡迎使用 ${this.serviceName} 系統！`);
  }

  async disableReminder(ctx: Context): Promise<void> {
    await ctx.reply(this.buildServiceMessage('已經提出停止運作要求。'));
  }

  async enableReminder(ctx: Context): Promise<void> {
    await ctx.reply(this.buildServiceMessage('已經提出繼續運作要求。'));
  }
}
