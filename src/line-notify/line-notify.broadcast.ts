import { Injectable } from '@nestjs/common';
import { BroadcastServiceProvider } from '../broadcast/broadcast-service-provider';
import type { SendMessageOptions } from '../broadcast/types/send-message-options';
import { LineNotifyService } from './line-notify.service';

@Injectable()
export class LineNotifyBroadcast extends BroadcastServiceProvider {
  constructor(private readonly lineNotifyService: LineNotifyService) {
    super();
  }

  get ServiceId() {
    return 'line-notify';
  }

  get ServiceName() {
    return 'LINE Notify Service';
  }

  async sendTextMessage(
    message: string,
    options?: SendMessageOptions,
  ): Promise<void> {
    await this.lineNotifyService.sendText(
      message,
      // notificationDisabled should be the negative of enableNotification!
      options?.enableNotification ?? false,
    );
  }
}
