import { useState } from 'react';
import { getAvailablePollingCenters } from '@api/user-management-service/available-polling-center';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';

interface RequestProps {
  id: number | string;
  userId?: string;
  unionOrWardIds?: string | string[];
  userTypeCode?: string;
  appendSelected?: boolean;
}

interface ResponseProps {
  getAvailablePollingCentersData: ({
    id,
    unionOrWardIds,
    appendSelected,
    userTypeCode,
  }: RequestProps) => void;
  availablePollingCenters: SelectOptionArray[];
  loading: boolean;
  success: boolean;
}

function mapPollingCenters(data: any, lang: string | null) {
  return {
    label:
      lang === LANGUAGE.BANGLA
        ? data?.serial
          ? `${data?.serial} - ${data?.pollingInstituteNameBn} ${data?.descriptionBn}`
          : `${data?.pollingInstituteNameBn} ${data?.descriptionBn}`
        : data?.serial
        ? `${data?.serial} - ${data?.pollingInstituteNameEn} ${data?.descriptionEn}`
        : `${data?.pollingInstituteNameEn} ${data?.descriptionEn}`,
    value: data?.id,
    isSelected: data?.isSelected,
  };
}

export const useGetAvailablePollingCenters = (): ResponseProps => {
  const { language } = useLanguage();
  const [availablePollingCenters, setAvailablePollingCenters] = useState<
    SelectOptionArray[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const getAvailablePollingCentersData = async ({
    id,
    userId,
    unionOrWardIds,
    userTypeCode,
    appendSelected,
  }: RequestProps) => {
    try {
      setLoading(true);
      setSuccess(false);
      const response = await getAvailablePollingCenters({
        id,
        userId,
        unionOrWardIds,
        userTypeCode,
        appendSelected,
      });
      if (response?.data?.status === 200) {
        const data = response?.data?.data?.pollingCenters?.map((item: any) => {
          return mapPollingCenters(item, language);
        });

        setAvailablePollingCenters(data);

        setLoading(false);
        setSuccess(true);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    getAvailablePollingCentersData,
    availablePollingCenters,
    loading,
    success,
  };
};
