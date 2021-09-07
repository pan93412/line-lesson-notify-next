import type { Readable } from 'stream';

export abstract class BaseConverter<T> {
  abstract deserialize(data: Readable): Promise<T>;

  abstract serialize(data: T): string;
}
