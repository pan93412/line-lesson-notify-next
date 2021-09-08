import cron from 'node-cron';
import { Lessons } from './lessons';
import { baseLesson } from './testdata/base-lesson-tests';
import { LessonsCrontabSuccess1 } from './testdata/lessons-crontab-success-1';
import type { Lesson } from './lesson';

describe('.LessonsCrontab', () => {
  let baseLessonTests: Lesson[] = [];

  beforeEach(() => {
    baseLessonTests = [...baseLesson];
  });

  test('Check if it can return the expect value.', () => {
    // initiate
    const lessons = new Lessons();
    baseLessonTests.forEach((l) => lessons.pushLesson(l));

    expect(lessons.LessonsCrontab).toStrictEqual(LessonsCrontabSuccess1);
  });

  test('Check if the cron statement it returns valid.', () => {
    // initiate
    const lessons = new Lessons();
    baseLessonTests.forEach((l) => lessons.pushLesson(l));

    lessons.LessonsCrontab.forEach(({ cron: cronStatement }) =>
      expect(cron.validate(cronStatement)).toBeTruthy(),
    );

    expect(lessons.LessonsCrontab).toStrictEqual(LessonsCrontabSuccess1);
  });
});
