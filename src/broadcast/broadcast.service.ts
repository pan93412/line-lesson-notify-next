import { Injectable, Logger } from '@nestjs/common';
import type { BroadcastServiceProvider } from './broadcast-service-provider';
import type { SendMessageOptions } from './types/send-message-options';

@Injectable()
export class BroadcastService {
  private readonly logger = new Logger(BroadcastService.name);

  private registeredService: BroadcastServiceProvider[] = [];

  addService(service: BroadcastServiceProvider): this {
    const hasRegistered =
      this.registeredService.filter(
        (registeredService) =>
          registeredService.ServiceId === service.ServiceId,
      ).length >= 1;

    if (hasRegistered) {
      this.logger.warn(
        `${service.ServiceId} has registered. Don't register it twice!`,
      );
      return this;
    }

    this.registeredService.push(service);
    this.logger.verbose(`Service added: ${service.ServiceName}`);
    return this;
  }

  removeService(serviceId: string): this {
    let removedService: BroadcastServiceProvider | undefined;

    this.registeredService = this.registeredService.filter((inService) => {
      if (inService.ServiceId !== serviceId) return true;

      removedService = inService;
      return false;
    });

    if (removedService)
      this.logger.log(`Service removed: ${removedService?.ServiceName}`);
    else this.logger.warn(`This service ID wasn't added: ${serviceId}`);

    return this;
  }

  async sendTextMessage(
    message: string,
    options?: SendMessageOptions,
  ): Promise<void> {
    await Promise.all(
      this.registeredService.map(async (service) => {
        this.logger.log(
          `Sending text message with "${service.ServiceName}" service...`,
        );
        await service.sendTextMessage(message, options);
      }),
    );
  }
}
