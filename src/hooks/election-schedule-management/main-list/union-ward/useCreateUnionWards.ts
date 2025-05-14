import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { CreateUnionWardType } from '@type/election-declaration-management/main-list/union-ward/union-ward-type';
import { createUnionWards } from '@api/election-schedule-management/main-list/union-ward/createUnionWards';

export const useCreateUnionWard = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();

  const unionWardsCreate = async (data: CreateUnionWardType) => {
    setLoading(true);
    try {
      const response = await createUnionWards(data);

      if (response?.data?.status === 201) {
        setLoading(false);
        setSuccess(true);
        toast.success(t('TOAST_MESSAGE.CREATE_SUCCESS_MESSAGE'));
      } else {
        setLoading(false);
        toast.error(t('TOAST_MESSAGE.CREATE_ERROR_MESSAGE'));
      }
    } catch (error) {
      toast.error(t('TOAST_MESSAGE.CREATE_ERROR_MESSAGE'));
      setLoading(false);
    }
  };
  return { unionWardsCreate, loading, success };
};
