export abstract class BroadcastServiceProvider {
  abstract get ServiceId(): string;

  abstract get ServiceName(): string;

  abstract sendTextMessage(message: string): Promise<void>;
}
