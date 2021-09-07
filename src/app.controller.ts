import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { LineNotifyService } from './line-notify/line-notify.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly lineNotifyService: LineNotifyService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/line')
  sendTestMessage() {
    return this.lineNotifyService.sendText('LINE!');
  }
}
