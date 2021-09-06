import { Controller, Get, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { StatusImageService } from './status-image.service';

@Controller('status-image')
export class StatusImageController {
  constructor(private statusImageSerivce: StatusImageService) {}

  @Get('/start')
  generateStartImage(@Res() res: FastifyReply) {
    const image = this.statusImageSerivce.startCourseImage({
      currentCourse: 'Hi',
      currentCourseTime: new Date(),
      nextCourse: 'Bye',
    });

    res.status(200).header('Content-Type', 'image/png');
    image.pipe(res.raw);
  }

  @Get('/end')
  generateEndImage(@Res() res: FastifyReply) {
    const image = this.statusImageSerivce.endCourseImage({
      currentCourse: 'Hi',
      currentCourseTime: new Date(),
    });

    res.status(200).header('Content-Type', 'image/png');
    image.pipe(res.raw);
  }
}
