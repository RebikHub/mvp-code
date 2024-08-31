import {
  Control,
  FieldValues,
  FormState,
  UseFormClearErrors,
  UseFormGetFieldState,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormResetField,
  UseFormSetError,
  UseFormSetFocus,
  UseFormSetValue,
  UseFormTrigger,
  UseFormUnregister,
  UseFormWatch,
} from 'react-hook-form';

import { Locale } from './enums';

export type TRecipient = {
  name: string;
  phone: string;
  email: string;
  id?: string;
  checked?: boolean;
};

export type TContainer = {
  id: number;
  cases: number;
  title: string;
  description: string;
  files?: any | Array<File>;
};

export type TUseFormState = {
  watch: UseFormWatch<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  getFieldState: UseFormGetFieldState<FieldValues>;
  setError: UseFormSetError<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  trigger: UseFormTrigger<FieldValues>;
  formState: FormState<FieldValues>;
  resetField: UseFormResetField<FieldValues>;
  reset: UseFormReset<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues, any>;
  unregister: UseFormUnregister<FieldValues>;
  control: Control<FieldValues, any>;
  register: UseFormRegister<FieldValues>;
  setFocus: UseFormSetFocus<FieldValues>;
};

export type TOrderStatus = 'исполненные' | 'активные' | 'неактивные';

export type TLanguagesJson = {
  [key: string]: any;
};

export type TLanguages = {
  [key: string]: TLanguagesJson;
};

export type TLocale = Locale.rus | Locale.eng;

export type UserChoice = Promise<{
  outcome: 'accepted' | 'dismissed';
  platform: string;
}>;

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: UserChoice;
  prompt(): Promise<UserChoice>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}
