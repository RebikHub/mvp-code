import { ChangeEvent } from 'react';

export const digitsOnly = (event: ChangeEvent<HTMLInputElement>) =>
  event.target.value.replace(/[^0-9]/g, '');

export const maskForPhoneNumber = (value: string) => {
  const numberSubStrings = value
    .replace(/\D/g, '')
    .match(/(\d\+{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
  const stringLengthWhenShouldClearInput = 4;

  value = numberSubStrings
    ? numberSubStrings[1]
      ? '+7 ' +
        '(' +
        (value.length === 1 ? value.charAt(0) : '') +
        numberSubStrings[2] +
        (numberSubStrings[3] ? ') ' + numberSubStrings[3] : '') +
        (numberSubStrings[4] ? '-' + numberSubStrings[4] : '') +
        (numberSubStrings[5] ? '-' + numberSubStrings[5] : '')
      : numberSubStrings[1]
    : '';

  return value.length <= stringLengthWhenShouldClearInput && value.includes('7')
    ? '+7'
    : value;
};
