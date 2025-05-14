import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { fetchUpdateSymbol } from '@api/center-officer-management/controller-list/symbol/symbol';

export const useUpdateSymbol = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { t } = useTranslation();

  const updateSymbol = async (id: string | number, data: any) => {
    setLoading(true);
    setSuccess(false);
    try {
      const response = await fetchUpdateSymbol(id, data);
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
  return { updateSymbol, loading, success };
};
