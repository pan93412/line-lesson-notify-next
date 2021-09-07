import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import LineNotifyConfig from '../config/line-notify';
import { LineNotifyService } from './line-notify.service';

@Module({
  imports: [HttpModule, ConfigModule.forFeature(LineNotifyConfig)],
  providers: [LineNotifyService],
  exports: [LineNotifyService],
})
export class LineNotifyModule {}
