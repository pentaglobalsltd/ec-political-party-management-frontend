import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { UpdateUnionWardType } from '@type/election-declaration-management/main-list/union-ward/union-ward-type';
import { updateUnionWards } from '@api/election-schedule-management/main-list/union-ward/updateUnionWard';

export const useUpdateUnionWard = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();

  const unionWardsUpdate = async (data: UpdateUnionWardType) => {
    setLoading(true);
    try {
      const response = await updateUnionWards(data);

      if (response?.data?.status === 200) {
        setLoading(false);
        setSuccess(true);
        toast.success(t('TOAST_MESSAGE.UPDATE_SUCCESS_MESSAGE'));
      } else {
        setLoading(false);
        toast.error(t('TOAST_MESSAGE.UPDATE_ERROR_MESSAGE'));
      }
    } catch (error) {
      toast.error(t('TOAST_MESSAGE.UPDATE_ERROR_MESSAGE'));
      setLoading(false);
    }
  };
  return { unionWardsUpdate, loading, success };
};
