import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { deletePollingPersonnelAllocateApi } from '@api/center-officer-management/controller-list/polling-center/delete-polling-personnel-allocate';

export const useDeletePollingPersonnelAllocateById = () => {
  const [response, setResponse] = useState({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState<boolean>(false);
  const { t } = useTranslation();

  const deletePollingPersonnelAllocateById = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await deletePollingPersonnelAllocateApi(id);
      if (response?.data?.status === 204 && response?.data) {
        const data = response?.data.data;
        setResponse(data);
        setIsDeleteSuccess(true);
        setIsLoading(false);
        toast.success(t('TOAST_MESSAGE.DELETE_SUCCESS_MESSAGE'));
      } else {
        setIsLoading(false);
        toast.error(t('TOAST_MESSAGE.DELETE_ERROR_MESSAGE'));
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(t('TOAST_MESSAGE.DELETE_ERROR_MESSAGE'));
    }
  };
  return {
    deletePollingPersonnelAllocateById,
    response,
    isLoading,
    isDeleteSuccess,
    setIsDeleteSuccess,
  };
};
