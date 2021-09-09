import type { SendMessageOptions } from './types/send-message-options';

export abstract class BroadcastServiceProvider {
  abstract get ServiceId(): string;

  abstract get ServiceName(): string;

  abstract sendTextMessage(
    message: string,
    options?: SendMessageOptions,
  ): Promise<void>;
}
