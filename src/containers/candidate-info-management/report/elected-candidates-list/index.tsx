import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';

import { IconSearch } from '@pentabd/icons';
import { DownloadButtons, InputText, Table } from '@pentabd/ui';

import { SearchComponents } from '@components/application-search/SearchComponents';

import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import {
  NominationListProps,
  useNominationList,
} from '@hooks/candidate-info-management/nomination-list/useNominationList';
import { useElectedCandidatePdfGenerator } from '@hooks/miscellaneous/reports/elected-candidate-pdf-generator';
import { useCandidateElectionFullDetailsListAdmin } from '@hooks/candidate-info-management/nomination-list/useCandidateElectionFullDetailsList';

import { USER_TYPES } from '@constants/user-types';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
import { REPORT_NOMINATION_STATUS_CODES } from '@constants/nomination-status-codes';
import {
  electedCandidateListTableBreadcrumbs,
  electedCandidateTableColumns,
} from './constants';
import {
  allSelectedData,
  searchStruct,
  searchStructElectionUser,
} from './searchConstants';
import { NominationListSearchProps } from '@type/candidate-info-management/nomination-list-type';
import { getParams } from '@utils';
import { ELECTION_INFO } from '@constants/election-info';
import { BadgeElectionUserSearch } from '@components/badge-election-user-search';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { HeaderComponentCMS } from '@containers/candidate-info-management/components/header';

function ElectedCandidatesList() {
  const { t } = useTranslation();
  const { keycloak } = useAuthWrapper();
  const userType = keycloak.tokenParsed?.userType;

  const {
    isAdmin,
    electionTypes,
    electionSchedules,
    candidateTypes,
    zillas,
    constituencies,
  } = useFiltersRedux();

  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const electionUserNationalType =
    electionTypes?.[0]?.value === ELECTION_INFO.NATIONAL.ID;

  const [rowPdfDownloadLoading, setRowPdfDownloadLoading] = useState<number>();

  // for Pdf download
  const { generatePdf, generatePdfLoading } = useElectedCandidatePdfGenerator();

  const {
    nominationList,
    loading,
    activePage,
    totalPage,
    getNominationListData,
  } = useNominationList();

  const {
    candidateElectionFullDetailsListAdminList,
    getCandidateElectionFullDetailsListAdminData,
    adminActivePage,
    adminLoading,
    adminTotalPage,
  } = useCandidateElectionFullDetailsListAdmin();

  const {
    candidateElectionFullDetailsListAdminList: candidateDetailsAdmin,
    getCandidateElectionFullDetailsListAdminData: downloadCandidateDetailsAdmin,
  } = useCandidateElectionFullDetailsListAdmin();

  const {
    nominationList: candidateDetailsOthers,
    getNominationListData: downloadCandidateDetailsOthers,
  } = useNominationList();

  const onSubmitSearch = (data: NominationListSearchProps) => {
    data.nominationStatusCodes =
      REPORT_NOMINATION_STATUS_CODES.ELECTED_CANDIDATES_LIST;

    // when user is admin
    if (userType === USER_TYPES.ADMIN) {
      getCandidateElectionFullDetailsListAdminData({
        searchItems: data,
      });
    }

    // when user is not admin
    else {
      if (data?.electionSettingsId) {
        getNominationListData({
          searchItems: data,
        });
      }
    }
  };

  // download Pdf
  const handleDownloadPdf = (row: any) => {
    setRowPdfDownloadLoading(row?.candidateElectionDetailsId);

    row.nominationStatusCodes =
      REPORT_NOMINATION_STATUS_CODES.ELECTED_CANDIDATES_LIST;

    generatePdf({
      electionTypeId: row?.electionTypeId,
      electionSettingsId: row?.electionSettingsId,
      electionScheduleId: row?.electionScheduleId,
      candidateTypeId: row?.candidateTypeId,
      candidateSerialOrder: row?.candidateSerialOrder as boolean,
      nominationStatusCodes: row?.nominationStatusCodes as string,
    });
  };

  // downloads table data
  const handleDownloadCandidateList = () => {
    if (Object.keys(params).length > 0) {
      if (userType === USER_TYPES.ADMIN) {
        downloadCandidateDetailsAdmin({
          searchItems: { ...params },
          size: MAX_ROW_SIZE,
        });
      } else {
        downloadCandidateDetailsOthers({
          searchItems: { ...params },

          size: MAX_ROW_SIZE,
        });
      }
    }
  };

  // when user is admin
  useEffect(() => {
    if (
      Object.keys(params).length > 0 &&
      params?.electionSettingsId &&
      userType !== USER_TYPES.ADMIN
    ) {
      getNominationListData({
        searchItems: { ...params },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType]);

  // when user is not admin
  useEffect(() => {
    if (Object.keys(params).length > 0 && userType === USER_TYPES.ADMIN) {
      getCandidateElectionFullDetailsListAdminData({
        searchItems: { ...params },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType]);

  const tableHeaderExt = {
    leftComponents: [
      <InputText
        key={1}
        name="pre-input"
        outline
        placeholder="Search"
        prefix={<IconSearch size="20" />}
        size="md"
        type="text"
        status="default"
      />,
    ],
    rightComponents: [
      <DownloadButtons
        key={2}
        fileName="download-candidate-details"
        columns={electedCandidateTableColumns({
          t,
          electionTypeId: params?.electionTypeId,
          isDownload: true,
          handleDownloadPdf,
          generatePdfLoading,
          rowPdfDownloadLoading,
        })}
        rows={
          userType === USER_TYPES.ADMIN
            ? candidateDetailsAdmin || []
            : candidateDetailsOthers || []
        }
        onClickDownload={handleDownloadCandidateList}
        downloadLoading={false}
      />,
    ],
  };

  const paginationOnClick = (page: number) => {
    if (userType === USER_TYPES.ADMIN) {
      getCandidateElectionFullDetailsListAdminData({
        page: page - 1,
        searchItems: { ...params },
      });
    } else {
      getNominationListData({
        page: page - 1,
        searchItems: { ...params },
      });
    }

    setSearchParams({ ...params, page: (page - 1).toString() });
  };

  const electionUserSearchCallback = useCallback(() => {
    const filterObject = {
      searchItems: {
        electionTypeId: electionTypes?.[0]?.value,
        electionScheduleId: electionSchedules?.[0]?.value,
        candidateTypeId: candidateTypes?.[0]?.value,
        zillaId: zillas?.[0]?.value,
        constituencyId: constituencies?.[0]?.value,
        electionSettingsId: constituencies?.[0]?.extra?.electionSettingsId,
        nominationStatusCodes:
          REPORT_NOMINATION_STATUS_CODES.ELECTED_CANDIDATES_LIST,
      },
    };

    setSearchParams(filterObject.searchItems as URLSearchParamsInit);
    getNominationListData(filterObject as NominationListProps);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    />
  ) : (
    <SearchComponents
      struct={searchStructElectionUser}
      requiredField={[
        SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
        SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
        SEARCH_FIELD_REQUIRED.CANDIDATE_TYPE,
        SEARCH_FIELD_REQUIRED.ELECTION_SETTINGS_ID,
      ]}
      allSelectedData={allSelectedData}
      onSubmitHandler={onSubmitSearch}
    />
  );

  return (
    <div className="container-96 mb-24 mb-20">
      <HeaderComponentCMS
        breadcrumbs={electedCandidateListTableBreadcrumbs(t)}
        headerText="ELECTED_CANDIDATE_LIST.ELECTED_CANDIDATE_LIST"
      />
      {isAdmin ? (
        <SearchComponents
          struct={searchStruct}
          selectAny
          allSelectedData={allSelectedData}
          onSubmitHandler={onSubmitSearch}
        />
      ) : (
        renderElectionUserSearch
      )}

      <Table
        headerExtension={tableHeaderExt}
        rows={
          userType === USER_TYPES.ADMIN
            ? candidateElectionFullDetailsListAdminList || []
            : nominationList || []
        }
        columns={electedCandidateTableColumns({
          t,
          electionTypeId: params?.electionTypeId,
          handleDownloadPdf,
          generatePdfLoading,
          rowPdfDownloadLoading,
        })}
        pagination={{
          language: 'bn',
          totalPage: userType === USER_TYPES.ADMIN ? adminTotalPage : totalPage,
          activePage:
            userType === USER_TYPES.ADMIN ? adminActivePage : activePage,
          onClick: (page: number) => paginationOnClick(page),
        }}
        loading={userType === USER_TYPES.ADMIN ? adminLoading : loading}
        loadingItemCount={10}
      />
    </div>
  );
}

export default ElectedCandidatesList;
