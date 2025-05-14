import { useState } from 'react';
import { fetchPollingCenterSummaryARO } from '@api/result-management/electoral-process/results/get-polling-center-summarya-aro';
import { useTranslation } from 'react-i18next';
import {
  mapCandidateTypeName,
  mapPollingCenterDescription,
  mapPollingCenterSummary,
} from './helpers';

interface SummaryResponseType {
  candidateTypeId: number;
  candidateTypeNameBn: string;
  count: number;
}
export interface SummaryResponse {
  totalCenters: number;
  cancelledCenters: number;
  totalVoters: number;
  totalMaleVoters: number;
  totalFemaleVoters: number;
  totalThirdGenderVoters: number;
  totalForwardedByOp: SummaryResponseType[];
  totalApproved: SummaryResponseType[];
  totalPendingForApproval: SummaryResponseType[];
  totalNotForwardedByOp: SummaryResponseType[];

  [key: string]: any;
}

export interface PollingCenterMappedSummaryResponseType {
  id?: number;
  summaryLabel?: string;
  summaryValue?: number;
}

export interface PollingCenterMappedDescriptionResponseType {
  id?: number;
  descriptionLabel?: string;
  descriptionValue?: number;
  descriptionStatus?: string;
}

export const useGetPollingCenterSummaryARO = () => {
  const { t } = useTranslation();
  const [summary, setSummary] =
    useState<PollingCenterMappedSummaryResponseType[]>();
  const [description, setDescription] =
    useState<PollingCenterMappedDescriptionResponseType[]>();
  const [candidateTypeName, setCandidateTypeName] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const getPollingCenterSummary = async (scheduleId: number | string) => {
    setLoading(true);
    try {
      const response = await fetchPollingCenterSummaryARO(scheduleId);
      if (response?.data?.status === 200) {
        const modifiedSummaryData = mapPollingCenterSummary(
          t,
          response?.data?.data,
        );
        const modifiedDescriptionData = mapPollingCenterDescription(
          t,
          response?.data?.data,
        );
        setLoading(false);
        setCandidateTypeName(mapCandidateTypeName(response?.data?.data));
        setSummary(modifiedSummaryData);
        setDescription(modifiedDescriptionData);
      }
    } catch {
      setLoading(false);
    }
  };
  return {
    summary,
    getPollingCenterSummary,
    description,
    candidateTypeName,
    loading,
  };
};
