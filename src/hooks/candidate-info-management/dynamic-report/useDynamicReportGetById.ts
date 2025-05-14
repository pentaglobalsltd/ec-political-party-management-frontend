import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { getDynamicReportById } from '@api/candidate-info-management/dynamic-report/dynamic-report-get-by-id';
import { DivergentReportByIdType } from '@type/candidate-info-management/dynamic-report/dynamic-report-get-by-id-type';

interface HookReturnType {
  dynamicReportById: DivergentReportByIdType;
  getDynamicReportByIdData: (reportId: string) => void;
}

const useDynamicReportGetById = (): HookReturnType => {
  const { t } = useTranslation();

  const [dynamicReportById, setDynamicReportById] =
    useState<DivergentReportByIdType>({});

  const getDynamicReportByIdData = async (reportId: string) => {
    try {
      const response = await getDynamicReportById(reportId);

      if (response?.data?.status === 200) {
        console.log({ response });

        setDynamicReportById(response?.data?.data);
      } else {
        toast.error(t('TOAST_MESSAGE.DELETE_ERROR_MESSAGE'));
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
    }
  };

  return {
    dynamicReportById,
    getDynamicReportByIdData,
  };
};

export default useDynamicReportGetById;
