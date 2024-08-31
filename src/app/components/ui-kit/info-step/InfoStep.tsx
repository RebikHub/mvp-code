import cn from 'classnames';
import { RefObject, forwardRef } from 'react';

import { QuestionMark } from './QuestionMark';

import css from './InfoStep.module.scss';

type Props = {
  content: string;
  mark?: boolean;
  className?: string;
};

export const InfoStep = forwardRef(
  ({ content, mark, className }: Props, ref) => {
    return (
      <div
        ref={ref as RefObject<HTMLDivElement>}
        className={cn(css.step_wrapper, className)}
      >
        {mark && <QuestionMark />}
        <div className={css.step}>
          <span>?</span>
          <p>{content}</p>
        </div>
      </div>
    );
  },
);
