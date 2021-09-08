import {
  getEntryForClassDismiss,
  getEntryForClassStart,
} from './lessons-utils';
import type { Lesson } from './lesson';
import type { LessonsCrontab } from './types';
import { NoSuchAWeekOfDay } from './exception/no-such-a-week-of-day';
import { LessonOutOfRange } from './exception/lesson-out-of-range';

export class Lessons {
  /**
   * The lesson
   *
   * It is a two-dimension array. The outer is the week of day;
   * The inner is the ordered lesson.
   *
   * We ensure it covered the whole WeekOfDay.
   */
  private lessons: Lesson[][] = Array(7)
    .fill(null)
    .map(() => []);

  private get FlattedLesson(): Lesson[] {
    return this.lessons.flat();
  }

  getLessonsOfThatDay(weekOfDay: number): Lesson[] {
    const lessonsOfThatDay = this.lessons[weekOfDay];

    if (lessonsOfThatDay) return lessonsOfThatDay;
    throw new NoSuchAWeekOfDay(weekOfDay);
  }

  /**
   * Push a lesson.
   *
   * Time complexity: O(1)
   *
   * @param lesson The lesson to push into.
   * @return {Lessons} Lessons. You can chain `.pushLesson`.
   */
  pushLesson(lesson: Lesson): this {
    this.getLessonsOfThatDay(lesson.WeekOfDay).push(lesson);
    return this;
  }

  /**
   * Remove a lesson.
   *
   * Time complexity: O(n)
   *
   * @param lesson
   */
  removeLesson(lesson: Lesson): this {
    const weekOfDay = lesson.WeekOfDay;
    this.lessons[weekOfDay] = this.getLessonsOfThatDay(lesson.WeekOfDay).filter(
      (lEntry) => lEntry !== lesson,
    );

    return this;
  }

  /**
   * Get the lessons crontab.
   *
   * Time complexity: O(n)
   */
  get LessonsCrontab(): LessonsCrontab {
    const lessonsCrontab = [];
    const flattedLesson = this.FlattedLesson;

    for (let i = 0; i < flattedLesson.length; i += 1) {
      // This lesson.
      const thisLesson = flattedLesson[i];

      // Next lesson.
      const nextLessonIndex = i + 1 >= flattedLesson.length ? 0 : i + 1;
      const nextLesson = flattedLesson[nextLessonIndex];

      if (!(thisLesson && nextLesson))
        throw new LessonOutOfRange(i, nextLessonIndex, flattedLesson.length);

      const args: [Lesson, Lesson] = [thisLesson, nextLesson];
      lessonsCrontab.push(
        getEntryForClassStart(...args),
        getEntryForClassDismiss(...args),
      );
    }

    return lessonsCrontab;
  }
}
