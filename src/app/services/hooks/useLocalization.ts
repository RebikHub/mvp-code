import { IntlShape, useIntl } from 'react-intl';

export const useText = (
  key: string,
  values?: {
    name: string;
    value: string;
  },
) => {
  const intl = useIntl();

  if (values) {
    return intl.formatMessage(
      { id: key },
      { [values.name]: intl.formatMessage({ id: values.value }) },
    );
  }
  return intl.formatMessage({ id: key });
};

export const text = (intl: IntlShape, key: string) => {
  return intl.formatMessage({ id: key });
};
