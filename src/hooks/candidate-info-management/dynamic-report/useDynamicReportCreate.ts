import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { createDynamicReportApi } from '@api/candidate-info-management/dynamic-report/dynamic-report-create';
import { CreateDynamicQueryApi } from '@type/candidate-info-management/dynamic-report/dynamic-report-create-type';

export type CreateDynamicReportType = ({
  nameBn,
  nameEn,
  tag,
  queryValue,
}: CreateDynamicQueryApi) => void;

interface HookReturnType {
  isLoading: boolean;
  isSuccess: boolean;
  createDynamicReport: CreateDynamicReportType;
}

const useCreateDynamicReport = (): HookReturnType => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { t } = useTranslation();

  const createDynamicReport = async ({
    nameBn,
    nameEn,
    tag,
    queryValue,
  }: CreateDynamicQueryApi) => {
    try {
      setIsLoading(true);

      const response = await createDynamicReportApi({
        nameBn,
        nameEn,
        tag,
        queryValue,
      });
      if (response?.data?.status === 201) {
        toast.success(t('TOAST_MESSAGE.CREATE_SUCCESS_MESSAGE'));
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

  return { createDynamicReport, isLoading, isSuccess };
};

export default useCreateDynamicReport;
