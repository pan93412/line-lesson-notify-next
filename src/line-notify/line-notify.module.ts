import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import LineNotifyConfig from '../config/line-notify';
import { LineNotifyService } from './line-notify.service';

@Module({
  imports: [ConfigModule.forFeature(LineNotifyConfig)],
  providers: [LineNotifyService],
  exports: [LineNotifyService],
})
export class LineNotifyModule {}
