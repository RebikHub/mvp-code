import { RefObject, forwardRef, useState } from 'react';

import { Select } from './Select';

import { useText } from '@/app/services/hooks/useLocalization';

import { ISelectDate, selectHours, selectMinutes } from './constants/constants';

import css from './Calendar.module.scss';

type Props = {
  onSelectDate: (date: string) => void;
  inputDate?: string;
  classNames?: string;
};

export const Time = forwardRef(
  ({ onSelectDate, inputDate, classNames }: Props, ref) => {
    const [currentTime, setCurrentTime] = useState({
      hours: inputDate?.split(':')[0],
      minutes: inputDate?.split(':')[1],
    });
    const hoursText = useText('shared.hours');
    const minutesText = useText('shared.minutes');

    const onSelectHour = (hour: ISelectDate) => {
      onSelectDate(`${hour.value}:${currentTime.minutes}`);
      setCurrentTime((prev) => ({
        ...prev,
        hours: hour.value as string,
      }));
    };

    const onSelectMinute = (minute: ISelectDate) => {
      onSelectDate(`${currentTime.hours}:${minute.value}`);
      setCurrentTime((prev) => ({
        ...prev,
        minutes: minute.value as string,
      }));
    };

    return (
      <div
        className={`${css.time} ${classNames}`}
        ref={ref as RefObject<HTMLDivElement>}
      >
        <div className={css.hours}>
          <Select
            value={currentTime.hours ? currentTime.hours : hoursText}
            data={selectHours}
            handleSelect={onSelectHour}
          />
        </div>
        <span>:</span>
        <div className={css.minutes}>
          <Select
            value={currentTime.minutes ? currentTime.minutes : minutesText}
            data={selectMinutes}
            handleSelect={onSelectMinute}
          />
        </div>
      </div>
    );
  },
);
