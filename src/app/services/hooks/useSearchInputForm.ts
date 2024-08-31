import { useCallback, useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';

import { TUseFormState } from '@/app/types/types';

import { useKeyDown } from './useKeyDown';

export const useSearchInputForm = (formState: TUseFormState, name: string) => {
  const [searchValue, setSearchValue] = useState('');

  const searchInput = useWatch({ name, control: formState.control });

  const handleSearch = useCallback(() => {
    const value = searchInput || '';
    setSearchValue(value.trim().toLocaleLowerCase());
  }, [searchInput]);

  const reset = () => {
    setSearchValue('');
    formState.reset();
    formState.setValue(name, '');
  };

  useKeyDown(() => {
    handleSearch();
  }, ['Enter']);

  useEffect(() => {
    const debounce = setTimeout(handleSearch, 1000);

    return () => {
      clearTimeout(debounce);
    };
  }, [handleSearch]);

  return {
    searchValue,
    searchInput,
    handleSearch,
    reset,
  };
};
