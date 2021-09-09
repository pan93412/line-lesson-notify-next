import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import LineNotifyConfig from '../config/line-notify';
import { LineNotifyService } from './line-notify.service';
import { LineNotifyBroadcast } from './line-notify.broadcast';

@Module({
  imports: [ConfigModule.forFeature(LineNotifyConfig)],
  providers: [LineNotifyBroadcast, LineNotifyService],
  exports: [LineNotifyBroadcast, LineNotifyService],
})
export class LineNotifyModule {}
