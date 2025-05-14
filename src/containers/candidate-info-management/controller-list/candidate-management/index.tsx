import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import { Text, Table } from '@pentabd/ui';

import { SearchComponents } from '@components/application-search/SearchComponents';
import { USER_TYPES } from '@constants/user-types';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import { CANDIDATE_MANAGEMENT } from '@constants/permissions/candidate-management';
import { AVAILABLE_STATUS_CODE } from '@constants/steps';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import useNominationStatuses from '@hooks/candidate-info-management/controller-list/nomination-status/useNominationStatuses';
import { useCandidateInformation } from '@hooks/candidate-info-management/nomination-list/useCandidateInformation';
import { NominationListSearchProps } from '@type/candidate-info-management/nomination-list-type';
import { getParams, getDigitBanglaFromEnglish } from '@utils';

import SearchInput from './components/SearchInput';

import {
  allSelectedData,
  searchStructAdmin,
  searchStructElectionUser,
} from './searchConstants';
import {
  nominatedCandidateTableBreadcrumbs,
  nominatedCandidateTableColumns,
} from './constants';
import { useGetAllCandidateType } from '@hooks/election-schedule-management/other/candidate-type/useGetAllCandidateType';
import { BadgeElectionUserSearch } from '@components/badge-election-user-search';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { ELECTION_INFO } from '@constants/election-info';
import { NominationListProps } from '@hooks/candidate-info-management/nomination-list/useNominationList';
import { HeaderComponentCMS } from '@containers/candidate-info-management/components/header';
import { NominationDashboardSearch } from '@components/badge-election-user-search/forms/nomination-dashboard';

function CandidateManagement() {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const [searchItems, setSearchItems] = useState<NominationListSearchProps>({});

  const { nominationStatuses, getNominationStatusData } = useNominationStatuses(
    { isActive: true },
  );
  const {
    electionTypes,
    electionSchedules,
    candidateTypes,
    zillas,
    constituencies,
  } = useFiltersRedux();

  const { t } = useTranslation();
  const { keycloak } = useAuthWrapper();
  const userType = keycloak.tokenParsed?.userType;
  const permissionsArray = keycloak.realmAccess?.roles;

  const { allCandidateTypes, getAllCandidateType } = useGetAllCandidateType();

  const electionUserNationalType =
    electionTypes?.[0]?.value === ELECTION_INFO.NATIONAL.ID;

  const {
    candidateInformation,
    getCandidateInformation,
    adminActivePage,
    adminLoading,
    adminTotalPage,
    adminTotalCount,
  } = useCandidateInformation();

  // for table download
  const {
    candidateInformation: downloadCandidateInformation,
    adminLoading: downloadAdminLoading,
    getCandidateInformation: downloadGetCandidateInformation,
  } = useCandidateInformation();

  useEffect(() => {
    getAllCandidateType();
    getNominationStatusData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userType !== USER_TYPES.ADMIN && Object.keys(params)?.length > 0) {
      const { page, ...rest } = params;

      getCandidateInformation({
        page: page ? parseInt(page, 10) : 0,
        searchItems: rest,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType]);

  useEffect(() => {
    if (userType === USER_TYPES.ADMIN) {
      const { page, ...rest } = params;

      getCandidateInformation({
        page: page ? parseInt(page, 10) : 0,
        searchItems: rest,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType]);

  const onSubmitSearch = (data: { [x: string]: string | number }) => {
    setSearchItems(data);
    getCandidateInformation({
      searchItems: data,
    });
  };

  const onClickDownload = () => {
    if (userType !== USER_TYPES.ADMIN) {
      downloadGetCandidateInformation({
        searchItems,
        size: MAX_ROW_SIZE,
      });
    } else {
      downloadGetCandidateInformation({
        searchItems,
        size: MAX_ROW_SIZE,
      });
    }
  };

  const tableColumnsCommonInUiAndDownload = {
    t,
    canViewStatusHistory: !!permissionsArray?.includes(
      CANDIDATE_MANAGEMENT.CANDIDATE_STATUS_HISTORY_VIEW,
    ),
    isAdmin: !!permissionsArray?.includes(
      CANDIDATE_MANAGEMENT.CANDIDATE_NOMINATION_STATUS_UPDATE,
    ),
    params,
    getCandidateInformation,
    searchItems,
    canChangeCandidateType: !!permissionsArray?.includes(
      CANDIDATE_MANAGEMENT.UPDATE_CANDIDATE_TYPE,
    ),

    canViewSendSMS: !!permissionsArray?.includes(
      CANDIDATE_MANAGEMENT.C_SEND_CREDENTIALS,
    ),
  };

  const tablePagination = {
    totalPage: adminTotalPage,
    activePage: adminActivePage,
    onClick: (page: number) => {
      getCandidateInformation({
        page: page - 1,
        searchItems: { ...searchItems, ...params },
      });
      setSearchParams({ ...params, page: (page - 1).toString() });
    },
  };

  const electionUserSearchCallback = useCallback(
    (data: any) => {
      if (!electionUserNationalType) return;
      const filterObject = {
        searchItems: {
          electionTypeId: electionTypes?.[0]?.value,
          electionScheduleId: electionSchedules?.[0]?.value,
          candidateTypeId: candidateTypes?.[0]?.value,
          zillaId: zillas?.[0]?.value,
          constituencyId: constituencies?.[0]?.value,
          electionSettingsId: constituencies?.[0]?.extra?.electionSettingsId,
          nominationStatusCodes:
            data?.nominationStatusCodes?.length > 0
              ? data?.nominationStatusCodes
              : AVAILABLE_STATUS_CODE.NOMINATION_DASHBOARD,
        },
      };
      setSearchParams(filterObject.searchItems as URLSearchParamsInit);
      getCandidateInformation(filterObject as NominationListProps);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [electionUserNationalType],
  );

  const renderElectionUserSearch = electionUserNationalType ? (
    <BadgeElectionUserSearch
      labels={{
        electionTypes: electionTypes?.[0]?.label,
        electionSchedules: electionSchedules?.[0]?.label,
        candidateTypes: candidateTypes?.[0]?.label,
        zillas: zillas?.[0]?.label,
        constituencies: constituencies?.[0]?.label,
      }}
      callback={electionUserSearchCallback}
      children={
        <NominationDashboardSearch callback={electionUserSearchCallback} />
      }
    />
  ) : (
    <SearchComponents
      struct={searchStructElectionUser}
      onSubmitHandler={onSubmitSearch}
      requiredField={[
        SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
        SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
        SEARCH_FIELD_REQUIRED.CANDIDATE_TYPE,
        SEARCH_FIELD_REQUIRED.ELECTION_SETTINGS_ID,
      ]}
      allSelectedData={allSelectedData}
      nominationStatusCodes={AVAILABLE_STATUS_CODE.NOMINATION_DASHBOARD}
    />
  );

  return (
    <div className="container-96 mb-24">
      <HeaderComponentCMS
        breadcrumbs={nominatedCandidateTableBreadcrumbs(t)}
        headerText="CANDIDATE_MANAGEMENT.CANDIDATE_NOMINATION_DASHBOARD"
      />
      {userType === USER_TYPES.ADMIN ? (
        <SearchComponents
          struct={searchStructAdmin}
          onSubmitHandler={onSubmitSearch}
          requiredField={[
            SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
            SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
            SEARCH_FIELD_REQUIRED.CANDIDATE_TYPE,
          ]}
          allSelectedData={allSelectedData}
        />
      ) : (
        renderElectionUserSearch
      )}
      <div className="mb-20">
        <Table
          headerExtension={{
            leftComponents: [
              <div key={1} className="d-flex gap-12 align-items-center">
                <SearchInput
                  callback={getCandidateInformation}
                  isSearchAlwaysEnable={userType === USER_TYPES.ADMIN}
                />
                <Text size="md">
                  {t('CANDIDATE_MANAGEMENT.TOTAL_CANDIDATES')}:{' '}
                  {getDigitBanglaFromEnglish(adminTotalCount)}
                </Text>
              </div>,
            ],
          }}
          download={{
            fileName: 'candidate-nomination-dashboard-list',
            columns: nominatedCandidateTableColumns({
              ...tableColumnsCommonInUiAndDownload,
              isDownload: true,
              canViewStatusHistory: false,
              isAdmin: false,
            }),
            rows: downloadCandidateInformation,
            isLandscapeOrientation: true,
            onClickDownload: onClickDownload,
            downloadLoading: downloadAdminLoading,
          }}
          rows={candidateInformation || []}
          columns={nominatedCandidateTableColumns({
            ...tableColumnsCommonInUiAndDownload,
            allCandidateTypes,
            nominationStatuses,
          })}
          pagination={{ language: 'bn', ...tablePagination }}
          loading={adminLoading}
          loadingItemCount={10}
        />
      </div>
    </div>
  );
}

export default CandidateManagement;
