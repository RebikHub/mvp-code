import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { FieldValues, UseFormGetValues } from 'react-hook-form';

type Props = {
  children: ReactNode;
};

type SubmitFunction = (data: FieldValues) => void;

type ContextValue = {
  handleNextStep: () => void | null;
  setHandle: (handleSubmit: SubmitFunction) => void;
  setData: (getValues: UseFormGetValues<FieldValues>) => void;
  clearContext: () => void;
};

export const StepsContext = createContext<ContextValue | undefined>(undefined);

export const StepsProvider: FC<Props> = ({ children }) => {
  const handler = useRef<SubmitFunction | null>(null);
  const data = useRef<UseFormGetValues<FieldValues> | null>(null);

  const clearContext = () => {
    data.current = null;
    handler.current = null;
  };

  const handleNextStep = useCallback(() => {
    const values = data.current?.();
    if (values) {
      handler.current?.(values);
      clearContext();
    }
  }, [data]);

  const setHandle = (handleSubmit: SubmitFunction) => {
    handler.current = handleSubmit;
  };

  const setData = (getValues: UseFormGetValues<FieldValues>) => {
    data.current = getValues;
  };

  const contextValue: ContextValue = useMemo(
    () => ({
      handleNextStep,
      setHandle,
      setData,
      clearContext,
    }),
    [handleNextStep],
  );

  return (
    <StepsContext.Provider value={contextValue}>
      {children}
    </StepsContext.Provider>
  );
};
