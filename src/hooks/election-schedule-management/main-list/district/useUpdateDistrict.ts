import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { fetchUpdateZilla } from '@api/election-schedule-management/main-list/district/district';

export const useUpdateDistrict = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { t } = useTranslation();

  const updateDistrict = async (id: string | number, data: any) => {
    setLoading(true);
    try {
      const response = await fetchUpdateZilla(id, data);
      if (response?.data?.status === 200) {
        setLoading(false);
        setSuccess(true);
        toast.success(t('TOAST_MESSAGE.UPDATE_SUCCESS_MESSAGE'));
      } else {
        setLoading(false);
        toast.error(t('TOAST_MESSAGE.UPDATE_ERROR_MESSAGE'));
      }
    } catch (error) {
      toast.error(t('TOAST_MESSAGE.UPDATE_ERROR_MESSAGE'));
      setLoading(false);
    }
  };
  return { updateDistrict, loading, success };
};
