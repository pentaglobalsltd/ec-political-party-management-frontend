import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { ReservedWardCreateType } from '@type/election-declaration-management/main-list/reserved-ward/reserved-ward-types';
import { postReservedWard } from '@api/election-schedule-management/main-list/reserved-ward/reserved-ward';

export const useCreateReservedWard = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const { t } = useTranslation();

  const createReservedWard = async (data: ReservedWardCreateType) => {
    setLoading(true);
    try {
      const response = await postReservedWard(data);
      if (response?.data?.status === 201) {
        setLoading(false);
        setSuccess(true);
        toast.success(t('TOAST_MESSAGE.CREATE_SUCCESS_MESSAGE'));
      } else {
        setLoading(false);
        toast.error(t('TOAST_MESSAGE.CREATE_ERROR_MESSAGE'));
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  return { createReservedWard, loading, success };
};
