import { Injectable } from '@nestjs/common';
import type { Context } from 'telegraf';
import { Telegraf } from 'telegraf';
import { InjectBot } from 'nestjs-telegraf';
import { ConfigService } from '@nestjs/config';
import { ManagementChatNotSpecified } from './exceptions/management-chat-not-specified';

@Injectable()
export class TelegramBotService {
  private serviceName = 'LINE Lesson Notify';

  constructor(
    @InjectBot() private bot: Telegraf<Context>,
    private readonly configService: ConfigService,
  ) {}

  private buildServiceMessage(message: string) {
    return `[${this.serviceName}] ${message}`;
  }

  private get ManagementChat(): number {
    return Number(this.configService.get<string>('MANAGEMENT_CHAT_ID'));
  }

  private isManagementChat(chatId: number | undefined): boolean {
    return chatId === this.ManagementChat;
  }

  private async isPermitted(ctx: Context, sendReason = true): Promise<boolean> {
    if (this.isManagementChat(ctx.chat?.id)) return true;

    if (sendReason)
      await ctx.reply(this.buildServiceMessage('您無權限執行本命令。'));
    return false;
  }

  async welcomeMessage(ctx: Context): Promise<void> {
    const currentChat = ctx.chat?.id;
    const currentChatText = `您的 Chat ID 是「${currentChat ?? '<無法取得>'}」`;
    const chatStatus = this.isManagementChat(currentChat)
      ? '本對話可發號示令。'
      : '本對話可查看機器人功能。';

    await ctx.reply(
      `歡迎使用 ${this.serviceName} 系統！${currentChatText}，${chatStatus}`,
    );
  }

  async disableReminder(ctx: Context): Promise<void> {
    if (!(await this.isPermitted(ctx))) return;
    await ctx.reply(this.buildServiceMessage('已經提出停止運作要求。'));
  }

  async enableReminder(ctx: Context): Promise<void> {
    if (!(await this.isPermitted(ctx))) return;
    await ctx.reply(this.buildServiceMessage('已經提出繼續運作要求。'));
  }

  async sendTextMessageToChat(chatId: number, message: string) {
    return this.bot.telegram.sendMessage(chatId, message, {
      parse_mode: 'MarkdownV2',
    });
  }

  async sendTextMessageToManagementGroup(message: string) {
    const managementChat = this.ManagementChat;
    if (!managementChat) throw new ManagementChatNotSpecified();

    return this.sendTextMessageToChat(managementChat, message);
  }
}
