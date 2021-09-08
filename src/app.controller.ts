import { Controller, Get, Response } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { LineNotifyService } from './line-notify/line-notify.service';
import { StatusImageService } from './status-image/status-image.service';

@Controller()
export class AppController {
  constructor(
    private readonly lineNotifyService: LineNotifyService,
    private readonly statusImageService: StatusImageService,
  ) {}

  @Get('/status')
  getStatusImage(@Response() resp: FastifyReply) {
    const r = resp.status(200).headers({
      'Content-Type': 'image/png',
    });

    this.statusImageService
      .lessonStartImage({
        currentLesson: '國文',
        currentLessonTime: '10:00',
        nextLesson: '數學',
      })
      .createPNGStream()
      .pipe(r.raw);
  }

  @Get('/line')
  sendTestMessage() {
    return this.lineNotifyService.sendText('LINE!');
  }
}
