import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { deleteElectionSettingsAPI } from '@api/election-schedule-management/election/election-settings/election-settings';

export const useDeleteElectionSettings = () => {
  const [response, setResponse] = useState({});
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState<boolean>(false);
  const { t } = useTranslation();

  const deleteElectionSettings = async (id: string | number) => {
    try {
      setIsDeleteLoading(true);
      const response = await deleteElectionSettingsAPI(id);
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
      toast.error(error.message);
    }
  };
  return {
    deleteElectionSettings,
    response,
    isDeleteLoading,
    isDeleteSuccess,
  };
};
