export const generateArray = (start: number, end?: number) => {
  const array = [];
  const finalEnd = end || 10;
  const finalStart = end ? start : start + 1;

  for (let i = finalStart; i <= finalEnd; i++) {
    array.push(i);
  }

  return array;
};
