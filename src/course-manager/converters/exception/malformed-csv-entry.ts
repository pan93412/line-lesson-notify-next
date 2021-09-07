export class MalformedCsvEntry extends Error {
  constructor(public csvEntry: Record<string, string>) {
    super(`Malformed CSV entry: ${JSON.stringify(csvEntry)}`);
    this.name = 'MalformedCsvEntry';
  }
}
