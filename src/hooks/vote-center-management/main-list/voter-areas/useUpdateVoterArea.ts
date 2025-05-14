import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { fetchUpdateVoterArea } from '@api/vote-center-management/main-list/voter-area/update-voter-area';
import { VoterAreaType } from '@type/vote-center-management/voter-area-type';

const useUpdateVoterAreaById = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();

  const updateVoterAreaById = async (
    id: string | number,
    data: VoterAreaType,
  ) => {
    try {
      const response = await fetchUpdateVoterArea(id, data);
      if (response?.data?.status !== 200) {
        setLoading(true);
        toast.error(t('TOAST_MESSAGE.UPDATE_ERROR_MESSAGE'));
      } else {
        setLoading(false);
        setSuccess(true);
        toast.success(t('TOAST_MESSAGE.UPDATE_SUCCESS_MESSAGE'));
      }
    } catch (error) {
      setLoading(false);
      toast.error(t('TOAST_MESSAGE.UPDATE_ERROR_MESSAGE'));
    }
  };

  return { updateVoterAreaById, loading, success };
};

export default useUpdateVoterAreaById;
