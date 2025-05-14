import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { deleteUnionWard } from '@api/election-schedule-management/main-list/union-ward/deleteUnionWard';

export const useDeleteUnionWardById = () => {
  const [response, setResponse] = useState({});
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState<boolean>(false);
  const { t } = useTranslation();

  const deleteUnionWardById = async (id: string | number) => {
    try {
      setIsDeleteLoading(true);
      setIsDeleteSuccess(false);
      const response = await deleteUnionWard(id);
      if (response?.data?.status === 204 && response?.data) {
        const data = response?.data.data;
        setResponse(data);
        setIsDeleteSuccess(true);
        setIsDeleteLoading(false);
        toast.success(t('TOAST_MESSAGE.DELETE_SUCCESS_MESSAGE'));
      } else {
        setIsDeleteLoading(false);
        toast.error(t('TOAST_MESSAGE.DELETE_ERROR_MESSAGE'));
      }
    } catch (error: any) {
      setIsDeleteLoading(false);
      toast.error(error.response.data.message);
    }
  };
  return {
    deleteUnionWardById,
    response,
    isDeleteLoading,
    isDeleteSuccess,
    setIsDeleteSuccess,
  };
};
