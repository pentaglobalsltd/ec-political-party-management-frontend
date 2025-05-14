import { useState } from 'react';
import { toast } from 'react-toastify';
import { fetchUpdateOfficer } from '@api/center-officer-management/controller-list/officer-list/officer-list';
import { useTranslation } from 'react-i18next';

export const useUpdateOfficer = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { t } = useTranslation();

  const updateOfficer = async (id: string | number, data: any) => {
    setLoading(true);
    try {
      const response = await fetchUpdateOfficer(id, data);
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
  return { updateOfficer, loading, success };
};
