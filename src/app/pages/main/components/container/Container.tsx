import cn from 'classnames';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { Modal } from '@/app/components/modal/Modal';
import { Icon } from '@/app/components/ui-kit/icon/Icon';
import { Input } from '@/app/components/ui-kit/input/Input';
import { Loader } from '@/app/components/ui-kit/loader/Loader';
import { TextArea } from '@/app/components/ui-kit/text-area/TextArea';

import { InputFile } from '../input-file/InputFile';
import { DropDownMenu } from './DropDownMenu';

import api from '@/app/api/api';
import { useBaseMutation } from '@/app/api/hooks/useBaseMutation';
import {
  deleteFromS3,
  downloadFromS3,
  uploadToS3,
} from '@/app/api/s3/s3Service';

import { useTooltipStore } from '@/app/store/tooltip';

import { useFormManagement } from '@/app/services/hooks/useFormManagement';
import { useText } from '@/app/services/hooks/useLocalization';
import { useScreenWidth } from '@/app/services/hooks/useScreenWidth';
import { downloadFile } from '@/app/services/utils/downloadFile';
import {
  validateDefaultRequired,
  validateText,
} from '@/app/services/validators/validators';
import { createZipArchive } from '@/app/services/zip/zip';

import checkGreen from '@/assets/images/container-check-green.svg';
import fileImage from '@/assets/images/container-file.svg';
import crypto from '@/assets/images/crypto.svg';
import dots from '@/assets/images/dots-edit.svg';
import download from '@/assets/images/file-download.svg';
import update from '@/assets/images/file-update.svg';

import css from './Container.module.scss';

type Props = {
  checked?: boolean;
  cases?: number;
  color?: 'gray' | 'green';
  content?: string;
  title: string;
  description: string;
  id: string;
  nameArchive?: string;
  files?: string;
  handleCheckContainer?: () => void;
};

export const Container: FC<Props> = ({
  checked = false,
  cases,
  color = 'gray',
  title,
  content,
  description,
  id,
  nameArchive,
  files,
  handleCheckContainer,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleDelete, setIsVisibleDelete] = useState({
    type: '',
    open: false,
  });
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [check, setCheck] = useState<'gray' | 'green'>(color);
  const [visibleMenu, setVisibleMenu] = useState(false);
  const { isPhones } = useScreenWidth();

  const { formState, setValue, onSubmit, reset } = useFormManagement();
  const inputFileLabel = useText('input.file.action');

  const setId = useTooltipStore.use.setId();

  const { mutate: deleteContainer, isPending: isPendingDelContainer } =
    useBaseMutation(api.containers.deleteContainersId, {
      invalidateQueryKey: 'get/containers',
      success: {
        text: 'toast.delete.container',
      },
    });
  const { mutate: deleteFile, isPending: isPendingDelFile } = useBaseMutation(
    deleteFromS3,
    {
      invalidateQueryKey: 'get/containers',
      success: {
        text: 'toast.delete.file',
      },
    },
  );
  const { mutate: editContainer, isPending: isPendingEdit } = useBaseMutation(
    api.containers.putContainersId,
    {
      invalidateQueryKey: 'get/containers',
      success: {
        text: 'toast.edit.container',
      },
    },
  );
  const { mutate: uploadFile, isPending: isPendingUpload } = useBaseMutation(
    uploadToS3,
    {
      invalidateQueryKey: 'get/containers',
      success: {
        text: 'toast.container.complete',
      },
    },
  );
  const { mutate: downloadFileFromS3, isPending: isPendingDownload } =
    useBaseMutation(downloadFromS3, {
      success: {
        text: 'toast.download.file',
      },
    });
  const { mutate: createArchive, isPending: isPendingArchive } =
    useBaseMutation(createZipArchive, {
      success: {
        text: 'toast.archive.create',
      },
    });

  const onDotsAction = (e?: SyntheticEvent) => {
    setId(id);
    !visibleMenu && e?.stopPropagation();
    setVisibleMenu((prev) => !prev);
  };

  const handleOpenModalEdit = () => {
    setValue('name', title);
    setValue('description', description);
    setValue('container', content);
    setIsVisible(true);
  };

  const handleModalClose = () => {
    reset();
    setIsVisible(false);
    setNewFiles([]);
  };

  const handleDownloadFile = async () => {
    if (files && nameArchive) {
      downloadFileFromS3(nameArchive, {
        onSuccess: (data) => {
          if (data) {
            downloadFile(data);
          }
        },
      });
    }
  };

  const handleModalAction = async (data: FieldValues) => {
    if (data && id && newFiles.length === 0) {
      editContainer(
        {
          container_id: id,
          body: {
            name: data.name,
            description: data.description,
            content: data.container,
          },
        },
        {
          onSuccess: () => {
            handleModalClose();
          },
        },
      );
    } else if (data && id && newFiles.length > 0 && nameArchive) {
      createArchive(newFiles, {
        onSuccess: (archive) => {
          uploadFile(
            {
              blobURL: archive,
              key: nameArchive,
            },
            {
              onSuccess: () =>
                editContainer(
                  {
                    container_id: id,
                    body: {
                      name: data.name,
                      description: data.description,
                      content: data.container,
                    },
                  },
                  {
                    onSuccess: () => {
                      handleModalClose();
                    },
                  },
                ),
            },
          );
        },
      });
    }
  };

  const handleModalDeleteAction = () => {
    if (id && isVisibleDelete.type === 'container') {
      deleteContainer(
        { container_id: id },
        {
          onSuccess: () => {
            setIsVisibleDelete({
              type: '',
              open: false,
            });
          },
        },
      );
    } else if (isVisibleDelete.type === 'file' && files && nameArchive) {
      deleteFile(nameArchive, {
        onSuccess: () => {
          setIsVisibleDelete({
            type: '',
            open: false,
          });
        },
      });
    }
  };

  useEffect(() => {
    if (checked) {
      setCheck('green');
    } else {
      setCheck('gray');
    }
  }, [checked]);

  return (
    <div
      className={cn(css.container, {
        [css.container_green]: check === 'green',
        [css.container_gray]: check === 'gray',
      })}
      onClick={handleCheckContainer}
    >
      <div className={css.header}>
        <p>{title}</p>
        <Icon
          isRem={!isPhones}
          className={css.icon}
          image={dots}
          width={15}
          height={15}
          onClick={onDotsAction}
        />
        {visibleMenu ? (
          <DropDownMenu
            id={id}
            files={files?.length}
            onClose={setVisibleMenu}
            onEdit={handleOpenModalEdit}
            onDelete={() =>
              setIsVisibleDelete({
                type: 'container',
                open: true,
              })
            }
            onDeleteFile={() =>
              setIsVisibleDelete({
                type: 'file',
                open: true,
              })
            }
            onDownloadFile={handleDownloadFile}
          />
        ) : null}
      </div>
      <div className={css.description}>
        <div>
          <div className={css.text}>
            <p className={css.text_header}>
              <FormattedMessage id="shared.description" />
            </p>
            <p className={css.text_content}>{description}</p>
          </div>
        </div>
        <div className={css.fileTxt}>
          <div className={css.wrapperCases}>
            {Boolean(cases) && (
              <div className={css.cases}>
                <FormattedMessage id="shared.orders" /> {cases}
              </div>
            )}
          </div>

          {content && <p className={css.txt}>TXT</p>}
          {files &&
            (isPendingDownload ? (
              <Loader size={30} />
            ) : (
              <Icon size={30} image={fileImage} />
            ))}
          <div className={css.checked}>
            {checked && <Icon image={checkGreen} width={15} height={15} />}
          </div>
        </div>
      </div>

      <Modal
        className={css.modal}
        isOpen={isVisible}
        btnLabel={useText('button.save')}
        title={useText('modal.title.edit.container')}
        onAction={onSubmit(handleModalAction)}
        onClose={handleModalClose}
        isLoading={isPendingEdit || isPendingUpload || isPendingArchive}
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
          {!files ? (
            <InputFile
              label={inputFileLabel}
              setFiles={setNewFiles}
              files={newFiles}
              disabled={!!files}
            />
          ) : (
            <div className={css.file}>
              <FormattedMessage tagName="p" id="modal.body.file" />
              <div className={css.fileActions} onClick={handleDownloadFile}>
                {isPendingDownload ? (
                  <Loader size={30} />
                ) : (
                  <>
                    <Icon size={25} image={download} />
                    {!isPhones && (
                      <FormattedMessage tagName="p" id="shared.download" />
                    )}
                  </>
                )}
              </div>
              <div
                className={css.fileActions}
                onClick={() =>
                  setIsVisibleDelete({
                    type: 'file',
                    open: true,
                  })
                }
              >
                <Icon size={25} image={update} />
                {!isPhones && (
                  <FormattedMessage tagName="p" id="shared.replace" />
                )}
              </div>
            </div>
          )}
        </div>
      </Modal>

      <Modal
        isOpen={isVisibleDelete.open}
        btnLabel={useText('button.confirm')}
        title={useText('shared.variable.delete', {
          name: 'n',
          value:
            isVisibleDelete.type === 'container'
              ? 'shared.container'
              : 'shared.file',
        })}
        onAction={handleModalDeleteAction}
        onClose={() => setIsVisibleDelete({ type: '', open: false })}
        isLoading={isPendingDelContainer || isPendingDelFile}
      >
        <FormattedMessage tagName="div" id="modal.delete" />
      </Modal>
    </div>
  );
};
