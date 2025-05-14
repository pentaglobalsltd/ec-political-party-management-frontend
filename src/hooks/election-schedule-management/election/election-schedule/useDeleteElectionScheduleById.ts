import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { deleteElectionScheduleAPI } from '@api/election-schedule-management/election/election-schedule/delete-election-schedule';

export const useDeleteElectionScheduleById = () => {
  const [response, setResponse] = useState({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState<boolean>(false);
  const { t } = useTranslation();

  const deleteElectionScheduleById = async (id: string | number) => {
    setIsLoading(true);
    try {
      const response = await deleteElectionScheduleAPI(id);
      if (response?.data?.status === 204 && response?.data) {
        const data = response?.data.data;
        setResponse(data);
        setIsDeleteSuccess(true);
        setIsLoading(false);
        toast.success(t('TOAST_MESSAGE.DELETE_SUCCESS_MESSAGE'));
      } else {
        setIsLoading(false);
        toast.error(t('TOAST_MESSAGE.CREATE_ERROR_MESSAGE'));
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(t('TOAST_MESSAGE.CREATE_ERROR_MESSAGE'));
    }
  };
  return {
    deleteElectionScheduleById,
    response,
    isLoading,
    isDeleteSuccess,
    setIsDeleteSuccess,
  };
};
