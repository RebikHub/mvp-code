import { IConditionParameters, IOrder } from '@/app/api/types';

import {
  convertDateToReadable,
  convertDateToTimestamp,
  convertDaysToTimestamp,
  daysFromTimestamp,
} from './converterDate';

const getOpeningParams = (params: IConditionParameters) => {
  let openingDate = null;
  let openingDays = null;

  Object.keys(params).forEach((key) => {
    const date = params?.[key]?.['date'];
    const days = params?.[key]?.['days'];
    if (date) {
      openingDate = convertDateToTimestamp(date);
    }
    if (days) {
      openingDays = convertDaysToTimestamp(days);
    }
  });

  return {
    openingDate,
    openingDays,
  };
};

const openingOrder = (params: IConditionParameters): number => {
  const currentDate = Date.now();

  const { openingDate, openingDays } = getOpeningParams(params);

  if (openingDate) {
    const nearestOpeningDate = openingDate - currentDate;
    return daysFromTimestamp(nearestOpeningDate) > 0
      ? daysFromTimestamp(nearestOpeningDate)
      : 0;
  }

  return openingDays ? daysFromTimestamp(openingDays) : 0;
};

export const nearestOpeningConfirm = (params: IConditionParameters) => {
  const currentDate = Date.now();

  const { openingDate, openingDays } = getOpeningParams(params);

  if (openingDate) {
    return timestampToDayHoursMinute(
      openingDate - currentDate,
      'order.opening',
    );
  }

  if (openingDays) {
    return timestampToDayHoursMinute(
      openingDays - currentDate,
      'order.opening',
    );
  }

  return timestampToDayHoursMinute(currentDate, 'order.opening');
};

export const openingDate = (order: IOrder): string | null => {
  let openingDate = null;

  Object.keys(order.condition_parameters).forEach((key) => {
    const date = order?.condition_parameters?.[key]?.['date'];
    if (date) {
      openingDate = convertDateToReadable(date);
    }
  });

  return openingDate;
};

export const currentStatusOrder = (
  params: IConditionParameters,
  dateCreated: string,
) => {
  const currentDate = Date.now();
  const { openingDate, openingDays } = getOpeningParams(params);

  let dateEnd = currentDate;
  const dateStart = convertDateToTimestamp(dateCreated);

  if (openingDate) {
    dateEnd = openingDate;
  } else if (openingDays) {
    dateEnd = openingDays;
  }

  const totalPercent = daysFromTimestamp(dateEnd - dateStart) / 100;
  const currentDays = openingOrder(params) / totalPercent; // сколько осталось в процентах до исполнения
  return 100 - +currentDays.toFixed(0);
};

export const nearestOpeningTimestamp = (orders?: IOrder[]): number => {
  if (!orders?.length) {
    return 0;
  }

  const currentDate = Date.now();
  const arrayDates: number[] = [];
  const arrayDays: number[] = [];

  orders.forEach((order) => {
    Object.keys(order.condition_parameters).forEach((key) => {
      const date = order?.condition_parameters?.[key]?.['date'];
      const days = order?.condition_parameters?.[key]?.['days'];
      if (date) {
        const timestamp = convertDateToTimestamp(date);
        arrayDates.push(timestamp);
      }

      if (days) {
        const timestamp = convertDaysToTimestamp(days);
        arrayDays.push(timestamp);
      }
    });
  });

  if (arrayDates.length) {
    const sortArrayDates = arrayDates.sort((a, b) => a - b);
    const nearestOpeningDate = sortArrayDates[0] - currentDate;
    return nearestOpeningDate;
  }

  if (arrayDays.length) {
    const sortArrayDays = arrayDays.sort((a, b) => a - b);
    const nearestOpeningDays = sortArrayDays[0] - currentDate;
    return nearestOpeningDays;
  }

  return 0;
};

const timestampToDayHoursMinute = (
  timestamp: number,
  localizationId: string,
) => {
  if (!timestamp) {
    return {
      type: `${localizationId}.none`,
      value: 0,
    };
  }

  const minutes = timestamp / (60 * 1000);
  const hours = minutes / 60;
  const days = hours / 24;

  if (days < 1) {
    if (hours < 24 && hours > 1) {
      return {
        type: `${localizationId}.hours`,
        value: +hours.toFixed(),
      };
    }

    if (timestamp > 0) {
      return {
        type: `${localizationId}.minutes`,
        value: +minutes.toFixed(),
      };
    }

    return {
      type: `${localizationId}.done`,
      value: 0,
    };
  }

  return {
    type: `${localizationId}.days`,
    value: +days.toFixed(),
  };
};

export const nearestOpeningOrders = (
  orders?: IOrder[],
): { type: string; value: number } => {
  const timestamp = nearestOpeningTimestamp(orders);
  return timestampToDayHoursMinute(timestamp, 'info.opening');
};
