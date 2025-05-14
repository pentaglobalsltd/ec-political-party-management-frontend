import { useCallback, useEffect } from 'react';

interface Props {
  setIsActiveFullScreen: (x: boolean) => void;
}

const useEscKeyPress = ({ setIsActiveFullScreen }: Props) => {
  const handleUserKeyPress = useCallback((event: any) => {
    const { keyCode } = event;

    if (keyCode === 27) {
      setIsActiveFullScreen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ¯\_(ツ)_/¯
  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);
    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  }, [handleUserKeyPress]);
};

export default useEscKeyPress;
