import type { LessonStructure } from './lesson-structure';

export enum LessonStatus {
  CLASS_START,
  CLASS_DISMISS,
  LAST_CLASS_DISMISS,
}

export interface NextLessonMetadata {
  subject: LessonsCrontabEntry['subject'];
  startAt: LessonStructure['startAt'];
  weekOfDay: LessonStructure['weekOfDay'];
}

export interface LessonsCrontabEntry {
  subject: LessonStructure['subject'];
  startAt: LessonStructure['startAt'];
  status: LessonStatus;
  nextLesson: NextLessonMetadata;
  cron: string;
}

export type LessonsCrontab = LessonsCrontabEntry[];
