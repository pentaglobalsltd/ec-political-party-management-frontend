import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { createNewConstituencyLocation } from '@api/election-schedule-management/main-list/constituency-location/constituency-locations';

export const useCreateConstituency = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { t } = useTranslation();

  const createConstituency = async (data: any) => {
    setLoading(true);
    try {
      const response = await createNewConstituencyLocation({
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
    } catch {
      toast.error(t('TOAST_MESSAGE.CREATE_ERROR_MESSAGE'));
      setLoading(false);
    }
  };
  return { createConstituency, loading, success };
};
