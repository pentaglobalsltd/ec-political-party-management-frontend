import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { fetchUpdateBuildingType } from '@api/election-schedule-management/main-list/building-type/building-type';

export const useUpdateBuildingType = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { t } = useTranslation();

  const updateBuildingType = async (id: string | number, data: any) => {
    try {
      setLoading(true);
      setSuccess(false);
      const response = await fetchUpdateBuildingType(id, data);
      if (response?.data?.status === 200) {
        setLoading(false);
        setSuccess(true);
        toast.success(t('TOAST_MESSAGE.UPDATE_SUCCESS_MESSAGE'));
      } else {
        setLoading(false);
        toast.error(t('TOAST_MESSAGE.UPDATE_ERROR_MESSAGE'));
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  return { updateBuildingType, loading, success };
};
