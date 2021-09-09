import { Injectable, Logger } from '@nestjs/common';
import type { BroadcastServiceProvider } from './broadcast-service-provider';

@Injectable()
export class BroadcastService {
  private readonly logger = new Logger(BroadcastService.name);

  private registeredService: BroadcastServiceProvider[] = [];

  addService(service: BroadcastServiceProvider): void {
    this.registeredService.push(service);
    this.logger.log(`Service added: ${service.ServiceName}`);
  }

  removeService(serviceId: string): void {
    let removedService: BroadcastServiceProvider | undefined;

    this.registeredService = this.registeredService.filter((inService) => {
      if (inService.ServiceId !== serviceId) return true;

      removedService = inService;
      return false;
    });

    if (removedService)
      this.logger.log(`Service removed: ${removedService?.ServiceName}`);
    else this.logger.warn(`This service ID wasn't added: ${serviceId}`);
  }

  async sendTextMessage(message: string): Promise<void> {
    await Promise.all(
      this.registeredService.map(async (service) =>
        service.sendTextMessage(message),
      ),
    );
  }
}
