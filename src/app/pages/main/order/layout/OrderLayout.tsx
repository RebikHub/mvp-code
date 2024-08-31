import { useContext, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import { Icon } from '@/app/components/ui-kit/icon/Icon';
import { InfoStep } from '@/app/components/ui-kit/info-step/InfoStep';
import { QuestionMark } from '@/app/components/ui-kit/info-step/QuestionMark';
import { Steps } from '@/app/components/ui-kit/steps/Steps';

import { OrderRoutes } from '@/app/router/main/order/OrderRoutes';

import { useOrderStore } from '@/app/store/order';

import { useHideComponent } from '@/app/services/hooks/useHideComponent';
import { text } from '@/app/services/hooks/useLocalization';
import { useScreenWidth } from '@/app/services/hooks/useScreenWidth';
import { StepsContext } from '@/app/services/providers/StepsProvider';

import left from '@/assets/images/arrow-left.svg';

import { useStepsData } from '../hooks/useStepsData';

import css from './OrderLayout.module.scss';

export const OrderLayout = () => {
  const [infoCardHidden, setInfoCardHidden] = useState(false);
  const {
    image,
    step,
    prevUrl,
    nextUrl,
    info,
    title,
    isConfirm,
    isCreateOrder,
    stepStatus,
  } = useStepsData();

  const orderName = useOrderStore.use.name();
  const { isPhones } = useScreenWidth();
  const ref = useHideComponent(setInfoCardHidden);

  const value = useContext(StepsContext);

  const intl = useIntl();

  return (
    <div className={css.container}>
      <div className={css.content}>
        {isPhones && (
          <div className={css.header}>
            <div className={css.header_title}>
              <FormattedMessage
                tagName="h3"
                id={isCreateOrder ? 'title.order.create' : 'title.order.edit'}
              />
              {orderName && <h4>{orderName}</h4>}
            </div>

            <QuestionMark
              onClick={(e) => {
                e.stopPropagation();
                setInfoCardHidden((prev) => !prev);
              }}
            />
          </div>
        )}
        <div className={css.left}>
          {!isPhones && (
            <FormattedMessage
              tagName="h3"
              id={isCreateOrder ? 'title.order.create' : 'title.order.edit'}
            />
          )}
          {!isConfirm ? (
            <>
              <div className={css.finger}>
                <Icon className={css.icon} size={300} image={image || ''} />

                <Steps
                  step={step}
                  prevUrl={prevUrl}
                  nextUrl={stepStatus ? nextUrl : null}
                  handleSubmitNextStep={value?.handleNextStep}
                />
              </div>
              {info && (!isPhones || (isPhones && infoCardHidden)) && (
                <InfoStep
                  ref={isPhones ? ref : null}
                  className={css.info}
                  content={text(intl, info)}
                />
              )}
            </>
          ) : (
            <div className={css.finger}>
              <Icon className={css.icon} size={470} image={image || ''} />
              <Link to={prevUrl || ''}>
                <div className={css.back}>
                  <Icon image={left} />
                  <FormattedMessage tagName="p" id="button.back.page" />
                </div>
              </Link>
            </div>
          )}
        </div>

        <div className={css.right}>
          {!isPhones && orderName && <h3>{orderName}</h3>}

          <div className={css.title}>
            <FormattedMessage tagName="h3" id={title} />
          </div>

          <OrderRoutes />
        </div>
      </div>
    </div>
  );
};
