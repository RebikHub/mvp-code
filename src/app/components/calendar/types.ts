export type DateDay = {
  indexDay: number | null;
  numberDay: number | null;
};

export type DateWeeks = {
  [key: string]: DateDay[];
};

export type PickDate = {
  day: number | null;
  month: number;
  year: number;
};

export type HandleSelectPickDate = {
  title: string;
  selectedDate: string;
};
