import { NoSuchAWeekOfDay } from './exception/no-such-a-week-of-day';

export function chineseWeekOfDay(weekOfDay: number) {
  if (!(weekOfDay >= 0 && weekOfDay <= 6))
    throw new NoSuchAWeekOfDay(weekOfDay);

  return (
    (
      [
        '星期日',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六',
      ] as const
    )[weekOfDay] ?? ''
  );
}
