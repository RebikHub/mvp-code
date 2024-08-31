export const convertDateToReadable = (originalDate?: string) => {
  if (!originalDate) {
    return '';
  }

  const dateWithTimeZone =
    originalDate?.endsWith('Z') || originalDate.includes('+')
      ? originalDate
      : `${originalDate}Z`;

  const formattedDate = new Date(dateWithTimeZone).toLocaleString('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  return formattedDate.replace(',', '');
};

export const createOrderDate = () => {
  const formattedDate = new Date().toLocaleString('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
  return formattedDate.replace(',', '');
};

export const convertToISOString = (date: string) => {
  const [datePart, timePart] = date.split(' ');
  const [day, month, year] = datePart.split('.');
  const isoDate = new Date(
    `${month} ${day} ${year} ${timePart ?? '00:00'}`,
  ).toISOString();

  return isoDate;
};

export const convertDateToTimestamp = (originalDate: string) => {
  const timestamp = new Date(originalDate).getTime();
  return timestamp;
};

export const convertDaysToTimestamp = (originalDays: string) => {
  const currentDate = Date.now();
  const timestamp = +originalDays * 24 * 60 * 60 * 1000 + currentDate;
  return timestamp;
};

export const daysFromTimestamp = (timestamp: number) => {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const days = Number((timestamp / millisecondsPerDay).toFixed());
  return days;
};

export const dateWithoutTime = (date: string) => {
  const splitTime = date.split(' ');
  return splitTime[0];
};
