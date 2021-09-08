export class NoSuchAWeekOfDay extends Error {
  constructor(public weekOfDay: number) {
    super(`No such a week of day: ${weekOfDay}`);
    this.name = 'NoSuchAWeekOfDay';
  }
}
