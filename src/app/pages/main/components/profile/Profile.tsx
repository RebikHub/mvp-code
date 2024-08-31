import cn from 'classnames';
import { ChangeEvent, FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Icon } from '@/app/components/ui-kit/icon/Icon';
import { Loader } from '@/app/components/ui-kit/loader/Loader';

import { Feedback } from '../feedback/Feedback';

import api from '@/app/api/api';
import { useBaseMutation } from '@/app/api/hooks/useBaseMutation';

import {
  MainPath,
  OrderPath,
  ProfilePath,
  RootPath,
} from '@/app/router/enum/enum';

import { useUserStore } from '@/app/store/user';

import { useDisplayErrorToast } from '@/app/services/hooks/useDisplayErrorToast';
import { useScreenWidth } from '@/app/services/hooks/useScreenWidth';
import { isImageFile } from '@/app/services/utils/isImageFile';

import { MaxSize } from '@/app/types/enums';

import add from '@/assets/images/icon-add.svg';
import edit from '@/assets/images/icon-edit.svg';

import css from './Profile.module.scss';

type Props = {
  className?: string;
};

export const Profile: FC<Props> = ({ className }) => {
  const location = useLocation();
  const isEdit = location.pathname.includes('/main/profile');
  const { isPhones } = useScreenWidth();

  const avatarImage = useUserStore.use.avatar_image?.();
  const username = useUserStore.use.name();
  const userId = useUserStore.use.id();

  const { displayErrorToast } = useDisplayErrorToast();

  const { mutate, isPending } = useBaseMutation(api.users.postUsersAvatars, {
    invalidateQueryKey: `get/users/${userId}`,
  });

  const handleUpdateAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const { isImage, type } = isImageFile(file);
      if (isImage) {
        const isSizeImage = file.size <= MaxSize.image;
        if (isSizeImage && type) {
          mutate({
            file_content: file,
            user_id: userId,
            img_format: type,
          });
        } else {
          displayErrorToast('error.toast.image.size');
        }
      } else {
        displayErrorToast('error.toast.image.type');
      }
    } else {
      displayErrorToast('error.toast.image.selected');
    }
  };

  return (
    <div className={cn(css.profile, className)}>
      <Link to={`/${RootPath.main}/${MainPath.orderCreate}/${OrderPath.title}`}>
        <Icon
          isRem={!isPhones}
          className={cn(css.add, { [css.add_route]: isEdit })}
          size={51}
          image={add}
        />
      </Link>

      {!isEdit && (
        <Link
          to={`/${RootPath.main}/${MainPath.profile}/${isPhones ? '' : ProfilePath.account}`}
        >
          <Icon isRem={!isPhones} className={css.edit} size={51} image={edit} />
        </Link>
      )}

      <Feedback />
      {isEdit && (
        <>
          <label className={css.addAvatar} htmlFor="avatar">
            <input id="avatar" type="file" onChange={handleUpdateAvatar} />
          </label>
          {isPending && <Loader className={css.loader} />}
        </>
      )}
      <div className={css.avatar}>
        {avatarImage ? (
          <Icon
            className={css.avatar_image}
            width={280}
            height={280}
            image={avatarImage}
          />
        ) : (
          <h4>
            {username
              .split(' ')
              .map((word) => word[0])
              .join('')
              .toUpperCase()}
          </h4>
        )}
      </div>
    </div>
  );
};
