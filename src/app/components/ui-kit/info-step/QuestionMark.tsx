import { FC, SyntheticEvent } from 'react';

import css from './InfoStep.module.scss';

type Props = {
  onClick?: (event: SyntheticEvent) => void;
};

export const QuestionMark: FC<Props> = ({ onClick }) => {
  return (
    <div className={css.mark} onClick={onClick}>
      ?
    </div>
  );
};
