import * as fs from 'fs';

export const input = fs.createReadStream(
  `${__dirname}/deserialize-to-csv-structure-input.csv`,
);
export const corruptedInput1 = fs.createReadStream(
  `${__dirname}/deserialize-corrupted-input-1.csv`,
);
export const corruptedInput2 = fs.createReadStream(
  `${__dirname}/deserialize-corrupted-input-2.csv`,
);

export const output = [
  {
    subject: 'Subject 1',
    weekOfDay: 1,
    startAt: '11:00',
    endAt: '12:00',
  },
  {
    subject: 'Subject 2',
    weekOfDay: 1,
    startAt: '12:00',
    endAt: '13:00',
  },
];
