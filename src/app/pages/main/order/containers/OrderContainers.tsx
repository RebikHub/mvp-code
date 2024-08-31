import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { Modal } from '@/app/components/modal/Modal';
import { Button } from '@/app/components/ui-kit/button/Button';
import { Icon } from '@/app/components/ui-kit/icon/Icon';
import { Input } from '@/app/components/ui-kit/input/Input';
import { Loader } from '@/app/components/ui-kit/loader/Loader';
import { useNextStep } from '@/app/components/ui-kit/steps/hooks/useNextStep';
import { TextArea } from '@/app/components/ui-kit/text-area/TextArea';

import { Container } from '../../components/container/Container';
import { InputFile } from '../../components/input-file/InputFile';
import { ButtonsGroup } from '../components/buttons-group/ButtonsGroup';

import api from '@/app/api/api';
import { useBaseMutation } from '@/app/api/hooks/useBaseMutation';
import { useBaseQuery } from '@/app/api/hooks/useBaseQuery';
import { uploadToS3 } from '@/app/api/s3/s3Service';

import { useOrderStore } from '@/app/store/order';

import { useDisplayErrorToast } from '@/app/services/hooks/useDisplayErrorToast';
import { useFormManagement } from '@/app/services/hooks/useFormManagement';
import { useText } from '@/app/services/hooks/useLocalization';
import { countOrdersInContainer } from '@/app/services/utils/countOrdersInContainer';
import {
  validateDefaultRequired,
  validateText,
} from '@/app/services/validators/validators';
import { createZipArchive } from '@/app/services/zip/zip';

import crypto from '@/assets/images/crypto.svg';

import { useStepsData } from '../hooks/useStepsData';

import css from './OrderContainer.module.scss';

export const OrderContainers = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const navigate = useNavigate();
  const { nextUrl, stepStatus } = useStepsData();
  const { formState, onSubmit, reset, getValues } = useFormManagement();
  const { displayErrorToast } = useDisplayErrorToast();

  const containerId = useOrderStore.use.container_id();
  const setOrderContainerId = useOrderStore.use.setOrderContainerId();

  const { data: orders } = useBaseQuery(api.orders.getOrders, 'get/orders');
  const { data: containers, isPending } = useBaseQuery(
    api.containers.getContainers,
    'get/containers',
  );
  const { mutate: createContainer, isPending: isPendingCreate } =
    useBaseMutation(api.containers.postContainers, {
      invalidateQueryKey: !files.length ? 'get/containers' : '',
      success: {
        text: 'toast.container.create',
      },
    });
  const { mutate: uploadFile, isPending: isPendingUpload } = useBaseMutation(
    uploadToS3,
    {
      invalidateQueryKey: 'get/containers',
      success: {
        text: 'toast.container.complete',
      },
    },
  );
  const { mutate: createArchive, isPending: isPendingArchive } =
    useBaseMutation(createZipArchive, {
      success: {
        text: 'toast.archive.create',
      },
    });

  const handleAddContainer = () => {
    setIsVisible(true);
  };

  const handleModalClose = () => {
    reset();
    setIsVisible(false);
    setFiles([]);
  };

  const handleModalAction = (data: FieldValues) => {
    if (data) {
      createContainer(
        {
          name: data.name,
          description: data.description,
          content: data.container,
        },
        {
          onSuccess: (data) => {
            if (files.length > 0 && data) {
              createArchive(files, {
                onSuccess: (archive) => {
                  uploadFile(
                    {
                      blobURL: archive,
                      key: `${data.data.user_id}/${data.data.id}.zip`,
                    },
                    {
                      onSuccess: () => {
                        handleModalClose();
                      },
                    },
                  );
                },
              });
            } else {
              handleModalClose();
            }
          },
        },
      );
    }
  };

  const handleNextStep = () => {
    if (!containerId) {
      displayErrorToast('error.toast.container');
    } else {
      nextUrl && navigate(nextUrl);
    }
  };

  useNextStep({
    status: !!containerId,
    values: getValues,
    handler: handleNextStep,
  });

  return (
    <div className={css.container}>
      <Button
        className={css.button}
        color="green"
        label={useText('button.add.container')}
        onClick={handleAddContainer}
      />
      {isPending ? (
        <Loader />
      ) : containers?.items.length ? (
        containers?.items.map((container) => (
          <Container
            key={container.id}
            id={container.id}
            cases={countOrdersInContainer({
              containers: containers?.items,
              orders: orders?.items,
              id: container.id,
            })}
            title={container.name}
            description={container.description}
            content={container.content}
            files={container.container_files}
            nameArchive={`${container.user_id}/${container.id}.zip`}
            checked={containerId === container.id}
            handleCheckContainer={() => setOrderContainerId(container.id)}
          />
        ))
      ) : (
        <div className={css.empty}>
          <FormattedMessage id="page.profile.containers" />
        </div>
      )}

      <ButtonsGroup
        type="button"
        disabled={!stepStatus}
        onNextStep={handleNextStep}
      />

      <Modal
        className={css.modal}
        isOpen={isVisible}
        btnLabel={useText('button.add.container')}
        title={useText('button.add.container')}
        onAction={onSubmit(handleModalAction)}
        onClose={handleModalClose}
        isLoading={isPendingCreate || isPendingUpload || isPendingArchive}
      >
        <div className={css.inputs}>
          <Input
            label={useText('input.container')}
            placeholder={useText('input.container')}
            name="name"
            formState={formState}
            validate={validateDefaultRequired}
          />
          <TextArea
            label={useText('input.crypto.info')}
            placeholder={useText('input.crypto.info')}
            name="description"
            formState={formState}
            validate={validateDefaultRequired}
          />
        </div>
        <div className={css.crypto}>
          <div className={css.crypto_title}>
            <FormattedMessage tagName="p" id="modal.body.crypto" />
            <Icon width={50} height={40} image={crypto} />
          </div>
          <TextArea
            label={useText('shared.container')}
            placeholder={useText('shared.container')}
            name="container"
            formState={formState}
            validate={validateText}
          />
          <InputFile
            label={useText('input.file.action')}
            files={files}
            setFiles={setFiles}
          />
        </div>
      </Modal>
    </div>
  );
};
