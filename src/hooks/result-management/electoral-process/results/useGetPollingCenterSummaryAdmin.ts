import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchPollingCenterSummaryAdmin } from '@api/result-management/electoral-process/results/get-polling-center-summary-admin';
import { PollingCenterListFilterWithUserId } from '@type/result-management/electoral-process/results/results';
import {
  mapCandidateTypeName,
  mapPollingCenterDescription,
  mapPollingCenterSummary,
} from './helpers';

export interface PollingCenterMappedSummaryAdminResponseType {
  id?: string | number;
  summaryLabel?: string;
  summaryValue?: number;
}

export interface PollingCenterMappedDescriptionAdminResponseType {
  id?: string | number;
  descriptionLabel?: string;
  descriptionValue?: number;
  descriptionStatus?: string;
}

export const useGetPollingCenterSummaryAdmin = () => {
  const { t } = useTranslation();
  const [summary, setSummary] =
    useState<PollingCenterMappedSummaryAdminResponseType[]>();
  const [description, setDescription] =
    useState<PollingCenterMappedDescriptionAdminResponseType[]>();
  const [candidateTypeName, setCandidateTypeName] = useState<any>([]);

  const getPollingCenterSummary = async ({
    scheduleId,
    userId,
    electionTypeId,
  }: PollingCenterListFilterWithUserId) => {
    try {
      const response = await fetchPollingCenterSummaryAdmin({
        scheduleId,
        userId,
        electionTypeId,
      });
      if (response?.data?.status === 200) {
        const modifiedSummaryData = mapPollingCenterSummary(
          t,
          response?.data?.data,
        );
        const modifiedDescriptionData = mapPollingCenterDescription(
          t,
          response?.data?.data,
        );
        setCandidateTypeName(mapCandidateTypeName(response?.data?.data));
        setSummary(modifiedSummaryData);
        setDescription(modifiedDescriptionData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return {
    summary,
    getPollingCenterSummary,
    description,
    candidateTypeName,
  };
};
