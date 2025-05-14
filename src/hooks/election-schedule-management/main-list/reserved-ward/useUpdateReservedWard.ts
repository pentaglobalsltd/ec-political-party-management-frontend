import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { reservedWardUpdate } from '@api/election-schedule-management/main-list/reserved-ward/reserved-ward';
import { ReservedWardCreateType } from '@type/election-declaration-management/main-list/reserved-ward/reserved-ward-types';

export const useUpdateReservedWard = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { t } = useTranslation();

  const updateReservedWard = async (
    id: string | number,
    data: ReservedWardCreateType,
  ) => {
    setLoading(true);
    try {
      const response = await reservedWardUpdate(id, data);
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
  return { updateReservedWard, loading, success };
};
