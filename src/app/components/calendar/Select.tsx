import cn from 'classnames';
import { FC, RefObject, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { useHideComponent } from '@/app/services/hooks/useHideComponent';

import { ISelectDate } from './constants/constants';

import css from './Calendar.module.scss';

type Props = {
  data: ISelectDate[];
  value?: string;
  handleSelect?: (select: ISelectDate) => void;
};

export const Select: FC<Props> = ({ data, handleSelect, value }) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState<string | number>('');
  const refDiv = useHideComponent<HTMLDivElement>(setOpen);
  const intl = useIntl();

  const onSelectItem = (item: ISelectDate) => {
    handleSelect?.(item);
    if (item.abbreviation && typeof item.value === 'string') {
      const monthText = intl.formatMessage({ id: item.value });
      setInput(monthText);
    } else {
      setInput(item.value);
    }

    setOpen(false);
  };

  useEffect(() => {
    if (value) {
      setInput(value);
    }
  }, [value]);

  return (
    <div
      className={css.selectDate}
      ref={refDiv as RefObject<HTMLDivElement>}
      onClick={() => setOpen(!open)}
    >
      <p>{input}</p>
      <ul className={cn(css.options, { [css.options_none]: !open })}>
        {data.map((item) => (
          <li key={item.number} onClick={() => onSelectItem(item)}>
            {item.abbreviation ? (
              <FormattedMessage id={item.value as string} />
            ) : (
              item.value
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
