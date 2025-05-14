import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { CreateZillaType } from '@type/election-declaration-management/main-list/zilla/zilla-type';
import { createNewZilla } from '@api/election-schedule-management/main-list/district/district';

export const useCreateDistrict = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { t } = useTranslation();

  const createDistrict = async (data: CreateZillaType) => {
    setLoading(true);
    try {
      const response = await createNewZilla({
        data,
      });
      if (response?.data?.status === 201) {
        setLoading(false);
        setSuccess(true);
        toast.success(t('TOAST_MESSAGE.CREATE_SUCCESS_MESSAGE'));
      } else {
        toast.error(t('TOAST_MESSAGE.CREATE_ERROR_MESSAGE'));
        setLoading(false);
      }
    } catch {
      toast.error(t('TOAST_MESSAGE.CREATE_ERROR_MESSAGE'));
      setLoading(false);
    }
  };
  return { createDistrict, loading, success };
};
