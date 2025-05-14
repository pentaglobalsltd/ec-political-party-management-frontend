import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { getScheduleWiseCount } from '../../../../api/election-schedule-management/election-process/data-provider-info/getScheduleWiseCount';

interface useScheduleWisesCountTypes {
  success: boolean;
  loading: boolean;
  count: number;
  getScheduleWiseCountData: (
    scheduleId: string | number,
    endPoint: string,
    regionId: string | number,
  ) => void;
}

const useScheduleWisesCount = (): useScheduleWisesCountTypes => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const { t } = useTranslation();

  const getScheduleWiseCountData = async (
    scheduleId: string | number,
    endPoint: string,
    regionId: string | number,
  ) => {
    setLoading(true);
    setSuccess(false);
    try {
      const response = await getScheduleWiseCount({
        scheduleId,
        endPoint,
        regionId,
      });
      if (response?.data?.status === 200) {
        const { count } = response?.data?.data;
        if (count) {
          setLoading(false);
          setSuccess(true);
          setCount(count);
        }
      } else {
        setLoading(false);
        setSuccess(false);
        setCount(0);
      }
    } catch (error) {
      setLoading(false);
      setSuccess(false);
      setCount(0);
      toast.error(t('TOAST_MESSAGE.DATA_PUBLISHED_ERROR'));
    }
  };

  return {
    success,
    loading,
    count,
    getScheduleWiseCountData,
  };
};

export default useScheduleWisesCount;
