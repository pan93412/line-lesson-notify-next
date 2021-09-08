import fs from 'fs';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import LineNotifyConfig from '../config/line-notify';
import { LineNotifyService } from './line-notify.service';

describe('LineNotifyService', () => {
  let service: LineNotifyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        ConfigModule.forFeature(LineNotifyConfig),
      ],
      providers: [LineNotifyService],
    }).compile();

    service = module.get<LineNotifyService>(LineNotifyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('can send text messages', async () => {
    await service.sendText('Hello, World');
  });

  it('can send images', async () => {
    // Photo by <a href="https://unsplash.com/@ifshizuku?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Kawasaki Shizuku</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
    await service.sendWithImage(
      '測試影像 (有通知)',
      fs.createReadStream(`${__dirname}/testdata/test-image.jpg`),
    );
  });

  it('can send text messages without notifications', async () => {
    await service.sendText('Hello, World', true);
  });

  it('can send images without notifications', async () => {
    // Photo by <a href="https://unsplash.com/@ifshizuku?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Kawasaki Shizuku</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
    await service.sendWithImage(
      '測試影像 (無通知)',
      fs.createReadStream(`${__dirname}/testdata/test-image.jpg`),
      true,
    );
  });
});
