import cn from 'classnames';
import { useEffect, useState } from 'react';
import { FieldValues } from 'react-hook-form';

import { Calendar } from '@/app/components/calendar/Calendar';
import { InputDate } from '@/app/components/input-date/InputDate';
import { Button } from '@/app/components/ui-kit/button/Button';
import { CheckboxWrapper } from '@/app/components/ui-kit/checkbox-wrapper/CheckboxWrapper';
import { Checkbox } from '@/app/components/ui-kit/checkbox/Checkbox';
import { InfoStep } from '@/app/components/ui-kit/info-step/InfoStep';
import { Input } from '@/app/components/ui-kit/input/Input';

import api from '@/app/api/api';
import cognito from '@/app/api/cognito/cognito';
import { useBaseMutation } from '@/app/api/hooks/useBaseMutation';

import { useUserStore } from '@/app/store/user';

import { useFormManagement } from '@/app/services/hooks/useFormManagement';
import { useText } from '@/app/services/hooks/useLocalization';
import {
  convertDateToReadable,
  convertToISOString,
} from '@/app/services/utils/converterDate';
import {
  validateDefaultRequired,
  validatePhone,
} from '@/app/services/validators/validators';

import calendarIcon from '@/assets/images/calendar-icon.svg';

import css from './ProfileAccount.module.scss';

export const ProfileAccount = () => {
  const [birthDate, setBirthDate] = useState('');
  const [checkSex, setCheckSex] = useState('');

  const { formState, setValue, onSubmit } = useFormManagement();
  const { formState: passFormState, onSubmit: passOnSubmit } =
    useFormManagement();

  const user = useUserStore();

  const { mutate: updateProfile, isPending: isPendingUpdate } = useBaseMutation(
    api.users.putUsers,
    {
      invalidateQueryKey: `get/users/${user.id}`,
      success: {
        text: 'toast.profile.update',
      },
    },
  );
  const { mutate: changePassword, isPending: isPendingChange } =
    useBaseMutation(cognito.changePassword, {
      success: {
        text: 'toast.password.change',
      },
    });

  const handleSubmitProfile = (data: FieldValues) => {
    if (data) {
      updateProfile({
        user_id: user.id,
        body: {
          date_birthday: convertToISOString(data.date),
          email: data.email,
          name: data.name,
          phone: data.phone,
          sex: data.sex,
        },
      });
    }
  };

  const handleUpdatePassword = (data: FieldValues) => {
    if (data) {
      changePassword({
        username: user.id,
        password: data.oldPassword,
        newPassword: data.newPassword,
      });
    }
  };

  const handleCheckMale = () => {
    setCheckSex('male');
    setValue('sex', 'male');
  };

  const handleCheckFemale = () => {
    setCheckSex('female');
    setValue('sex', 'female');
  };

  useEffect(() => {
    if (user.id) {
      user?.name && setValue('name', user.name);
      user?.email && setValue('email', user.email);
      user?.phone && setValue('phone', user.phone);
      user?.sex && setCheckSex(user.sex);
    }

    if (user?.date_birthday) {
      const date = convertDateToReadable(user.date_birthday);
      setBirthDate(date.split(' ')[0]);
    }
  }, [
    setValue,
    user.date_birthday,
    user.email,
    user.id,
    user.name,
    user.phone,
    user.sex,
  ]);

  return (
    <div className={css.container}>
      <form onSubmit={onSubmit(handleSubmitProfile)}>
        <Input
          label={useText('input.label.mail')}
          placeholder={useText('input.placeholder.mail')}
          name="email"
          formState={formState}
        />
        <Input
          label={useText('input.phoneNumber')}
          placeholder={useText('input.phoneNumber')}
          name="phone"
          formState={formState}
          validate={validatePhone}
        />
        <Input
          label={useText('input.username')}
          placeholder={useText('input.username')}
          name="name"
          formState={formState}
          validate={validateDefaultRequired}
        />

        <InputDate
          label
          placeholder={useText('input.date.birthday')}
          autoComplete="off"
          outsideValue={birthDate}
          name="date"
          formState={formState}
          iconSrc={calendarIcon}
          render={({ classNames, onSelectDate, inputDate, ref }) => (
            <Calendar
              classNames={cn(classNames, css.calendar)}
              onSelectDate={onSelectDate}
              inputDate={inputDate}
              ref={ref}
              isDateBirth
            />
          )}
        />
        <CheckboxWrapper
          className={css.checkboxesData}
          label={useText('input.sex')}
        >
          <Checkbox
            label={useText('input.male')}
            side="right"
            check={checkSex === 'male'}
            onClick={handleCheckMale}
          />
          <Checkbox
            label={useText('input.female')}
            side="right"
            check={checkSex === 'female'}
            onClick={handleCheckFemale}
          />
        </CheckboxWrapper>
        <Button
          className={css.submit}
          color="green"
          label={useText('button.save')}
          type="submit"
          isLoading={isPendingUpdate}
        />
      </form>

      <form>
        <CheckboxWrapper
          className={css.checkboxesNotify}
          label={useText('input.label.notify')}
        >
          <Checkbox label={useText('input.phone')} side="right" disabled />
          <Checkbox label={useText('input.label.mail')} side="right" check />
        </CheckboxWrapper>
        <Button
          className={css.submit}
          color="green"
          label={useText('button.save')}
        />
      </form>

      <form onSubmit={passOnSubmit(handleUpdatePassword)}>
        <Input
          label={useText('input.label.oldPassword')}
          placeholder={useText('input.placeholder.oldPassword')}
          type="password"
          name="oldPassword"
          formState={passFormState}
          validate={validateDefaultRequired}
        />
        <Input
          label={useText('input.label.newPassword')}
          placeholder={useText('input.placeholder.newPassword')}
          type="password"
          name="newPassword"
          formState={passFormState}
          validate={validateDefaultRequired}
        />
        <Button
          className={css.submit}
          color="green"
          label={useText('button.change')}
          type="submit"
          isLoading={isPendingChange}
        />

        <InfoStep className={css.info} content={useText('info.password')} />
      </form>
    </div>
  );
};
