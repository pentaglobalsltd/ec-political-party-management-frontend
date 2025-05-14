import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';

import { Button, DownloadButtons, InputText, Table } from '@pentabd/ui';
import { IconDownloadCloud02, IconSearch } from '@pentabd/icons';

import { SearchComponents } from '@components/application-search/SearchComponents';

import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { useNominationList } from '@hooks/candidate-info-management/nomination-list/useNominationList';
import { useValidNominatedCandidatePdfGenerator } from '@hooks/miscellaneous/reports/valid-nominated-candidate-pdf-generator';
import { useCandidateElectionFullDetailsListAdmin } from '@hooks/candidate-info-management/nomination-list/useCandidateElectionFullDetailsList';

import { USER_TYPES } from '@constants/user-types';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
import { REPORT_NOMINATION_STATUS_CODES } from '@constants/nomination-status-codes';
import {
  validNominatedCandidateListTableBreadcrumbs,
  validNominatedCandidateListTableColumns,
} from './constants';
import {
  allSelectedData,
  searchStruct,
  searchStructElectionUser,
} from './searchConstants';

import { NominationListSearchProps } from '@type/candidate-info-management/nomination-list-type';
import { getParams } from '@utils';
import { BadgeElectionUserSearch } from '@components/badge-election-user-search';
import { ELECTION_INFO } from '@constants/election-info';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { HeaderComponentCMS } from '@containers/candidate-info-management/components/header';

function ValidNominatedCandidateList() {
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
    generatePdf,
    setGenerateValidNominatedCandidatePdfRequestData,
    generatePdfLoading,
  } = useValidNominatedCandidatePdfGenerator();

  const {
    candidateElectionFullDetailsListAdminList: candidateDetailsAdmin,
    getCandidateElectionFullDetailsListAdminData: downloadCandidateDetailsAdmin,
  } = useCandidateElectionFullDetailsListAdmin();

  const {
    nominationList: candidateDetailsOthers,
    getNominationListData: downloadCandidateDetailsOthers,
  } = useNominationList();

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

  useEffect(() => {
    if (Object.keys(params).length > 0 && userType === USER_TYPES.ADMIN) {
      getCandidateElectionFullDetailsListAdminData({
        searchItems: { ...params },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType]);

  const onSubmitSearch = (data: NominationListSearchProps) => {
    data.nominationStatusCodes =
      REPORT_NOMINATION_STATUS_CODES.CONTESTING_CANDIDATES_LIST;
    data.candidateSerialOrder = true;
    data.bengaliAlphabetOrder = true;

    if (userType === USER_TYPES.ADMIN) {
      getCandidateElectionFullDetailsListAdminData({
        searchItems: data,
      });
    } else {
      if (data?.electionSettingsId) {
        getNominationListData({
          searchItems: data,
        });
      }
    }

    setGenerateValidNominatedCandidatePdfRequestData({
      electionTypeId: data.electionTypeId,
      electionScheduleId: data.electionScheduleId,
      candidateTypeId: data.candidateTypeId,
      zillaId: data.zillaId,
      constituencyId: data.constituencyId,
      bengaliAlphabetOrder: data.bengaliAlphabetOrder as boolean,
      candidateSerialOrder: data.candidateSerialOrder as boolean,
      nominationStatusCodes: data.nominationStatusCodes,
    });
  };

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
        fileName="valid-nominated-candidate-list"
        columns={validNominatedCandidateListTableColumns({
          t,
          electionTypeId: params?.electionTypeId,
          candidateTypeId: params?.candidateTypeId,
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
    const filterObject: any = {
      searchItems: {
        electionTypeId: electionTypes?.[0]?.value,
        electionScheduleId: electionSchedules?.[0]?.value,
        candidateTypeId: candidateTypes?.[0]?.value,
        zillaId: zillas?.[0]?.value,
        constituencyId: constituencies?.[0]?.value,
        nominationStatusCodes:
          REPORT_NOMINATION_STATUS_CODES.CONTESTING_CANDIDATES_LIST,
        electionSettingsId: constituencies?.[0]?.extra?.electionSettingsId,
        candidateSerialOrder: true,
        bengaliAlphabetOrder: true,
      },
    };

    setSearchParams(filterObject.searchItems as URLSearchParamsInit);
    getNominationListData(filterObject);

    setGenerateValidNominatedCandidatePdfRequestData(filterObject.searchItems);
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
        breadcrumbs={validNominatedCandidateListTableBreadcrumbs(t)}
        headerText="VALID_NOMINATED_CANDIDATE_LIST.VALID_NOMINATED_CANDIDATE_LIST"
        actions={[
          <div className="pt-6">
            <Button
              key={3}
              type="primary"
              htmlType="button"
              size="sm"
              onClick={() => generatePdf()}
              loading={generatePdfLoading}
              disabled={
                userType === USER_TYPES.ADMIN
                  ? candidateElectionFullDetailsListAdminList &&
                    candidateElectionFullDetailsListAdminList.length === 0
                  : nominationList && nominationList.length === 0
              }
            >
              <IconDownloadCloud02 fill="light" size="20" />{' '}
              {t('VALID_NOMINATED_CANDIDATE_LIST.DOWNLOAD')}
            </Button>
          </div>,
        ]}
      />
      {isAdmin ? (
        <SearchComponents
          struct={searchStruct}
          requiredField={[
            SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
            SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
            SEARCH_FIELD_REQUIRED.CANDIDATE_TYPE,
            SEARCH_FIELD_REQUIRED.CONSTITUENCY_ID,
          ]}
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
        columns={validNominatedCandidateListTableColumns({
          t,
          electionTypeId: params?.electionTypeId,
          candidateTypeId: params?.candidateTypeId,
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

export default ValidNominatedCandidateList;
