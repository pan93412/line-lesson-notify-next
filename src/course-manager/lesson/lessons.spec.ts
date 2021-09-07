import type { Lesson } from './parser';
import { Lessons } from './lessons';
import { baseLesson } from './testdata/base-lesson-tests';
import { LessonsCrontabSuccess1 } from './testdata/lessons-crontab-success-1';

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
});
