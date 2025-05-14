import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { updateReserveUnionWard } from '@api/election-schedule-management/main-list/union-reserved-seat/update-union-reserved-seat';
import { UpdateUnionReservedSeat } from '@type/election-declaration-management/main-list/union-reserved-seat/update-union-reserved-seat-types';

interface HookReturnType {
  loading: boolean;
  success: boolean;
  updateReserveUnionWards: (data: UpdateUnionReservedSeat) => void;
}

export const useUpdateUnionReserveSeat = (): HookReturnType => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const updateReserveUnionWards = async (data: UpdateUnionReservedSeat) => {
    setLoading(true);
    try {
      const response = await updateReserveUnionWard(data);

      if (response?.data?.status === 200) {
        setLoading(false);
        setSuccess(true);
        toast.success(t('TOAST_MESSAGE.UPDATE_SUCCESS_MESSAGE'));
      } else {
        setLoading(false);
        toast.error(t('TOAST_MESSAGE.UPDATE_ERROR_MESSAGE'));
      }
    } catch (error: any) {
      console.log(error);
      setLoading(false);

      const errorMsg =
        error?.response?.data?.message ||
        t('TOAST_MESSAGE.UPDATE_ERROR_MESSAGE');

      toast.error(errorMsg);
    }
  };

  return { updateReserveUnionWards, loading, success };
};

export default useUpdateUnionReserveSeat;
