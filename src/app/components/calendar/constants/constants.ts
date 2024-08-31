export interface ISelectDate {
  abbreviation?: string;
  number: number;
  days?: number;
  value: number | string;
}

export const selectMonth: ISelectDate[] = [
  { value: 'shared.january', number: 0, days: 31, abbreviation: 'shared.jan' },
  { value: 'shared.february', number: 1, days: 28, abbreviation: 'shared.feb' },
  { value: 'shared.march', number: 2, days: 31, abbreviation: 'shared.mar' },
  { value: 'shared.april', number: 3, days: 30, abbreviation: 'shared.apr' },
  { value: 'shared.may', number: 4, days: 31, abbreviation: 'shared.ma' },
  { value: 'shared.june', number: 5, days: 30, abbreviation: 'shared.jun' },
  { value: 'shared.july', number: 6, days: 31, abbreviation: 'shared.jul' },
  { value: 'shared.august', number: 7, days: 31, abbreviation: 'shared.aug' },
  {
    value: 'shared.september',
    number: 8,
    days: 30,
    abbreviation: 'shared.sep',
  },
  { value: 'shared.october', number: 9, days: 31, abbreviation: 'shared.oct' },
  {
    value: 'shared.november',
    number: 10,
    days: 30,
    abbreviation: 'shared.nov',
  },
  {
    value: 'shared.december',
    number: 11,
    days: 31,
    abbreviation: 'shared.dec',
  },
];

export const selectHours: ISelectDate[] = Array(24)
  .fill({
    value: 0,
    number: 0,
  })
  .map((_, i) => ({
    value: `${i}`.length === 1 ? `0${i}` : `${i}`,
    number: i,
  }));

export const selectMinutes: ISelectDate[] = Array(60)
  .fill({
    value: 0,
    number: 0,
  })
  .map((_, i) => ({
    value: `${i}`.length === 1 ? `0${i}` : `${i}`,
    number: i,
  }));
