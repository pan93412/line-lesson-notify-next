import { Injectable } from '@nestjs/common';
import type { PNGStream } from 'canvas';
import { createCanvas } from 'canvas';

export interface CourseConfig {
  currentCourse: string;
  currentCourseTime: Date;
}

export interface StartCourseConfig extends CourseConfig {
  nextCourse: string;
}

export type EndCourseConfig = CourseConfig;

@Injectable()
export class StatusImageService {
  fullSize = 512;

  startCourseImage({
    currentCourse,
    currentCourseTime,
    nextCourse,
  }: StartCourseConfig): PNGStream {
    // Configuration
    const { fullSize } = this;
    const topSize = 384;
    const background = 'black';
    const bottomBackground = 'rgba(255,255,255,0.75)';

    // Initiate
    const canvas = createCanvas(fullSize, fullSize);
    const ctx = canvas.getContext('2d', { alpha: false });
    const canvasHalfWidth = canvas.width / 2;
    ctx.antialias = 'subpixel';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Background
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    /* TOP */
    let topHalfSize = topSize / 2;
    ctx.fillStyle = 'white';

    ctx.font = '16px "Noto Sans TC"';
    ctx.fillText('本節', canvasHalfWidth, topHalfSize - 32 - 16);

    ctx.font = 'bold 64px "Noto Sans TC"';
    ctx.fillText(currentCourse, canvasHalfWidth, topHalfSize);

    ctx.font = '16px "Noto Sans TC"';
    ctx.fillText(
      `上課時間 ${currentCourseTime.toLocaleTimeString()}`,
      canvasHalfWidth,
      topHalfSize + 32 + 12,
    );

    /* Bottom */
    ctx.fillStyle = bottomBackground;
    ctx.fillRect(0, topSize, canvas.width, canvas.height);

    const bottomSize = fullSize - topSize;
    topHalfSize = topSize + bottomSize / 2;
    ctx.fillStyle = 'black';

    ctx.font = '12px "Noto Sans TC"';
    ctx.fillText('下節', canvasHalfWidth, topHalfSize - 10 - 12);

    ctx.font = 'bold 40px "Noto Sans TC"';
    ctx.fillText(nextCourse, canvasHalfWidth, topHalfSize + 10);

    return canvas.createPNGStream();
  }

  endCourseImage({
    currentCourse,
    currentCourseTime,
  }: EndCourseConfig): PNGStream {
    // Configuration
    const { fullSize } = this;
    const topSize = fullSize;
    const background = 'white';

    // Initiate
    const canvas = createCanvas(fullSize, fullSize);
    const ctx = canvas.getContext('2d', { alpha: false });
    const canvasHalfWidth = canvas.width / 2;
    ctx.antialias = 'subpixel';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Background
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    /* TOP */
    const topHalfSize = topSize / 2;
    ctx.fillStyle = 'black';

    ctx.font = '16px "Noto Sans TC"';
    ctx.fillText('- 下課時間 -', canvasHalfWidth, topHalfSize - 32 - 16);

    ctx.font = 'bold 64px "Noto Sans TC"';
    ctx.fillText(currentCourse, canvasHalfWidth, topHalfSize);

    ctx.font = '16px "Noto Sans TC"';
    ctx.fillText(
      `下節上課時間 ${currentCourseTime.toLocaleTimeString()}`,
      canvasHalfWidth,
      topHalfSize + 32 + 12,
    );

    return canvas.createPNGStream();
  }
}
