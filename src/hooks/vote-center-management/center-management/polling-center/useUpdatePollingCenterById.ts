import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { updatePollingCenterByIdApi } from '@api/vote-center-management/center-management/polling-center-list/update-polling-center-by-id';
import { PollingCenterReqBodyType } from '@type/vote-center-management/create-polling-center-types';

export interface UpdatePollingCenterByIdApi {
  id: string | number;
  data: PollingCenterReqBodyType;
}

export type typeUpdateUpdatePollingCentersByIdData = (
  obj: UpdatePollingCenterByIdApi,
) => void;

interface HookReturnType {
  updateUpdatePollingCentersByIdData: typeUpdateUpdatePollingCentersByIdData;
  loading: boolean;
  success: boolean;
}

const useUpdatePollingCentersById = (): HookReturnType => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();

  const updateUpdatePollingCentersByIdData = async ({
    id,
    data,
  }: UpdatePollingCenterByIdApi) => {
    try {
      setLoading(true);
      setSuccess(false);

      const response = await updatePollingCenterByIdApi({
        id,
        data,
      });

      if (response?.data?.status !== 200) {
        setLoading(false);
      } else {
        setLoading(false);
        setSuccess(true);
        toast.success(t('TOAST_MESSAGE.UPDATE_SUCCESS_MESSAGE'));
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.response?.data.message);
    }
  };

  return { updateUpdatePollingCentersByIdData, loading, success };
};

export default useUpdatePollingCentersById;
