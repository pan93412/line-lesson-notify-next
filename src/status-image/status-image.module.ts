import { Module } from '@nestjs/common';
import { StatusImageService } from './status-image.service';

@Module({
  providers: [StatusImageService],
})
export class StatusImageModule {}
