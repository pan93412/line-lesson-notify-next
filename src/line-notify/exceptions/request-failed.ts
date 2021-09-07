export class RequestFailed extends Error {
  constructor(public error: unknown) {
    super(
      `Failed to get the response: ${
        error instanceof Error ? error.message : `${error}`
      }`,
    );
    this.name = 'RequestFailed';
  }
}
