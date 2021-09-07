import * as fs from 'fs';

export const input = fs.createReadStream(
  `${__dirname}/deserialize-to-csv-structure-input.csv`,
);

export const output = [
  {
    day: '1',
    subject: 'Subject 1',
    st: '11:00',
    et: '12:00',
  },
  {
    day: '1',
    subject: 'Subject 2',
    st: '12:00',
    et: '13:00',
  },
];
