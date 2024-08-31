import { DateDay, DateWeeks, PickDate } from '../types';

const getDate = (locale: string, num?: number, year?: number) => {
  if (num !== undefined && year) {
    return {
      name: new Intl.DateTimeFormat(locale, { month: 'long' }).format(
        new Date(year, num),
      ),
      number: num > 11 ? 0 : num < 0 ? 11 : num,
      year: num > 11 ? year + 1 : num < 0 ? year - 1 : year,
    };
  }

  const date = new Date();

  return {
    name: new Intl.DateTimeFormat(locale, { month: 'long' }).format(date),
    day: date.getDate(),
    number: date.getMonth(),
    year: date.getFullYear(),
    minutes:
      `${date.getMinutes()}`.length === 1
        ? `0${date.getMinutes()}`
        : `${date.getMinutes()}`,
    hours:
      `${date.getHours()}`.length === 1
        ? `0${date.getHours()}`
        : `${date.getHours()}`,
  };
};

const getDateFromString = (locale: string, dateString: string) => {
  const date = convertStringToDate(dateString);

  return {
    name: new Intl.DateTimeFormat(locale, { month: 'long' }).format(date),
    day: date.getDate(),
    number: date.getMonth(),
    year: date.getFullYear(),
    minutes:
      `${date.getMinutes()}`.length === 1
        ? `0${date.getMinutes()}`
        : `${date.getMinutes()}`,
    hours:
      `${date.getHours()}`.length === 1
        ? `0${date.getHours()}`
        : `${date.getHours()}`,
  };
};

const daysInMonth = (year: number, month: number) => {
  const days = new Date(year, month + 1, 0);
  return days.getDate();
};

const dayOfWeek = (year: number, month: number, day: number) => {
  const date = new Date(year, month, day);
  return date.getDay();
};

const correctIndex = (index: number) => {
  if (index !== 0) {
    return index - 1;
  }
  return 6;
};

const arrayDaysMonth = (year: number, month: number): DateWeeks => {
  const days = daysInMonth(year, month);
  let count = 0;
  const arr: DateDay[] = Array.from({ length: 7 }, () => ({
    indexDay: null,
    numberDay: null,
  }));

  const weeks: DateWeeks = {};
  for (let i = 0; i < days; i += 1) {
    const index = dayOfWeek(year, month, i + 1);
    arr[correctIndex(index)] = {
      indexDay: index,
      numberDay: i + 1,
    };

    if (days === i + 1) {
      index !== 0 &&
        arr.fill(
          {
            indexDay: null,
            numberDay: null,
          },
          index,
        );
    }

    weeks[`week-${count}`] = [...arr];
    if (index === 0) {
      count += 1;
      arr.map(() => ({
        indexDay: null,
        numberDay: null,
      }));
    }
  }

  return weeks;
};

const convertDate = (date: PickDate) => {
  const day = String(date.day).length === 1 ? `0${date.day}` : date.day;

  const month = String(date.month).length === 1 ? `0${date.month}` : date.month;

  return `${day}.${month}.${date.year}`;
};

const getYearsArray = () => {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let year = currentYear; year < currentYear + 100; year += 1) {
    years.push({
      number: year,
      value: year,
    });
  }

  return years;
};

const getYearsForBirthArray = () => {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let year = currentYear - 120; year < currentYear; year += 1) {
    years.push({
      number: year,
      value: year,
    });
  }

  return years;
};

export const convertStringToDate = (dateString: string): Date => {
  const dateParts = dateString.split(' ');
  let date = null;
  let time = null;

  if (dateParts[0]) {
    const splitDate = dateParts[0].split('.');
    date = {
      year: +splitDate[2],
      month: +splitDate[1] - 1,
      day: +splitDate[0],
    };
  }

  if (dateParts[1]) {
    const splitTime = dateParts[1].split(':');
    time = {
      hour: +splitTime[0],
      minute: +splitTime[1],
    };
  }

  if (date && time) {
    return new Date(date.year, date.month, date.day, time.hour, time.minute);
  } else if (date && !time) {
    return new Date(date.year, date.month, date.day);
  }
  return new Date();
};

export default {
  getDate,
  getYearsArray,
  daysInMonth,
  dayOfWeek,
  arrayDaysMonth,
  convertDate,
  getDateFromString,
  getYearsForBirthArray,
};
