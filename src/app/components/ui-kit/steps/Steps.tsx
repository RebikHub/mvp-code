import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import css from './Steps.module.scss';

type Props = {
  step?: number;
  prevUrl?: string;
  nextUrl?: string | null;
  handleSubmitNextStep?: () => void;
};

export const Steps: FC<Props> = ({
  step,
  prevUrl,
  nextUrl,
  handleSubmitNextStep,
}) => {
  const navigate = useNavigate();

  const onNextStep = () => {
    if (nextUrl && handleSubmitNextStep) {
      handleSubmitNextStep();
    } else if (nextUrl && !handleSubmitNextStep) {
      navigate(nextUrl);
    }
  };

  return (
    <div className={css.steps}>
      <Link to={prevUrl || ''}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="26"
          viewBox="0 0 15 26"
          fill="none"
        >
          <path
            d="M11.124 1L3.0667 13.7352"
            stroke={step === 1 ? '#616161' : '#FFFFFF'}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M2.90332 13.8655L12.1235 25"
            stroke={step === 1 ? '#616161' : '#FFFFFF'}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </Link>

      <div className={css.body}>
        <span>0{step}</span>
        <span className={css.total}>/05</span>
      </div>
      <div
        onClick={onNextStep}
        className={!nextUrl ? css.disabled : css.nextStep}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="26"
          viewBox="0 0 16 26"
          fill="none"
        >
          <path
            d="M4.0293 1L12.0866 13.7352"
            stroke={nextUrl ? '#FFFFFF' : '#616161'}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M12.25 13.8655L3.02979 25"
            stroke={nextUrl ? '#FFFFFF' : '#616161'}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};
