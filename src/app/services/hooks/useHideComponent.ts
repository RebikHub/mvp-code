import { RefObject, useEffect, useRef } from 'react';

export const useHideComponent = <
  T extends HTMLElement,
  R extends HTMLElement | undefined = undefined,
>(
  onClose?: (value: boolean) => void,
  refElement?: RefObject<R>,
): RefObject<T> => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const targetContains = (e: MouseEvent) => {
      const clickedElement = e.target as Node;
      if (
        !ref.current?.contains(clickedElement) &&
        !refElement?.current?.contains(clickedElement)
      ) {
        onClose?.(false);
      }
    };
    document.addEventListener('click', targetContains);

    return () => {
      document.removeEventListener('click', targetContains);
    };
  }, [onClose, refElement]);

  return ref;
};
