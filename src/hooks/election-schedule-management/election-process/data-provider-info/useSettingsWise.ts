import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { postSettingWise } from '@api/election-schedule-management/election-process/data-provider-info/postSettingWise';

interface useSettingWisesTypes {
  success: boolean;
  loading: boolean;
  getSettingWiseData: (settingId: string | number, endPoint: string) => void;
}

const useSettingsWises = (): useSettingWisesTypes => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { t } = useTranslation();

  const getSettingWiseData = async (
    settingId: string | number,
    endPoint: string,
  ) => {
    setLoading(true);
    setSuccess(false);
    try {
      const response = await postSettingWise({ settingId, endPoint });
      if (response?.data?.status === 200) {
        // setSettingWises(response?.data?.data)
        setLoading(false);
        setSuccess(true);
        toast.success(t('TOAST_MESSAGE.DATA_PUBLISHED_SUCCESS'));
      } else {
        setLoading(false);
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
    getSettingWiseData,
  };
};

export default useSettingsWises;
