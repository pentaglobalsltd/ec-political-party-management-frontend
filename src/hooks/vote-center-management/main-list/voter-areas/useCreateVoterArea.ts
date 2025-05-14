import { useState } from 'react';
import { toast } from 'react-toastify';
import { VoterAreaType } from '@type/vote-center-management/voter-area-type';
import { fetchCreateVoterArea } from '@api/vote-center-management/main-list/voter-area/create-voter-area';
import { useTranslation } from 'react-i18next';

export const useCreateVoterArea = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();

  const voterAreaCreate = async (data: VoterAreaType) => {
    try {
      setLoading(true);
      const response = await fetchCreateVoterArea(data);
      if (response?.data?.status === 201) {
        setLoading(false);
        setSuccess(true);
        toast.success(t('TOAST_MESSAGE.CREATE_SUCCESS_MESSAGE'));
      } else {
        setLoading(false);
        toast.error(t('TOAST_MESSAGE.CREATE_ERROR_MESSAGE'));
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };
  return { voterAreaCreate, loading, success };
};
