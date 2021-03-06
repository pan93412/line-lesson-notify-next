import fs from 'fs';
import type { ScheduledTask } from 'node-cron';
import cron from 'node-cron';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UndefinedEnvironmentVariable } from '../common/exception/undefined-environment-variable';
import { UndefinedVariable } from '../common/exception/undefined-variable';
import { CsvLessonConverter } from './converters/csv-lesson-converter';
import { Lesson, Lessons, LessonStatus } from './lesson';
import type { LessonStructure, LessonsCrontabEntry } from './lesson';
import { EventNotSpecified } from './exception/event-not-specified';

function lessonTableToLessons(lessonTable: LessonStructure[]): Lessons {
  const lessons = new Lessons();

  lessonTable
    .map((lesson) => new Lesson(lesson))
    .forEach((lesson) => lessons.pushLesson(lesson));

  return lessons;
}

export type CourseManagerEventHandler = (
  classMeta: LessonsCrontabEntry,
) => void;

@Injectable()
export class CourseManagerService {
  private readonly logger = new Logger(CourseManagerService.name);

  private scheduledTasks: ScheduledTask[] = [];

  private lessons: Lessons | undefined;

  onClassStart: CourseManagerEventHandler | undefined;

  onClassDismiss: CourseManagerEventHandler | undefined;

  onLastClassDismiss: CourseManagerEventHandler | undefined;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const lessonTable = await this.getLessonTable();
    this.lessons = lessonTableToLessons(lessonTable);
  }

  get OnClassStart(): CourseManagerEventHandler {
    if (!this.onClassStart) throw new EventNotSpecified('OnClassStart');
    return this.onClassStart;
  }

  get OnClassDismiss(): CourseManagerEventHandler {
    if (!this.onClassDismiss) throw new EventNotSpecified('OnClassDismiss');
    return this.onClassDismiss;
  }

  get OnLastClassDismiss(): CourseManagerEventHandler {
    if (!this.onLastClassDismiss)
      throw new EventNotSpecified('OnLastClassDismiss');
    return this.onLastClassDismiss;
  }

  get Lessons(): Lessons {
    if (this.lessons) return this.lessons;
    throw new UndefinedVariable('lessons');
  }

  set Lessons(lessons: Lessons) {
    // We remove the currently scheduled tasks first.
    this.removeScheduledTasks();
    this.lessons = lessons;
  }

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

  schedule(): void {
    // Remove all the current task schedules first.
    this.removeScheduledTasks();

    this.Lessons.LessonsCrontab.forEach((lessonEntry) => {
      const scheduler = (handler: CourseManagerEventHandler) =>
        this.scheduledTasks.push(
          cron.schedule(lessonEntry.cron, () => handler(lessonEntry)),
        );

      switch (lessonEntry.status) {
        case LessonStatus.CLASS_START:
          this.logger.verbose(
            `Registering: OnClassStart of [${lessonEntry.startAt}] ${lessonEntry.subject}`,
          );
          scheduler(this.OnClassStart);
          break;
        case LessonStatus.CLASS_DISMISS:
          this.logger.verbose(
            `Registering: OnClassDismiss of [${lessonEntry.startAt}] ${lessonEntry.subject}`,
          );
          scheduler(this.OnClassDismiss);
          break;
        case LessonStatus.LAST_CLASS_DISMISS:
          this.logger.verbose(
            `Registering: OnLastClassDismiss of [${lessonEntry.startAt}] ${lessonEntry.subject}`,
          );
          scheduler(this.OnLastClassDismiss);
          break;
        default:
          // console
          this.logger.warn(
            `Received an unexpected lesson status: ${lessonEntry.status}. Ignoring.`,
          );
          break;
      }
    });
  }

  removeScheduledTasks() {
    this.scheduledTasks = this.scheduledTasks.filter((task, index) => {
      this.logger.verbose(`Unregistering a task (order=${index}).`);

      task.stop();
      return false;
    });
  }
}
