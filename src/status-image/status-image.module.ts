import { Module } from '@nestjs/common';
import { StatusImageService } from './status-image.service';
import { StatusImageController } from './status-image.controller';

@Module({
  providers: [StatusImageService],
  controllers: [StatusImageController],
})
export class StatusImageModule {}
