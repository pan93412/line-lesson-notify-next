import {
  getEntryForClassDismiss,
  getEntryForClassStart,
} from './lessons-utils';
import type { Lesson } from './lesson';
import type { LessonsCrontab } from './types/lessons-crontab';

export class Lessons {
  /**
   * The lesson
   *
   * It is a two-dimension array. The outer is the week of day;
   * The inner is the ordered lesson.
   *
   * We ensure it covered the whole WeekOfDay.
   */
  private lessons: Lesson[][] = Array(7).fill([]);

  private get FlattedLesson(): Lesson[] {
    return this.lessons.flat();
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
    const weekOfDay = lesson.WeekOfDay;
    this.lessons[weekOfDay].push(lesson);

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
    this.lessons[weekOfDay] = this.lessons[weekOfDay].filter(
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

      const args: [Lesson, Lesson] = [thisLesson, nextLesson];
      lessonsCrontab.push(
        getEntryForClassStart(...args),
        getEntryForClassDismiss(...args),
      );
    }

    return lessonsCrontab;
  }
}
