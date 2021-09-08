import type { Lesson } from './lesson';
import type { LessonsCrontabEntry, NextLessonMetadata } from './types';
import { LessonStatus } from './types';

function getNextLessonMetadata(nextLesson: Lesson): NextLessonMetadata {
  return {
    subject: nextLesson.Subject,
    startAt: nextLesson.StartAt,
    weekOfDay: nextLesson.WeekOfDay,
  };
}

/**
 * Get the lesson crontab entry for CLASS_START.
 *
 * @param thisLesson The current lesson.
 * @param nextLesson The next lesson.
 * @return {LessonsCrontabEntry} A entry that can push to LessonsCrontab.
 */
export function getEntryForClassStart(
  thisLesson: Lesson,
  nextLesson: Lesson,
): LessonsCrontabEntry {
  return {
    subject: thisLesson.Subject,
    startAt: thisLesson.StartAt,
    status: LessonStatus.CLASS_START,
    nextLesson: getNextLessonMetadata(nextLesson),
    cron: thisLesson.StartTimeCron,
  };
}

/**
 * Get the lesson crontab entry for CLASS_DISMISS (or LAST_CLASS_DISMISS).
 *
 * @param thisLesson The current lesson.
 * @param nextLesson The next lesson.
 * @return {LessonsCrontabEntry} A entry that can push to LessonsCrontab.
 */
export function getEntryForClassDismiss(
  thisLesson: Lesson,
  nextLesson: Lesson,
): LessonsCrontabEntry {
  const suitableStatus =
    thisLesson.WeekOfDay === nextLesson.WeekOfDay
      ? // If this lesson's WoD is same as the next lesson's,
        // we set the status as CLASS_DISMISS;
        LessonStatus.CLASS_DISMISS
      : // otherwise, LAST_CLASS_DISMISS.
        LessonStatus.LAST_CLASS_DISMISS;

  return {
    subject: thisLesson.Subject,
    startAt: thisLesson.StartAt,
    status: suitableStatus,
    nextLesson: getNextLessonMetadata(nextLesson),
    cron: thisLesson.EndTimeCron,
  };
}
