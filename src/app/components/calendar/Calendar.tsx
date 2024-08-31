import cn from 'classnames';
import {
  Fragment,
  RefObject,
  forwardRef,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { FormattedMessage } from 'react-intl';

import { Icon } from '../ui-kit/icon/Icon';
import { Select } from './Select';

import { useLocaleStore } from '@/app/store/localization';

import left from '@/assets/images/arrow-date-left.svg';
import right from '@/assets/images/arrow-date-right.svg';

import { DateDay, DateWeeks } from './types';

import { ISelectDate, selectMonth } from './constants/constants';
import date from './utils/date';

import css from './Calendar.module.scss';

type Props = {
  onSelectDate: (date: string) => void;
  inputDate?: string;
  classNames?: string;
  isDateBirth?: boolean;
};

export const Calendar = forwardRef(
  ({ onSelectDate, inputDate, classNames, isDateBirth }: Props, ref) => {
    const locale = useLocaleStore.use.locale();
    const weeks = useMemo(
      () =>
        !inputDate
          ? date.arrayDaysMonth(
              date.getDate(locale).year,
              date.getDate(locale).number,
            )
          : date.arrayDaysMonth(
              date.getDateFromString(locale, inputDate).year,
              date.getDateFromString(locale, inputDate).number,
            ),
      [inputDate, locale],
    );
    const dateCalendar = useMemo(
      () =>
        inputDate
          ? date.getDateFromString(locale, inputDate)
          : date.getDate(locale),
      [inputDate, locale],
    );

    const [currentDate, setCurrentDate] = useState(dateCalendar);
    const [days, setWeeks] = useState<DateWeeks>(weeks);
    const [currentDay, setCurrentDay] = useState<number | null | undefined>(
      inputDate
        ? date.getDateFromString(locale, inputDate).day
        : date.getDate(locale).day,
    );

    const onChoiceDate = (day: DateDay) => {
      setCurrentDay(day.numberDay);
      const selectDate = date.convertDate({
        day: day.numberDay,
        month: currentDate.number + 1,
        year: currentDate.year,
      });
      onSelectDate(`${selectDate}`); // toISOString => 2024-01-26T11:41:36.620Z
    };

    const prevMonth = () => {
      setCurrentDate((prev) =>
        date.getDate(locale, prev.number - 1, prev.year),
      );
    };

    const nextMonth = () => {
      setCurrentDate((prev) =>
        date.getDate(locale, prev.number + 1, prev.year),
      );
    };

    const onSelectMonth = (month: ISelectDate) => {
      setCurrentDate((prev) => ({
        ...prev,
        number: month.number,
      }));
    };

    const onSelectYear = (year: ISelectDate) => {
      setCurrentDate((prev) => ({
        ...prev,
        year: year.number,
      }));
    };

    useEffect(() => {
      const weeks = date.arrayDaysMonth(currentDate.year, currentDate.number);
      setWeeks(weeks);
    }, [currentDate]);

    useEffect(() => {
      const selectDate = date.convertDate({
        day: currentDay!,
        month: currentDate.number + 1,
        year: currentDate.year,
      });

      onSelectDate(`${selectDate}`);
    }, [currentDate.number, currentDate.year, currentDay, onSelectDate]);

    return (
      <div
        className={cn(css.calendar, classNames)}
        ref={ref as RefObject<HTMLDivElement>}
      >
        <div className={css.header}>
          <div className={css.selects}>
            <div className={css.selects_day}>
              <p>{currentDay}</p>
            </div>

            <div className={css.selects_month}>
              <Select
                value={currentDate.name}
                data={selectMonth}
                handleSelect={onSelectMonth}
              />
            </div>

            <div className={css.selects_year}>
              <Select
                value={`${currentDate.year}`}
                data={
                  isDateBirth
                    ? date.getYearsForBirthArray()
                    : date.getYearsArray()
                }
                handleSelect={onSelectYear}
              />
            </div>
          </div>
          <div className={css.icons}>
            <Icon
              className={css.prev}
              image={left}
              width={20}
              height={17}
              onClick={prevMonth}
            />
            <Icon
              className={css.next}
              image={right}
              width={20}
              height={17}
              onClick={nextMonth}
            />
          </div>
        </div>

        <div className={css.thead}>
          <p title="Понедельник">
            <FormattedMessage id="shared.mon" />
          </p>
          <p title="Вторник">
            <FormattedMessage id="shared.tue" />
          </p>
          <p title="Среда">
            <FormattedMessage id="shared.wed" />
          </p>
          <p title="Четверг">
            <FormattedMessage id="shared.thu" />
          </p>
          <p title="Пятница">
            <FormattedMessage id="shared.fri" />
          </p>
          <p title="Суббота">
            <FormattedMessage id="shared.sat" />
          </p>
          <p title="Воскресенье">
            <FormattedMessage id="shared.sun" />
          </p>
        </div>

        <div className={css.table}>
          {days !== null && (
            <>
              {Object.entries(days).map((el) => (
                <div className={css.table_row} key={el[0]}>
                  {el[1].map((day, i) => (
                    <Fragment key={i}>
                      {day.numberDay ? (
                        <p
                          className={cn(css.day, {
                            [css.day_active]: currentDay === day.numberDay,
                          })}
                          onClick={() => onChoiceDate(day)}
                        >
                          {day.numberDay}
                        </p>
                      ) : (
                        <p className={css.empty}>{''}</p>
                      )}
                    </Fragment>
                  ))}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    );
  },
);
