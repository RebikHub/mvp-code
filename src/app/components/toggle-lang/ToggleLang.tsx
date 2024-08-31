import cn from 'classnames';
import { FC } from 'react';

import { useLocaleStore } from '@/app/store/localization';

import { Locale } from '@/app/types/enums';

import css from './ToggleLang.module.scss';

type Props = {
  className?: string;
};

export const ToggleLang: FC<Props> = ({ className }) => {
  const { toggleLang, locale } = useLocaleStore();

  return (
    <div
      className={cn(css.toggle, className)}
      onClick={() =>
        toggleLang(locale === Locale.eng ? Locale.rus : Locale.eng)
      }
    >
      <span className={cn({ [css.toggle_active]: locale === Locale.eng })}>
        En
      </span>
      /
      <span className={cn({ [css.toggle_active]: locale === Locale.rus })}>
        Ru
      </span>
    </div>
  );
};
