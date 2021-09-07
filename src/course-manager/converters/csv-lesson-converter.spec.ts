import { CsvLessonConverter } from './csv-lesson-converter';
import {
  input as DTCSInput,
  output as DTCSOut,
} from './testdata/deserialize-to-csv-structure-success';
import {
  corruptedInput1 as DSCI1,
  corruptedInput2 as DSCI2,
  output as DSOut,
} from './testdata/deserialize-success';
import { MalformedCsvEntry } from './exception/malformed-csv-entry';

describe('CsvLessonConvert', () => {
  let converter: CsvLessonConverter;

  beforeAll(() => {
    converter = new CsvLessonConverter();
  });

  describe('deserializeToCsvStructure()', () => {
    it('should be able to deserialize it', async () => {
      const result = converter.deserializeToCsvStructure(DTCSInput);

      return expect(result).resolves.toStrictEqual(DTCSOut);
    });
  });

  describe('deserialize()', () => {
    it('should be able to deserialize it', async () => {
      const result = converter.deserialize(DTCSInput);
      return expect(result).resolves.toStrictEqual(DSOut);
    });

    it('should be thrown if any of entries malformed (1)', async () => {
      const result = converter.deserialize(DSCI1);
      return expect(result).rejects.toThrow(MalformedCsvEntry);
    });

    it('should be thrown if any of entries malformed (2)', async () => {
      const result = converter.deserialize(DSCI2);
      return expect(result).rejects.toThrow(MalformedCsvEntry);
    });
  });
});
