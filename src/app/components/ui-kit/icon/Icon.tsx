import { FC, SyntheticEvent } from 'react';

import { sizeInRem } from '@/app/services/utils/sizeInRem';

import { SvgIcon } from '../svg/grades';

type Props = {
  isRem?: boolean;
  className?: string;
  image?: string;
  svg?: SvgIcon[];
  color?: string;
  width?: number;
  height?: number;
  size?: number;
  id?: string;
  fill?: string;
  onClick?: (event?: SyntheticEvent) => void;
};

export const Icon: FC<Props> = ({
  isRem = true,
  image,
  svg,
  color = '#6B6B6B',
  fill = 'none',
  width,
  height,
  size = 25,
  className,
  id,
  onClick,
}) => {
  return (
    <>
      {image && !svg?.length ? (
        <img
          className={className}
          id={id}
          src={image}
          style={{
            width: width ? sizeInRem(width, isRem) : sizeInRem(size, isRem),
            height: height ? sizeInRem(height, isRem) : sizeInRem(size, isRem),
            clipPath: 'fill-box',
          }}
          alt={'Image'}
          onClick={onClick}
        />
      ) : svg?.length ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id={id}
          style={{
            width: width ? sizeInRem(width, isRem) : sizeInRem(size, isRem),
            height: height ? sizeInRem(height, isRem) : sizeInRem(size, isRem),
          }}
          viewBox={`0 0 ${size} ${size}`}
          fill={fill}
          onClick={onClick}
        >
          {svg.map((item) => (
            <path
              key={item.path}
              d={item.path}
              strokeWidth={item.width || ''}
              stroke={color || item.color}
              strokeLinecap={item.linecap || 'inherit'}
            />
          ))}
        </svg>
      ) : null}
    </>
  );
};
