import { useEffect, useRef, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { Button } from '@/app/components/ui-kit/button/Button';
import { Input } from '@/app/components/ui-kit/input/Input';
import { Loader } from '@/app/components/ui-kit/loader/Loader';

import { OpenOrder } from '../components/open-order/OpenOrder';

import api from '@/app/api/api';
import { useBaseMutation } from '@/app/api/hooks/useBaseMutation';
import { useBaseQuery } from '@/app/api/hooks/useBaseQuery';

import { useUserStore } from '@/app/store/user';

import { useFormManagement } from '@/app/services/hooks/useFormManagement';
import { useText } from '@/app/services/hooks/useLocalization';
import { getOfertaRecievedOrder } from '@/app/services/utils/getTextOferta';
import { validateDefaultRequired } from '@/app/services/validators/validators';

import css from './ProfileReceivedOrders.module.scss';

export const ProfileReceivedOrders = () => {
  const btnLabel = useText('button.sign.receive');
  const [isOpenPermission, setIsOpenPermission] = useState(false);
  const [ofertaInfo, setOfertaInfo] = useState<{
    order: string;
    recipient: string;
    username: string;
    creator: string;
  } | null>(null);
  const timer = useRef<NodeJS.Timeout>();

  const { formState, onSubmit, getValues, reset, trigger } =
    useFormManagement();

  const username = useUserStore.use.name();

  const { data: openContainers, isPending } = useBaseQuery(
    api.containers.getContainersOpen,
    'get/containers/open',
  );

  const { mutate: openContainer, isPending: isPendingOpen } = useBaseMutation(
    api.containers.postContainersOpen,
    {
      invalidateQueryKey: 'get/containers/open',
    },
  );

  const { mutate: getInfoContainer, isPending: isPendingInfo } =
    useBaseMutation(api.containers.postContainersOfertaInfo);

  const handleSubmit = (data: FieldValues) => {
    if (data && ofertaInfo) {
      openContainer(
        {
          password: data.key,
          recipient_email: data.email,
          oferta_text: getOfertaRecievedOrder({
            recipient: ofertaInfo.recipient,
            username,
            order: ofertaInfo.order,
            creator: ofertaInfo.creator,
          }),
        },
        {
          onSuccess: () => {
            reset();
            setOfertaInfo(null);
            setIsOpenPermission(false);
          },
        },
      );
    }
  };

  const handleOfertaInfo = () => {
    const data = getValues();
    if (data.email && data.key) {
      getInfoContainer(
        {
          password: data.key,
          recipient_email: data.email,
        },
        {
          onSuccess: (data) => {
            if (data) {
              setOfertaInfo({
                order: data.data.order_title,
                recipient: data.data.recipient_user_name,
                username,
                creator: data.data.order_user_name,
              });
              setIsOpenPermission(true);
            }
          },
        },
      );
    } else {
      trigger();
      timer.current = setTimeout(() => {
        formState.clearErrors();
      }, 5 * 1000);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <div className={css.container}>
      <form onSubmit={onSubmit(handleSubmit)}>
        <Input
          label={useText('input.email')}
          placeholder={useText('input.placeholder.email')}
          name="email"
          formState={formState}
          validate={validateDefaultRequired}
        />
        <Input
          label={useText('input.label.key')}
          placeholder={useText('input.placeholder.key')}
          name="key"
          formState={formState}
          validate={validateDefaultRequired}
        />
        <Button
          className={css.submit}
          color="green"
          label={useText('button.request')}
          type="button"
          onClick={handleOfertaInfo}
          isLoading={isPendingInfo}
        />
        {isOpenPermission && (
          <>
            <div className={css.permission}>
              <p>
                <FormattedMessage id="oferta.text.first" />{' '}
                <span>
                  {ofertaInfo?.username ? (
                    ofertaInfo?.username
                  ) : (
                    <FormattedMessage id="oferta.init.username" />
                  )}
                </span>{' '}
                <FormattedMessage id="oferta.text.second" />{' '}
                <span>
                  "
                  {ofertaInfo?.order ? (
                    ofertaInfo.order
                  ) : (
                    <FormattedMessage id="oferta.init.order" />
                  )}
                  "
                </span>{' '}
                <FormattedMessage id="oferta.text.third" />{' '}
                <span>
                  {ofertaInfo?.recipient ? (
                    ofertaInfo.recipient
                  ) : (
                    <FormattedMessage id="oferta.init.recipient" />
                  )}
                </span>{' '}
                <FormattedMessage id="oferta.text.fourth" />{' '}
                <span>
                  {ofertaInfo?.creator ? (
                    ofertaInfo.creator
                  ) : (
                    <FormattedMessage id="oferta.init.creator" />
                  )}
                </span>
                .
              </p>
              <br />
              <FormattedMessage tagName="p" id="oferta.text.fifth" />
            </div>
            <Button
              className={css.sign}
              color="green"
              label={btnLabel}
              type="submit"
              isLoading={isPendingOpen}
            />
          </>
        )}
      </form>

      {isPending ? (
        <Loader />
      ) : (
        <div className={css.list}>
          {openContainers?.map((container, i) => (
            <OpenOrder key={container.id + i} order={container} />
          ))}
        </div>
      )}
    </div>
  );
};
