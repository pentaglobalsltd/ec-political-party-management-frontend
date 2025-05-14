import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { createSymbol } from '@api/center-officer-management/controller-list/symbol/symbol';

export const useCreateSymbol = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { t } = useTranslation();

  const addSymbol = async (data: any) => {
    setLoading(true);
    setSuccess(false);
    try {
      const response = await createSymbol({
        data,
      });
      if (response?.data?.status === 201) {
        setLoading(false);
        setSuccess(true);
        toast.success(t('TOAST_MESSAGE.CREATE_SUCCESS_MESSAGE'));
      } else {
        setLoading(false);
        toast.error(t('TOAST_MESSAGE.CREATE_ERROR_MESSAGE'));
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  return { addSymbol, loading, success };
};
