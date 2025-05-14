import { useEffect, useState } from 'react';
import { Text } from '@pentabd/ui';
import { getDigitBanglaFromEnglish } from '@utils';
import classNames from 'classnames';

export const Countdown = ({
  refetch_time,
  isLoading,
  isActiveFullScreen = false,
}: {
  refetch_time: number;
  isLoading: boolean;
  isActiveFullScreen?: boolean;
}) => {
  const [time, setTime] = useState(refetch_time);

  useEffect(() => {
    if (time >= 0 && !isLoading) {
      setTime(refetch_time);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    let interval: any;
    if (time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [time]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${getDigitBanglaFromEnglish(
      minutes.toString().padStart(2, '0'),
    )}:${getDigitBanglaFromEnglish(
      remainingSeconds.toString().padStart(2, '0'),
    )}`;
  };
  return (
    <div className=" d-flex  align-items-center">
      <Text weight="medium" size="sm" sizeType="display" color="danger">
        {formatTime(time)}
      </Text>

      <span className={classNames({ 'text-white': isActiveFullScreen })}>
        &nbsp;&nbsp;মিনিট পর স্বয়ংক্রিয়ভাবে তথ্যগুলো পরিবর্তন হবে
      </span>
    </div>
  );
};
