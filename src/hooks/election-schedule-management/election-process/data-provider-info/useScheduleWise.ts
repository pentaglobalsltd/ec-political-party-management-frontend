import { useState } from 'react';
import { toast } from 'react-toastify';
import { postScheduleWise } from '../../../../api/election-schedule-management/election-process/data-provider-info/postScheduleWise';
import { useTranslation } from 'react-i18next';

interface useScheduleWisesTypes {
  success: boolean;
  loading: boolean;
  getScheduleWiseData: (
    scheduleId: string | number,
    endPoint: string,
    regionId: string | number,
  ) => void;
}

const useScheduleWises = (): useScheduleWisesTypes => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { t } = useTranslation();

  const getScheduleWiseData = async (
    scheduleId: string | number,
    endPoint: string,
    regionId: string | number,
  ) => {
    setLoading(true);
    setSuccess(false);
    try {
      const response = await postScheduleWise({
        scheduleId,
        endPoint,
        regionId,
      });
      if (response?.data?.status === 200) {
          setLoading(false);
          setSuccess(true);
          toast.success(t('TOAST_MESSAGE.DATA_PUBLISHED_SUCCESS'));
      } else {
        setLoading(false);
        setSuccess(false);
        toast.error(t('TOAST_MESSAGE.DATA_PUBLISHED_ERROR'));
      }
    } catch (error) {
      setLoading(false);
      setSuccess(false);
      toast.error(t('TOAST_MESSAGE.DATA_PUBLISHED_ERROR'));
    }
  };

  return {
    success,
    loading,
    getScheduleWiseData,
  };
};

export default useScheduleWises;
