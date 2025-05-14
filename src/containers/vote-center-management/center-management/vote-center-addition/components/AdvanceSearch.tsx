import { USER_TYPES } from '@constants/user-types';
import { VOTE_CENTER_MANAGEMENT } from '@constants/permissions/vote-center-management';

import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { SearchComponents } from '@components/application-search/SearchComponents';
import {
  allSelectedDataElaka,
  searchStructElaka,
} from './searchConstantsElaka';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
import {
  allSelectedDataSettings,
  searchStructSettings,
} from './searchConstantsSettings';

import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { electionUserSearchForVoteCenter } from '../helpers';
import { isPermitted } from '@helpers/permission';
import { ELECTION_INFO } from '@constants/election-info';
import { BadgeElectionUserSearch } from '@components/badge-election-user-search';
import { VoteCenterListSearch } from '@components/badge-election-user-search/forms/vote-center-list';
import { useCallback } from 'react';
import { URLSearchParamsInit } from 'react-router-dom';
import { GetPollingCenterAggregated } from '@api/vote-center-management/center-management/polling-center-list/polling-centers-aggregated';

export interface VoteCenterAdvanceSearchProps {
  totalCol?: string;
  colSpan?: string;
  formSubmit: (data: any) => void;
  loading: boolean;
  inputs?: {
    electionTypeMaster?: boolean;
    electionSchedule?: boolean;
    electionSettings?: boolean;
    zillaByElectionSettings?: boolean;
    upazillaByConstituency?: boolean;
    unionWardsByZillaConstituencyUpazilla?: boolean;
    voteCenterType?: boolean;

    // 2
    candidateType?: boolean;
    zillaByElectionScheduleCandidateType?: boolean;
  };
  searchHeader?: string;
}

interface AdvanceSearchProps {
  submitHandler: (dataObj: GetPollingCenterAggregated) => void;
  setSearchParams: (data: URLSearchParamsInit) => void;
  loading: boolean;
}

const AdvanceSearch = ({
  submitHandler,
  setSearchParams,
}: AdvanceSearchProps) => {
  const {
    electionTypes: electionTypesRedux,
    electionSchedules: electionSchedulesRedux,
    candidateTypes: candidateTypesRedux,
    zillas: zillasRedux,
    constituencies: constituenciesRedux,
  } = useFiltersRedux();
  const electionUserNationalType =
    electionTypesRedux?.[0]?.value === ELECTION_INFO.NATIONAL.ID;

  const settingBasedSearch = (data: any) => {
    submitHandler({
      queryParams: {
        ...data,
      },
    });
  };

  const areaBasedSearch = (data: any) => {
    submitHandler({
      queryParams: {
        ...data,
      },
    });
  };

  // RO OP filter =============================

  const { keycloak } = useAuthWrapper();
  const userType = keycloak.tokenParsed?.userType;
  const permissionsArray = keycloak.realmAccess?.roles;

  const opRoSearchSubmit = (data: any) => {
    submitHandler({
      queryParams: { ...data },
    });
  };

  const electionUserSearchCallback = useCallback((data: any) => {
    const filterObject = {
      searchItems: {
        electionTypeId: electionTypesRedux?.[0]?.value,
        electionScheduleId: electionSchedulesRedux?.[0]?.value,
        candidateTypeId: candidateTypesRedux?.[0]?.value,
        zillaId: zillasRedux?.[0]?.value,
        electionSettingsId: constituenciesRedux?.[0]?.extra?.electionSettingsId,
        ...data,
      },
    };

    setSearchParams(filterObject.searchItems as URLSearchParamsInit);
    submitHandler({
      queryParams: filterObject.searchItems,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pollingCenterPermissionList = (permission: string) => {
    if (
      permissionsArray?.includes(
        VOTE_CENTER_MANAGEMENT.CENTER_MANAGEMENT_POLLING_CENTER_FULL,
      )
    ) {
      return true;
    }
    return isPermitted(permissionsArray, permission);
  };

  return (
    <>
      {/* OP & RO - সেটিংস ভিত্তিক অনুসন্ধান */}
      {!electionUserNationalType &&
        userType !== USER_TYPES.ADMIN &&
        pollingCenterPermissionList(
          VOTE_CENTER_MANAGEMENT.CENTER_MANAGEMENT_POLLING_CENTER_SEARCH_SETTINGS,
        ) && (
          <>
            <SearchComponents
              title="VOTE_CENTER_ADDITION.SETTING_BASED_SEARCH"
              struct={electionUserSearchForVoteCenter(
                electionTypesRedux?.[0]?.value,
              )}
              onSubmitHandler={opRoSearchSubmit}
              requiredField={[
                SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
                SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
                SEARCH_FIELD_REQUIRED.CANDIDATE_TYPE,
                SEARCH_FIELD_REQUIRED.ELECTION_SETTINGS_IDS,
              ]}
              allSelectedData={allSelectedDataSettings}
              // loading={loading}
            />
          </>
        )}
      {electionUserNationalType &&
        pollingCenterPermissionList(
          VOTE_CENTER_MANAGEMENT.CENTER_MANAGEMENT_POLLING_CENTER_SEARCH_SETTINGS,
        ) && (
          <>
            <BadgeElectionUserSearch
              labels={{
                electionTypes: electionTypesRedux?.[0]?.label,
                electionSchedules: electionSchedulesRedux?.[0]?.label,
                candidateTypes: candidateTypesRedux?.[0]?.label,
                zillas: zillasRedux?.[0]?.label,
                constituencies: constituenciesRedux?.[0]?.label,
              }}
              callback={electionUserSearchCallback}
              children={
                <VoteCenterListSearch
                  callback={electionUserSearchCallback}
                  field={{
                    upazila: true,
                    unionward: true,
                    centerType: true,
                    status: true,
                  }}
                />
              }
              alignment="below"
            />
          </>
        )}

      {/* 1 - ADMIN সেটিংস ভিত্তিক অনুসন্ধান */}
      {userType === USER_TYPES.ADMIN &&
        pollingCenterPermissionList(
          VOTE_CENTER_MANAGEMENT.CENTER_MANAGEMENT_POLLING_CENTER_SEARCH_SETTINGS,
        ) &&
        !electionUserNationalType && (
          <div>
            <SearchComponents
              title="VOTE_CENTER_ADDITION.SETTING_BASED_SEARCH"
              struct={searchStructSettings}
              onSubmitHandler={settingBasedSearch}
              requiredField={[
                SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
                SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
                SEARCH_FIELD_REQUIRED.CANDIDATE_TYPE,
              ]}
              allSelectedData={allSelectedDataSettings}
            ></SearchComponents>
          </div>
        )}

      {/* 2 - ADMIN এলাকা ভিত্তিক অনুসন্ধান  */}
      {pollingCenterPermissionList(
        VOTE_CENTER_MANAGEMENT.CENTER_MANAGEMENT_POLLING_CENTER_SEARCH_AREA,
      ) ? (
        <SearchComponents
          title="VOTE_CENTER_ADDITION.AREA_BASED_SEARCH"
          struct={searchStructElaka}
          onSubmitHandler={areaBasedSearch}
          requiredField={[
            SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
            SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
            SEARCH_FIELD_REQUIRED.CANDIDATE_TYPE,
          ]}
          allSelectedData={allSelectedDataElaka}
        />
      ) : null}
      {/* ============================================ */}
    </>
  );
};

export default AdvanceSearch;
