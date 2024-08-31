import { useForm } from 'react-hook-form';

export const useFormManagement = () => {
  const formState = {
    ...useForm({
      reValidateMode: 'onSubmit',
    }),
  };

  const {
    watch,
    getValues,
    setValue,
    handleSubmit,
    reset,
    trigger,
    formState: formStateData,
  } = formState;
  const { isValid } = formStateData;

  return {
    formState,
    onSubmit: handleSubmit,
    watch,
    getValues,
    setValue,
    reset,
    trigger,
    isValid,
  };
};
