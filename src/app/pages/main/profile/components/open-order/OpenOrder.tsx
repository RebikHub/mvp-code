import cn from 'classnames';
import { FC } from 'react';
import { FormattedMessage } from 'react-intl';

import { Icon } from '@/app/components/ui-kit/icon/Icon';
import { Loader } from '@/app/components/ui-kit/loader/Loader';

import { useBaseMutation } from '@/app/api/hooks/useBaseMutation';
import { downloadFromS3 } from '@/app/api/s3/s3Service';
import { IOpenContainer } from '@/app/api/types';

import { convertDateToReadable } from '@/app/services/utils/converterDate';
import { downloadFile } from '@/app/services/utils/downloadFile';

import fileImage from '@/assets/images/container-file.svg';

import css from './OpenOrder.module.scss';

type Props = {
  order: IOpenContainer;
};

export const OpenOrder: FC<Props> = ({ order }) => {
  const { mutate, isPending } = useBaseMutation(downloadFromS3);

  const handleDownloadFile = () => {
    if (!order.container_files) {
      return;
    }
    mutate(`${order.user_id}/${order.id}.zip`, {
      onSuccess: (data) => {
        if (data) {
          downloadFile(data);
        }
      },
    });
  };

  return (
    <div className={css.container}>
      <h5 className={css.title}>{order.name}</h5>
      <div className={css.body}>
        <div className={css.info}>
          <div className={css.info_body}>
            <div>
              <FormattedMessage tagName="span" id="info.card.create" />
              <p>{convertDateToReadable(order.date_create)}</p>
            </div>
            <div>
              <FormattedMessage tagName="span" id="info.card.open" />
              <p>{convertDateToReadable(order.date_activate)}</p>
            </div>
            <div>
              <FormattedMessage tagName="span" id="info.card.description" />
              <p>{order.description}</p>
            </div>
            <div>
              <FormattedMessage tagName="span" id="info.card.content" />
              <p>{order.content}</p>
            </div>
          </div>
          {order.container_files && <Icon size={24} image={fileImage} />}
        </div>

        <div
          className={cn(css.order, {
            [css.order_file]: !!order.container_files,
          })}
          onClick={handleDownloadFile}
        >
          <div className={css.status}>
            {isPending ? (
              <Loader size={50} />
            ) : (
              <p
                className={cn(css.status, {
                  [css.status_file]: !!order.container_files,
                })}
              >
                {order.container_files ? (
                  <FormattedMessage id="order.file.download" />
                ) : (
                  <FormattedMessage id="order.file.not" />
                )}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
