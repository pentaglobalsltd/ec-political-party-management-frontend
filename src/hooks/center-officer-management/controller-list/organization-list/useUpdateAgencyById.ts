import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { updateAgencyById } from '@api/center-officer-management/controller-list/organization-list/update-agency-by-id';
import { CreateAgencyProps } from '@type/center-officer-management/organization-list';

interface Props {
  data: CreateAgencyProps;
  id: string | number;
}

const useUpdateAgencyById = () => {
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const { t } = useTranslation();

  const updateAgencyByIdData = async ({ id, data }: Props) => {
    setUpdateLoading(true);
    try {
      const response = await updateAgencyById({
        id,
        data,
      });
      if (response?.data?.status === 200) {
        setUpdateLoading(false);
        setUpdateSuccess(true);
        toast.success(t('TOAST_MESSAGE.UPDATE_SUCCESS_MESSAGE'));
      } else {
        setUpdateLoading(false);
        const {
          response: { data },
        } = response as any;
        toast.error(data.message);
      }
    } catch (error: any) {
      setUpdateLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return { updateAgencyByIdData, updateLoading, updateSuccess };
};

export default useUpdateAgencyById;
