import type { Readable } from 'stream';
import parse from 'csv-parse';
import stringify from 'csv-stringify';
import type { LessonStructure } from '../lesson';
import { BaseLessonConverter } from './base/base-lesson-converter';
import { MalformedCsvEntry } from './exception/malformed-csv-entry';

interface CsvStructure extends Record<string, string> {
  day: string;
  subject: string;
  st: string;
  et: string;
}

/**
 * The converter for the CSV lessons list.
 *
 * The format of CSV should/would be:
 *
 * ```csv
 * day,subject,st,et
 * 1,Subject 1,11:00,12:00
 * ```
 *
 * The `day` should be between 0 and 6; The `st` and `et`
 * should be in the form of `hh:mm`.
 */
export class CsvLessonConverter extends BaseLessonConverter {
  async deserializeToCsvStructure(source: Readable): Promise<CsvStructure[]> {
    return new Promise((resolve, reject) => {
      const csvParsedData: CsvStructure[] = [];
      const csvParser = parse({
        columns: true,
      });

      source.pipe(csvParser);

      csvParser
        .on('readable', () => {
          let data: CsvStructure = csvParser.read();

          while (data) {
            csvParsedData.push(data);
            data = csvParser.read();
          }
        })
        .on('end', () => resolve(csvParsedData))
        .on('error', (err: unknown) => reject(err));
    });
  }

  private static csvStructureToLessonStructure(
    structure: CsvStructure,
  ): LessonStructure {
    const { subject, st, et, day } = structure;
    const weekOfDay = Number(day);

    if (!Number.isSafeInteger(weekOfDay) || weekOfDay < 0 || weekOfDay > 6)
      throw new MalformedCsvEntry(structure);

    return {
      subject,
      startAt: st,
      endAt: et,
      weekOfDay: Number(day),
    };
  }

  async deserialize(data: Readable): Promise<LessonStructure[]> {
    const deserializedData = await this.deserializeToCsvStructure(data);
    return deserializedData.map(
      CsvLessonConverter.csvStructureToLessonStructure,
      this,
    );
  }

  async serialize(input: LessonStructure[]): Promise<string> {
    return new Promise((resolve, reject) => {
      stringify(
        input,
        {
          header: true,
          columns: ['day', 'subject', 'st', 'et'],
        },
        (error, data) => {
          if (error) reject(error);
          resolve(data);
        },
      );
    });
  }
}
