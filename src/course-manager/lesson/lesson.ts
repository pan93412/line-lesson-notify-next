import type { HHMMTime, LessonStructure } from './types/lesson-structure';
import { InvalidHHMMTimeFormat } from './exception/invalid-hhmmtime-format';

export class Lesson {
  constructor(private readonly lesson: LessonStructure) {}

  /**
   * Parse the `hh:mm` time to the standard cron format.
   *
   * We will only return the first 3 parts:
   *
   *   ```
   *   Second Minute Hour DayOfMonth Month DayOfWeek
   *   ------------------ these
   *   ```
   *
   * See [node-cron's documentation](https://www.npmjs.com/package/node-cron)
   * for more information about what the standard cron format is.
   *
   * @param hhmmTime The string formed in HHMMTime. See `lesson.ts`.
   * @returns {string} `Second Minute Hour`
   * @example ```js
   * >>> parseHHMMTimeToCron("02:12");
   * "0 12 2"
   * ```
   * @private
   */
  private static parseHHMMTimeToCron(hhmmTime: HHMMTime): string {
    const time = hhmmTime.split(':');

    // Check if the format is valid.
    if (time.length !== 2) throw new InvalidHHMMTimeFormat(hhmmTime);

    // Convert the hour and minute parts in hhmmTime
    // to `number`. It removes the useless leading 0.
    const [hh, mm] = time.map(Number);

    // Construct the Cron statement.
    return `0 ${mm} ${hh}`;
  }

  private timeCron(hhmmTime: string): string {
    const secondMinuteHour = Lesson.parseHHMMTimeToCron(hhmmTime);
    return `${secondMinuteHour} * * ${this.WeekOfDay}`;
  }

  /**
   * Get the Cron string of this course's start time.
   *
   * @example ```js
   * >>> lesson.StartTimeCron;
   * "* 12 12 * * 3"
   * ```
   */
  get StartTimeCron() {
    return this.timeCron(this.StartAt);
  }

  /**
   * Get the Cron string of this course's end time.
   *
   * @example ```js
   * >>> lesson.StartTimeCron;
   * "* 12 12 * * 3"
   * ```
   */
  get EndTimeCron() {
    return this.timeCron(this.EndAt);
  }

  get Subject() {
    return this.lesson.subject;
  }

  get StartAt() {
    return this.lesson.startAt;
  }

  get EndAt() {
    return this.lesson.endAt;
  }

  get WeekOfDay() {
    return this.lesson.weekOfDay;
  }
}
