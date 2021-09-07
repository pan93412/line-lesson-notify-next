export class InvalidHHMMTimeFormat extends Error {
  constructor(public rawFormat: string) {
    super(`Malformed HHMMTime: ${rawFormat}`);
    this.name = 'InvalidHHMMTimeFormat';
  }
}
