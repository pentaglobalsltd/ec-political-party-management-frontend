import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { deleteAgencyAPI } from '@api/center-officer-management/controller-list/organization-list/delete-agency';

export const useDeleteAgencyById = () => {
  const [response, setResponse] = useState({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState<boolean>(false);
  const { t } = useTranslation();

  const deleteAgencyById = async (id: string | number) => {
    try {
      setIsLoading(true);
      const response = await deleteAgencyAPI(id);
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
    } catch (err) {
      setIsLoading(false);
      toast.error(t('TOAST_MESSAGE.DELETE_ERROR_MESSAGE'));
    }
  };
  return {
    deleteAgencyById,
    response,
    isLoading,
    isDeleteSuccess,
    setIsDeleteSuccess,
  };
};
