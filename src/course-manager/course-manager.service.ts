import fs from 'fs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CsvLessonConverter } from './converters/csv-lesson-converter';
import { UndefinedEnvironmentVariable } from './exception/undefined-environment-variable';
import { Lesson, Lessons } from './lesson';
import type { LessonStructure } from './lesson';

function lessonTableToLessons(lessonTable: LessonStructure[]): Lessons {
  const lessons = new Lessons();

  lessonTable
    .map((lesson) => new Lesson(lesson))
    .forEach((lesson) => lessons.pushLesson(lesson));

  return lessons;
}

@Injectable()
export class CourseManagerService {
  private lessons: Lessons | undefined;

  constructor(private readonly configService: ConfigService) {}

  private get LessonTableFilename(): string {
    // EVK = environment variable key
    const filenameEVK = 'LESSON_TABLE_FILE';
    const filename = this.configService.get<string>(filenameEVK);
    if (!filename) throw new UndefinedEnvironmentVariable(filenameEVK);

    return filename;
  }

  private async getLessonTable(): Promise<LessonStructure[]> {
    const converter = new CsvLessonConverter();
    const fileStream = fs.createReadStream(this.LessonTableFilename);
    return converter.deserialize(fileStream);
  }

  async onApplicationBootstrap() {
    const lessonTable = await this.getLessonTable();
    this.lessons = lessonTableToLessons(lessonTable);
  }
}
