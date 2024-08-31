import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

import { Icon } from '@/app/components/ui-kit/icon/Icon';

import { useTooltipStore } from '@/app/store/tooltip';

import { useHideComponent } from '@/app/services/hooks/useHideComponent';

import removeFile from '@/assets/images/drop-menu-delete-file.svg';
import remove from '@/assets/images/drop-menu-delete.svg';
import download from '@/assets/images/drop-menu-download.svg';
import edit from '@/assets/images/drop-menu-edit.svg';

import css from './Container.module.scss';

type Props = {
  id?: string;
  files?: number;
  onClose: Dispatch<SetStateAction<boolean>>;
  onEdit?: () => void;
  onDelete?: () => void;
  onDeleteFile?: () => void;
  onDownloadFile?: () => void;
};

export const DropDownMenu: FC<Props> = ({
  id,
  files,
  onClose,
  onEdit,
  onDelete,
  onDownloadFile,
  onDeleteFile,
}) => {
  const ref = useHideComponent<HTMLDivElement>(onClose);
  const containerId = useTooltipStore.use.id();

  const onAction = (action?: () => void) => {
    action?.();
    onClose(false);
  };

  useEffect(() => {
    if (id !== containerId) {
      onClose(false);
    }
  }, [containerId, id, onClose]);

  return (
    <div
      className={css.dropdown}
      ref={ref}
      onClick={(e) => e.stopPropagation()}
    >
      <div onClick={() => onAction(onEdit)}>
        <Icon size={20} image={edit} />
        <FormattedMessage tagName="p" id="button.edit" />
      </div>
      <div onClick={() => onAction(onDelete)}>
        <Icon size={20} image={remove} />
        <FormattedMessage tagName="p" id="button.delete" />
      </div>
      {Boolean(files) && (
        <>
          <div onClick={() => onAction(onDownloadFile)}>
            <Icon size={20} image={download} />
            <FormattedMessage tagName="p" id="button.download.file" />
          </div>
          <div onClick={() => onAction(onDeleteFile)}>
            <Icon size={20} image={removeFile} />
            <FormattedMessage tagName="p" id="button.delete.file" />
          </div>
        </>
      )}
    </div>
  );
};
