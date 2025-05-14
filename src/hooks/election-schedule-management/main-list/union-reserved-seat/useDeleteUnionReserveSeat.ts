import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { deleteReserveUnionWard } from '@api/election-schedule-management/main-list/union-reserved-seat/delete-union-reserved-seat';

interface HookReturnType {
  loading: boolean;
  success: boolean;
  deleteReserveUnionWardById: (id: number) => void;
}

export const useDeleteUnionReserveSeat = (): HookReturnType => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const deleteReserveUnionWardById = async (id: number) => {
    try {
      setLoading(true);
      setSuccess(false);

      const response = await deleteReserveUnionWard(id);

      if (response?.data?.status === 204) {
        setSuccess(true);
        setLoading(false);
        toast.success(t('TOAST_MESSAGE.DELETE_SUCCESS_MESSAGE'));
      } else {
        setLoading(false);
        toast.error(t('TOAST_MESSAGE.DELETE_ERROR_MESSAGE'));
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };
  return {
    loading,
    success,
    deleteReserveUnionWardById,
  };
};

export default useDeleteUnionReserveSeat;
