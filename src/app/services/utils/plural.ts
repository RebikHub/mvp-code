const changeRuWord = (num: number): number => {
  const length = Number(String(num).split('').reverse()[0]);
  const one = length === 1 && num !== 11;
  const few =
    (length === 2 && num !== 12) ||
    (length === 3 && num !== 13) ||
    (length === 4 && num !== 14);

  if (one) {
    return 0;
  } else if (few) {
    return 1;
  }
  return 2;
};

export const valueForPlural = (locale: boolean, num: number): number => {
  return locale ? changeRuWord(Number(num)) : Number(num);
};
