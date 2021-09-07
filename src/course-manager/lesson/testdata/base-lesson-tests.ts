import { Lesson } from '../parser';

export const baseLesson = [
  new Lesson({
    subject: 'Subject A',
    startAt: '08:10',
    endAt: '09:00',
    weekOfDay: 1,
  }),
  new Lesson({
    subject: 'Subject B',
    startAt: '09:10',
    endAt: '10:00',
    weekOfDay: 1,
  }),
  new Lesson({
    subject: 'Subject A',
    startAt: '10:10',
    endAt: '11:00',
    weekOfDay: 1,
  }),
  new Lesson({
    subject: 'Subject B',
    startAt: '11:10',
    endAt: '12:00',
    weekOfDay: 1,
  }),
  new Lesson({
    subject: 'Subject A',
    startAt: '08:10',
    endAt: '09:00',
    weekOfDay: 2,
  }),
  new Lesson({
    subject: 'Subject B',
    startAt: '09:10',
    endAt: '10:00',
    weekOfDay: 2,
  }),
  new Lesson({
    subject: 'Subject C',
    startAt: '10:10',
    endAt: '11:00',
    weekOfDay: 2,
  }),
  new Lesson({
    subject: 'Subject D',
    startAt: '11:10',
    endAt: '12:00',
    weekOfDay: 2,
  }),
] as const;
