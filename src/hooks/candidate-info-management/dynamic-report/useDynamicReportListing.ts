import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { getDynamicReportListing } from '@api/candidate-info-management/dynamic-report/dynamic-report-listing';
import { getDigitBanglaFromEnglish } from '@utils';
import {
  DynamicReportType,
  MappedDynamicReportType,
} from '@type/candidate-info-management/dynamic-report/dynamic-report-listing-type';

interface HookReturnType {
  isLoading: boolean;
  dynamicReportListing: MappedDynamicReportType[];
  getDynamicReportListingData: () => void;
}

interface MappedResponseProps {
  language: string | null;
  item: DynamicReportType;
  index: number;
}

const mappedResponse = ({ item, index, language }: MappedResponseProps) => {
  const mappedData: MappedDynamicReportType = {
    ...item,
    idx: getDigitBanglaFromEnglish(index + 1),
    name: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
  };

  return mappedData;
};

const useDynamicReportListing = (): HookReturnType => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dynamicReportListing, setDynamicReportListing] = useState<
    MappedDynamicReportType[]
  >([]);

  const getDynamicReportListingData = async () => {
    try {
      setIsLoading(true);

      const response = await getDynamicReportListing();

      if (response?.data?.status === 200) {
        const mappedData = response?.data?.data?.divergentReportList?.map(
          (item: DynamicReportType, index: number) =>
            mappedResponse({ item, index, language }),
        );

        setDynamicReportListing(mappedData);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(t('TOAST_MESSAGE.DELETE_ERROR_MESSAGE'));
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    dynamicReportListing,
    getDynamicReportListingData,
  };
};

export default useDynamicReportListing;
