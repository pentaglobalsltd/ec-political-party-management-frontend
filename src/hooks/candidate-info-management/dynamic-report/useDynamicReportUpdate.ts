import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { updateDynamicReportApi } from '@api/candidate-info-management/dynamic-report/dynamic-report-update';
import { UpdateDynamicQueryApi } from '@type/candidate-info-management/dynamic-report/dynamic-report-update-type';

export type UpdateDynamicReportType = ({
  nameBn,
  nameEn,
  tag,
  queryValue,
}: UpdateDynamicQueryApi) => void;

interface HookReturnType {
  isLoading: boolean;
  isSuccess: boolean;
  updateDynamicReport: UpdateDynamicReportType;
}

const useUpdateDynamicReport = (): HookReturnType => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { t } = useTranslation();

  const updateDynamicReport = async ({
    reportId,
    nameBn,
    nameEn,
    tag,
    queryValue,
  }: UpdateDynamicQueryApi) => {
    try {
      setIsLoading(true);

      const response = await updateDynamicReportApi({
        reportId,
        nameBn,
        nameEn,
        tag,
        queryValue,
      });
      if (response?.data?.status === 200) {
        toast.success(t('TOAST_MESSAGE.UPDATE_SUCCESS_MESSAGE'));
        setIsLoading(false);
        setIsSuccess(true);
      } else {
        setIsLoading(false);
      }
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      setIsLoading(false);
    }
  };

  return { updateDynamicReport, isLoading, isSuccess };
};

export default useUpdateDynamicReport;
