import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { BroadcastService } from './broadcast.service';
import { BroadcastServiceProvider } from './broadcast-service-provider';

class MockProvider extends BroadcastServiceProvider {
  public messageExpectation = '';

  get ServiceId(): string {
    return 'mock-provider';
  }

  get ServiceName(): string {
    return 'Mock Provider';
  }

  async sendTextMessage(message: string): Promise<void> {
    if (message !== this.messageExpectation)
      throw new Error('Unexpected message received.');
  }
}

describe('BroadcastService', () => {
  let service: BroadcastService;
  let mockProvider: MockProvider;

  beforeAll(() => {
    mockProvider = new MockProvider();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BroadcastService],
    }).compile();

    service = module.get<BroadcastService>(BroadcastService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('can add service', () => {
    expect(service.addService(mockProvider)).toBeInstanceOf(BroadcastService);
  });

  it('can remove service', () => {
    expect(service.removeService(mockProvider.ServiceId)).toBeInstanceOf(
      BroadcastService,
    );
  });

  describe('sendTextMessage', () => {
    it('can add service', () => {
      expect(service.addService(mockProvider)).toBeInstanceOf(BroadcastService);
    });

    it('can send text message to every registered platform', async () => {
      mockProvider.messageExpectation = 'Hello!';
      return service.sendTextMessage('Hello!');
    });
  });
});
