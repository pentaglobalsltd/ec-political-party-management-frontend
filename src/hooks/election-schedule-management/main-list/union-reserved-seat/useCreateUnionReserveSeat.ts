import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { CreateUnionReservedSeat } from '@type/election-declaration-management/main-list/union-reserved-seat/create-union-reserved-seat-types';
import { createUnionReservedSeat } from '@api/election-schedule-management/main-list/union-reserved-seat/create-union-reserved-seat';

interface HookReturnType {
  createUnionReserveSeat: (data: CreateUnionReservedSeat) => void;
  loading: boolean;
  success: boolean;
}

export const useCreateUnionReserveSeat = (): HookReturnType => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const { t } = useTranslation();

  const createUnionReserveSeat = async (data: CreateUnionReservedSeat) => {
    setLoading(true);
    setSuccess(false);

    try {
      const response = await createUnionReservedSeat(data);

      if (response?.data?.status === 201) {
        setLoading(false);
        setSuccess(true);
        toast.success(t('TOAST_MESSAGE.CREATE_SUCCESS_MESSAGE'));
      } else {
        setLoading(false);
        setSuccess(false);
        toast.error(t('TOAST_MESSAGE.CREATE_ERROR_MESSAGE'));
      }
    } catch (error: any) {
      setLoading(false);
      setSuccess(false);

      const errorMsg =
        error?.response?.data?.message ||
        t('TOAST_MESSAGE.CREATE_ERROR_MESSAGE');

      toast.error(errorMsg);
    }
  };

  return {
    createUnionReserveSeat,
    loading,
    success,
  };
};

export default useCreateUnionReserveSeat;
