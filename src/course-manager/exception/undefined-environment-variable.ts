export class UndefinedEnvironmentVariable extends Error {
  constructor(public envKey: string) {
    super(`This environment variable should be defined: ${envKey}`);
    this.name = 'UndefinedEnvironmentVariable';
  }
}
