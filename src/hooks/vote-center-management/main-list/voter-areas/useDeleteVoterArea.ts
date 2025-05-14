import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { fetchDeleteVoterArea } from '@api/vote-center-management/main-list/voter-area/delete-voter-area';

export const useDeleteVoterArea = () => {
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState<boolean>(false);
  const { t } = useTranslation();

  const deleteVoterArea = async (id: string | number) => {
    try {
      setIsDeleteLoading(true);
      const response = await fetchDeleteVoterArea(id);
      if (response?.data?.status === 204) {
        setIsDeleteSuccess(true);
        setIsDeleteLoading(false);
        toast.success(t('TOAST_MESSAGE.DELETE_SUCCESS_MESSAGE'));
      } else {
        setIsDeleteLoading(false);
        toast.error(t('TOAST_MESSAGE.DELETE_ERROR_MESSAGE'));
      }
    } catch (error: any) {
      setIsDeleteLoading(false);
      toast.error(error.message);
    }
  };
  return {
    deleteVoterArea,
    isDeleteLoading,
    isDeleteSuccess,
    setIsDeleteSuccess,
  };
};
