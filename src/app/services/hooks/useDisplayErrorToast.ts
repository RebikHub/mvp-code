import { useToastStore } from '@/app/store/toast';

export const useDisplayErrorToast = () => {
  const toast = useToastStore();

  const displayErrorToast = (text: string) => {
    toast.clearToast();
    toast.setToast({
      isOpen: true,
      text,
      status: 'error',
    });
  };

  return {
    displayErrorToast,
  };
};
