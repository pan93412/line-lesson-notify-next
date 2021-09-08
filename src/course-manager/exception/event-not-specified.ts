export class EventNotSpecified extends Error {
  constructor(public event: string) {
    super(`You should specify the event handler of ${event}.`);
    this.name = 'EventNotSpecified';
  }
}
