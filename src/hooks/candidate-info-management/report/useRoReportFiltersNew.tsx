import { useEffect, useState } from 'react';
import { getRoReportFilters } from '@api/candidate-info-management/report/getRoReportFilters';
import { useLanguage } from '@hooks/miscellaneous/custom-hook/useLanguage';
import { GetRoReportFiltersType } from '@type/candidate-info-management/report/get-ro-report-filters-types';
import { SelectOptionArray } from '@type/selection-option-type';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { mappedDataNewReportFilter } from './helper/mapped-data-new-report-filter';

export enum USER_PROFILE_DETAILS_KEYS { // TODO:: should i move them to a separate file ?
  NAME = 'name',
  CANDIDATE_TYPES = 'candidateTypes',
  ELECTION_SCHEDULES = 'electionSchedules',
  ELECTION_SETTINGS = 'electionSettings',
  CONSTITUENCIES = 'constituencies',
  ELECTION_TYPES = 'electionTypes',
  MUNICIPALITIES = 'municipalities',
  REGIONS = 'regions',
  UNION_OR_WARDS = 'unionOrWards',
  UPAZILAS = 'upazilas',
  ZILAS = 'zillas',
}

export const roFiltersInitialValue = {
  // TODO:: should i move them to a separate file ?
  [USER_PROFILE_DETAILS_KEYS.NAME]: '',
  [USER_PROFILE_DETAILS_KEYS.CANDIDATE_TYPES]: [],
  [USER_PROFILE_DETAILS_KEYS.ELECTION_SCHEDULES]: [],
  [USER_PROFILE_DETAILS_KEYS.ELECTION_SETTINGS]: [],
  [USER_PROFILE_DETAILS_KEYS.CONSTITUENCIES]: [],
  [USER_PROFILE_DETAILS_KEYS.ELECTION_TYPES]: [],
  [USER_PROFILE_DETAILS_KEYS.REGIONS]: [],
  [USER_PROFILE_DETAILS_KEYS.UPAZILAS]: [],
  [USER_PROFILE_DETAILS_KEYS.ZILAS]: [],
  [USER_PROFILE_DETAILS_KEYS.UNION_OR_WARDS]: [],
  [USER_PROFILE_DETAILS_KEYS.MUNICIPALITIES]: [],
};

export interface ReportRoSearchFiltersTypeNew {
  [USER_PROFILE_DETAILS_KEYS.NAME]?: string;
  [USER_PROFILE_DETAILS_KEYS.CANDIDATE_TYPES]: SelectOptionArray[];
  [USER_PROFILE_DETAILS_KEYS.ELECTION_SCHEDULES]: SelectOptionArray[];
  [USER_PROFILE_DETAILS_KEYS.ELECTION_SETTINGS]: SelectOptionArray[];
  [USER_PROFILE_DETAILS_KEYS.CONSTITUENCIES]: SelectOptionArray[];
  [USER_PROFILE_DETAILS_KEYS.ELECTION_TYPES]: SelectOptionArray[];

  [USER_PROFILE_DETAILS_KEYS.MUNICIPALITIES]: SelectOptionArray[];
  [USER_PROFILE_DETAILS_KEYS.REGIONS]: SelectOptionArray[];

  [USER_PROFILE_DETAILS_KEYS.UNION_OR_WARDS]: SelectOptionArray[];
  [USER_PROFILE_DETAILS_KEYS.UPAZILAS]: SelectOptionArray[];
  [USER_PROFILE_DETAILS_KEYS.ZILAS]: SelectOptionArray[];
}

interface HookReturnType {
  getRoReportFiltersData: (userId: string) => void;
  roReportFilters: ReportRoSearchFiltersTypeNew;
  subject?: string;
  userType?: string;
  success: boolean;
}

const useRoReportFiltersNew = (
  getSettingsId = false,
  isOnMount = true,
): HookReturnType => {
  const { language } = useLanguage();
  const [success, setSuccess] = useState(false);

  const { keycloak } = useAuthWrapper();
  const subject = keycloak.subject;
  const userType = keycloak?.tokenParsed?.userType;

  const [roReportFilters, setRoReportFilters] =
    useState<ReportRoSearchFiltersTypeNew>(roFiltersInitialValue);

  useEffect(() => {
    if (subject && isOnMount) getRoReportFiltersData(subject);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject, isOnMount]);

  const getRoReportFiltersData = async (userId: string) => {
    setSuccess(false);

    try {
      const response = await getRoReportFilters(userId);
      if (response?.data?.status === 200) {
        const resData = response?.data?.data as GetRoReportFiltersType;
        const mappedObj = mappedDataNewReportFilter(
          resData,
          language,
          getSettingsId,
        );
        setRoReportFilters(mappedObj);
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
      setSuccess(false);
    }
  };

  return {
    roReportFilters,
    getRoReportFiltersData,
    subject,
    userType,
    success,
  };
};

export default useRoReportFiltersNew;
