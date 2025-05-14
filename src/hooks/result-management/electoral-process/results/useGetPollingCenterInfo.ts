import { useState } from 'react';
import { fetchPollingCenterInfo } from '@api/result-management/electoral-process/results/get-polling-center-info';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';

interface PollingCenterInfoProps {
  scheduleId: number | string;
  centerId: number | string;
  candidateTypeId: number | string;
}

function mapPollingCenterList(data: any, lang: string | null) {
  return {
    ...data,
    pollingInstituteName:
      lang === LANGUAGE.BANGLA
        ? data?.pollingCenter?.pollingInstituteNameBn
        : data?.pollingCenter?.pollingInstituteNameEn,
  };
}

export const useGetPollingCenterInfo = () => {
  const [pollingCenterInfo, setPollingCenterInfo] = useState<any>([]);
  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);

  const getPollingCenterInfo = async ({
    scheduleId,
    centerId,
    candidateTypeId,
  }: PollingCenterInfoProps) => {
    try {
      setLoading(true);
      const response = await fetchPollingCenterInfo({
        scheduleId,
        centerId,
        candidateTypeId,
      });
      if (response?.data?.status === 200) {
        const mappedPollingCenterInfo = mapPollingCenterList(
          response?.data?.data,
          language,
        );

        setPollingCenterInfo(mappedPollingCenterInfo);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  return {
    loading,
    pollingCenterInfo,
    getPollingCenterInfo,
  };
};
