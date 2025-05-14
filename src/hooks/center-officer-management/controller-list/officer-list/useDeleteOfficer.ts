import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { deleteOfficerAPI } from '@api/center-officer-management/controller-list/officer-list/delete-officer';

export const useDeleteOfficerById = () => {
  const [response, setResponse] = useState({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState<boolean>(false);
  const { t } = useTranslation();

  const deleteOfficerById = async (id: string | number) => {
    try {
      setIsLoading(true);
      const response = await deleteOfficerAPI(id);
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
      toast.error(error.response.data.message);
    }
  };
  return {
    deleteOfficerById,
    response,
    isLoading,
    isDeleteSuccess,
    setIsDeleteSuccess,
  };
};
