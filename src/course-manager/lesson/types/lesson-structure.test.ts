import { ValidationError } from 'myzod';
import { HHMMTimeSchema } from './lesson-structure';

describe('HHMMTime - Accepts', () => {
  const testset = {
    '11:10': true,
    '24:12': false,
    '23:0': false,
    '23:00': true,
    '23:56': true,
    '06:14': true,
    '06:06': true,
    '999:999': false,
    '915:259': false,
    '6:25': false,
    '06:5': false,
    '6:5': false,
    'ABC 6:5': false,
    '6:5 ABC': false,
    '6;5': false,
  };

  Object.entries(testset).forEach(([val, expectResult]) => {
    test(`${val} should be ${expectResult ? 'valid' : 'invalid'}`, () => {
      const expectStatement = expect(HHMMTimeSchema.try(val));
      if (expectResult) expectStatement.not.toBeInstanceOf(ValidationError);
      else expectStatement.toBeInstanceOf(ValidationError);
    });
  });
});
