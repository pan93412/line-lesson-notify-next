export class UndefinedVariable extends Error {
  constructor(public variable: string) {
    super(`The "${variable}" variable is not defined.`);
    this.name = 'UndefinedVariable';
  }
}
