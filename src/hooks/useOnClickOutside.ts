import { useEffect, useRef, useState, RefObject } from 'react';

interface UseOnClickOutsideProps {
  isInitialValue: boolean;
}

interface UseOnClickOutsideReturn {
  ref: RefObject<HTMLElement>;
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useOnClickOutside = ({ isInitialValue }: UseOnClickOutsideProps): UseOnClickOutsideReturn => {
  const [isShow, setIsShow] = useState<boolean>(isInitialValue);
  const ref = useRef<HTMLElement>(null);

  const handleClickOutside = (event: MouseEvent): void => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []); 

  return { ref, isShow, setIsShow };
};