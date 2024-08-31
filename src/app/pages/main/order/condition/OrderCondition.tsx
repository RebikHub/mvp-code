import cn from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Calendar } from '@/app/components/calendar/Calendar';
import { Time } from '@/app/components/calendar/Time';
import { InputDate } from '@/app/components/input-date/InputDate';
import { Checkbox } from '@/app/components/ui-kit/checkbox/Checkbox';
import { Input } from '@/app/components/ui-kit/input/Input';
import { useNextStep } from '@/app/components/ui-kit/steps/hooks/useNextStep';

import { ButtonsGroup } from '../components/buttons-group/ButtonsGroup';

import { IConditionParameters } from '@/app/api/types';

import { useOrderStore } from '@/app/store/order';

import { useDisplayErrorToast } from '@/app/services/hooks/useDisplayErrorToast';
import { useFormManagement } from '@/app/services/hooks/useFormManagement';
import { useText } from '@/app/services/hooks/useLocalization';
import {
  convertDateToReadable,
  convertToISOString,
  createOrderDate,
} from '@/app/services/utils/converterDate';
import { digitsOnly } from '@/app/services/validators/mask';
import { validateOnlyNumbers } from '@/app/services/validators/validators';

import { Keys } from '@/app/types/enums';

import calendarIcon from '@/assets/images/calendar-icon.svg';
import timeIcon from '@/assets/images/time-icon.svg';

import { useStepsData } from '../hooks/useStepsData';

import css from './OrderCondition.module.scss';

export const OrderCondition = () => {
  const navigate = useNavigate();
  const { nextUrl, stepStatus } = useStepsData();
  const { formState, onSubmit, setValue, getValues } = useFormManagement();
  const dateText = useText('shared.date');
  const timeText = useText('shared.time');
  const absenceText = useText('input.condition.absence');

  const conditionsParams = useOrderStore.use.condition_parameters();
  const { displayErrorToast } = useDisplayErrorToast();
  const setOrderConditions = useOrderStore.use.setOrderConditions();

  const [inputsVisible, setInputsVisible] = useState({
    dateInput: !!conditionsParams[Keys.date]?.date,
    absenceInput: !!conditionsParams[Keys.days]?.days,
  });

  const handleVisibleDateInput = (check: boolean) => {
    setInputsVisible((prev) => ({
      ...prev,
      dateInput: check,
    }));
  };

  const handleVisibleAbsenceInput = (check: boolean) => {
    setInputsVisible((prev) => ({
      ...prev,
      absenceInput: check,
    }));
  };

  const handleNextStep = (data: FieldValues) => {
    const ids = [];
    const params: IConditionParameters = {};

    if (inputsVisible.dateInput && data.date) {
      ids.push(Keys.date);
      params[Keys.date] = {
        date: convertToISOString(`${data.date} ${data.time ?? '00:00'}`),
      };
    }

    if (inputsVisible.absenceInput && data.days) {
      ids.push(Keys.days);
      params[Keys.days] = { days: data.days };
    }

    setOrderConditions({
      ids,
      params,
    });

    if (data && ids.length > 0) {
      nextUrl && navigate(nextUrl);
    } else {
      displayErrorToast('error.toast.condition');
    }
  };

  useEffect(() => {
    setValue('days', conditionsParams[Keys.days]?.days || 30);
  }, [conditionsParams, setValue]);

  useNextStep({
    status: inputsVisible.dateInput || inputsVisible.absenceInput,
    values: getValues,
    handler: handleNextStep,
  });

  const date = useMemo(() => {
    const valueDate = conditionsParams[Keys.date]?.date
      ? convertDateToReadable(conditionsParams[Keys.date].date)
      : createOrderDate();

    return {
      date: valueDate.split(' ')[0],
      time: valueDate.split(' ')[1],
    };
  }, [conditionsParams]);

  return (
    <div className={css.container}>
      <div className={css.checkbox}>
        <Checkbox
          label={useText('input.condition.date')}
          side="right"
          check={!!conditionsParams[Keys.date]?.date}
          onClick={handleVisibleDateInput}
        />
        {inputsVisible.dateInput && (
          <div className={css.date}>
            <InputDate
              label
              placeholder={dateText}
              autoComplete="off"
              size="short"
              outsideValue={date.date}
              name="date"
              formState={formState}
              iconSrc={calendarIcon}
              render={({ classNames, onSelectDate, inputDate, ref }) => (
                <Calendar
                  classNames={cn(classNames, css.calendar)}
                  onSelectDate={onSelectDate}
                  inputDate={inputDate}
                  ref={ref}
                />
              )}
            />
            <InputDate
              label
              placeholder={timeText}
              autoComplete="off"
              size="short"
              outsideValue={date.time}
              name="time"
              formState={formState}
              iconSrc={timeIcon}
              render={({ classNames, onSelectDate, inputDate, ref }) => (
                <Time
                  classNames={classNames}
                  onSelectDate={onSelectDate}
                  inputDate={inputDate}
                  ref={ref}
                />
              )}
            />
          </div>
        )}
      </div>
      <div className={css.checkbox}>
        <Checkbox
          label={useText('input.condition.absence')}
          side="right"
          check={!!conditionsParams[Keys.days]?.days}
          onClick={handleVisibleAbsenceInput}
        />
        {inputsVisible.absenceInput && (
          <Input
            label={absenceText}
            placeholder={absenceText}
            name="days"
            formState={formState}
            validate={validateOnlyNumbers}
            mask={digitsOnly}
          />
        )}
      </div>
      <div className={css.checkbox}>
        <Checkbox
          label={useText('input.condition.info')}
          side="right"
          onClick={handleVisibleAbsenceInput}
          disabled
        />
      </div>

      <ButtonsGroup
        type="button"
        onNextStep={onSubmit(handleNextStep)}
        disabled={!stepStatus}
      />
    </div>
  );
};
