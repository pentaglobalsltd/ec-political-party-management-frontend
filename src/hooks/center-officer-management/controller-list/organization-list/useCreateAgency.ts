import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { createAgencyApi } from '@api/center-officer-management/controller-list/organization-list/create-agency';
import { CreateAgencyProps } from '@type/center-officer-management/organization-list';

export const useCreateAgency = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { t } = useTranslation();

  const createAgencyData = async (data: CreateAgencyProps) => {
    setLoading(true);
    try {
      const response = await createAgencyApi(data);
      if (response?.data?.status === 201) {
        setLoading(false);
        setSuccess(true);
        toast.success(t('TOAST_MESSAGE.CREATE_SUCCESS_MESSAGE'));
      } else {
        const {
          response: { data },
        } = response as any;
        toast.error(data.message);
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };
  return {
    createAgencyData,
    loading,
    success,
  };
};
