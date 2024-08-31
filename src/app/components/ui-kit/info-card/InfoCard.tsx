import cn from 'classnames';
import { FC } from 'react';
import { FormattedMessage } from 'react-intl';

import css from './InfoCard.module.scss';

type Props = {
  name: string;
  dateCreated?: string;
  recipients?: string | number;
  dateOpen?: string;
  className?: string;
};

export const InfoCard: FC<Props> = ({
  name,
  dateCreated,
  recipients,
  dateOpen,
  className,
}) => {
  return (
    <div className={cn(css.info, className)}>
      <div>
        <FormattedMessage tagName="span" id="info.card.name" />
        <p>{name}</p>
      </div>
      <div>
        <FormattedMessage tagName="span" id="info.card.create" />
        <p>
          {dateCreated ? dateCreated : <FormattedMessage id="shared.unknown" />}
        </p>
      </div>
      {recipients && (
        <div>
          <FormattedMessage tagName="span" id="info.card.recipients" />
          <p>{recipients}</p>
        </div>
      )}
      {dateOpen && (
        <div>
          <FormattedMessage tagName="span" id="info.card.open" />
          <p>
            {dateOpen ? dateOpen : <FormattedMessage id="shared.unknown" />}
          </p>
        </div>
      )}
    </div>
  );
};
