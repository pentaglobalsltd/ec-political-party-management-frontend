import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { deleteUserProfileAPI } from '@api/user-management-service/delete-user-profile';

export const useDeleteUserProfile = () => {
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState<boolean>(false);
  const { t } = useTranslation();

  const deleteUserProfile = async (id: string | number) => {
    setIsDeleteLoading(true);
    try {
      const response = await deleteUserProfileAPI(id);
      if (response?.data?.status === 204) {
        toast.success(t('TOAST_MESSAGE.DELETE_SUCCESS_MESSAGE'));
        setIsDeleteSuccess(true);
        setIsDeleteLoading(false);
      } else {
        setIsDeleteLoading(false);
        toast.error(t('TOAST_MESSAGE.DELETE_ERROR_MESSAGE'));
      }
    } catch (e: any) {
      console.log(e);
      toast.error(e?.response?.data?.message);
    }
  };
  return {
    deleteUserProfile,
    isDeleteLoading,
    isDeleteSuccess,
    setIsDeleteSuccess,
  };
};
