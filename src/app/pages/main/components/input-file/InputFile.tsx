import cn from 'classnames';
import {
  ChangeEvent,
  Dispatch,
  DragEvent,
  FC,
  SetStateAction,
  SyntheticEvent,
  useEffect,
} from 'react';

import { Icon } from '@/app/components/ui-kit/icon/Icon';

import close from '@/assets/images/close-file.svg';

import css from './InputFile.module.scss';

type Props = {
  label: string;
  disabled?: boolean;
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export const InputFile: FC<Props> = ({
  label,
  disabled = false,
  files,
  setFiles,
}) => {
  const handleEnter = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer) {
      setFiles((prev) => [...prev, ...e.dataTransfer.files]);
    }
  };

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files) {
        const newFiles: File[] = Array.from(e.target.files);
        setFiles((prev) => [...prev, ...newFiles]);
      }
    }
  };

  const handleRemoveFileOnModal = (file: File, e?: SyntheticEvent<Element>) => {
    e?.stopPropagation();
    e?.preventDefault();
    setFiles((prev) => {
      return [
        ...prev.filter(
          (item) =>
            item.name !== file.name &&
            item.size !== file.size &&
            item.lastModified !== file.lastModified,
        ),
      ];
    });
  };

  useEffect(() => {
    const handleWindowDrop = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleWindowDragOver = (e: MouseEvent) => {
      e.preventDefault();
    };

    window.addEventListener('drop', handleWindowDrop);
    window.addEventListener('dragover', handleWindowDragOver);

    return () => {
      window.removeEventListener('drop', handleWindowDrop);
      window.removeEventListener('dragover', handleWindowDragOver);
    };
  }, []);

  return (
    <div className={css.container}>
      <label
        htmlFor="fileInput"
        className={css.input}
        onDragEnter={handleEnter}
        onDragOver={handleOver}
        onDragLeave={handleLeave}
        onDrop={handleDrop}
      >
        <input
          disabled={disabled}
          type="file"
          id="fileInput"
          multiple
          accept="*"
          onChange={handleChangeFile}
        />
        <p>{label}</p>
        <div className={cn(css.files, { [css.files_length]: !!files?.length })}>
          {files.map((file) => (
            <div key={file.lastModified} className={css.file}>
              <Icon
                key={file.lastModified}
                className={css.close}
                width={10}
                height={10}
                image={close}
                onClick={(e) => handleRemoveFileOnModal(file, e)}
              />
              <p>{file.name}</p>
            </div>
          ))}
        </div>
      </label>
    </div>
  );
};
