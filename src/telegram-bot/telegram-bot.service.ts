import EventEmitter from 'events';
import { Injectable } from '@nestjs/common';
import type { Context } from 'telegraf';
import { Telegraf } from 'telegraf';
import { InjectBot } from 'nestjs-telegraf';
import { ConfigService } from '@nestjs/config';
import type { ExtraReplyMessage } from 'telegraf/typings/telegram-types';
import { ManagementChatNotSpecified } from './exceptions/management-chat-not-specified';
import { TelegramBotEvents } from './types/telegram-bot-events';

@Injectable()
export class TelegramBotService extends EventEmitter {
  private serviceName = 'LINE Lesson Notify';

  constructor(
    @InjectBot() private bot: Telegraf<Context>,
    private readonly configService: ConfigService,
  ) {
    super();
  }

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
    this.emit(TelegramBotEvents.DISABLE_REMINDER);
  }

  async enableReminder(ctx: Context): Promise<void> {
    if (!(await this.isPermitted(ctx))) return;
    await ctx.reply(this.buildServiceMessage('已經提出繼續運作要求。'));
    this.emit(TelegramBotEvents.ENABLE_REMINDER);
  }

  async sendTextMessageToChat(
    chatId: number,
    message: string,
    extra?: ExtraReplyMessage,
  ) {
    return this.bot.telegram.sendMessage(chatId, message, extra);
  }

  async sendTextMessageToManagementGroup(
    message: string,
    extra?: ExtraReplyMessage,
  ) {
    const managementChat = this.ManagementChat;
    if (!managementChat) throw new ManagementChatNotSpecified();

    return this.sendTextMessageToChat(managementChat, message, extra);
  }
}
