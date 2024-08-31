export const sizeInRem = (sizeInPixels: number, isRem?: boolean) => {
  //   const baseFontSizeInPixels = parseFloat(
  //     getComputedStyle(document.documentElement).fontSize,
  //   );

  return isRem ? `${sizeInPixels / 16}rem` : sizeInPixels;
};
