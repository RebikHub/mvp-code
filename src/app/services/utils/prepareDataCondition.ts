import { ICondition } from '@/app/api/types';

export const prepareDataCondition = (data: ICondition[]) => {
  let date = '';
  let days = '';
  let api = '';

  data.forEach((condition) => {
    if (condition.name === 'Дата события') {
      date = condition.id;
    }
    if (condition.name === 'Отсутсвие в системе') {
      days = condition.id;
    }
    if (condition.name === 'Информация из API') {
      api = condition.id;
    }
  });

  return {
    date,
    days,
    api,
  };
};
