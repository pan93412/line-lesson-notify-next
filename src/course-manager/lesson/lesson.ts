import type { Infer } from 'myzod';
import myzod from 'myzod';

/**
 * The schema of HHMMTime.
 */
export const HHMMTimeSchema = myzod
  .string()
  .pattern(/^([0-1][0-9]|2[0-3]):([0-5][0-9])$/);
export type HHMMTime = Infer<typeof HHMMTimeSchema>;

export const LessonStructureSchema = myzod.object({
  /**
   * The subject name of this lesson.
   */
  subject: myzod.string(),

  /**
   * The week of the day when this lesson starts.
   *
   * `0` is Sunday, `1` is Monday, ..., `6` is Saturday.
   */
  weekOfDay: myzod.number().min(0).max(6),

  /**
   * When does this lesson start?
   *
   * In 24-hours `hh:mm` format, your local time.
   *
   * @example `11:00`
   */
  startAt: HHMMTimeSchema,

  /**
   * When does this lesson end?
   *
   * In 24-hours `hh:mm` format, your local time.
   *
   * @example `12:00`
   */
  endAt: HHMMTimeSchema,
});
export type LessonStructure = Infer<typeof LessonStructureSchema>;
