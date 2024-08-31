import cn from 'classnames';
import { FC } from 'react';
import { FormattedMessage } from 'react-intl';

import { Button } from '@/app/components/ui-kit/button/Button';
import { Icon } from '@/app/components/ui-kit/icon/Icon';

import { useText } from '@/app/services/hooks/useLocalization';
import { useScreenWidth } from '@/app/services/hooks/useScreenWidth';

import fingerBlack from '@/assets/images/finger-black-tariff.svg';
import fingerGreen from '@/assets/images/finger-green-tariff.svg';

import css from './TariffCard.module.scss';

type Props = {
  title: string;
  price: number;
  color?: 'green' | 'black';
  className?: string;
};

export const TariffCard: FC<Props> = ({
  title,
  price,
  color = 'black',
  className,
}) => {
  const { isPhones } = useScreenWidth();
  return (
    <div
      className={cn(
        css.container,
        {
          [css.container_green]: color === 'green',
        },
        className,
      )}
    >
      <h3>{title}</h3>
      <div className={css.price}>
        <span>{price}</span>
        <p className={css.price_desc}>
          <FormattedMessage id="tariff.description" />
        </p>
        <p className={css.price_day}>
          <FormattedMessage id="tariff.trial" />
        </p>
      </div>
      <div className={css.list}>
        <div>
          <Icon
            isRem={!isPhones}
            size={27}
            image={color === 'green' ? fingerBlack : fingerGreen}
          />
          <FormattedMessage tagName="p" id="tariff.item" />
        </div>
        <div>
          <Icon
            isRem={!isPhones}
            size={27}
            image={color === 'green' ? fingerBlack : fingerGreen}
          />
          <FormattedMessage tagName="p" id="tariff.item" />
        </div>
        <div>
          <Icon
            isRem={!isPhones}
            size={27}
            image={color === 'green' ? fingerBlack : fingerGreen}
          />
          <FormattedMessage tagName="p" id="tariff.item" />
        </div>
        <div>
          <Icon
            isRem={!isPhones}
            size={27}
            image={color === 'green' ? fingerBlack : fingerGreen}
          />
          <FormattedMessage tagName="p" id="tariff.item" />
        </div>
      </div>
      <Button
        label={useText('button.details')}
        color={color === 'green' ? 'black' : 'green'}
      />
    </div>
  );
};
