import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';

import { IconDownloadCloud02, IconSearch } from '@pentabd/icons';
import { Button, DownloadButtons, InputText, Table } from '@pentabd/ui';

import { useCandidateElectionFullDetailsListAdmin } from '@hooks/candidate-info-management/nomination-list/useCandidateElectionFullDetailsList';
import {
  NominationListProps,
  useNominationList,
} from '@hooks/candidate-info-management/nomination-list/useNominationList';

import { USER_TYPES } from '@constants/user-types';
import { useCandidatesCommunicationPdfGenerator } from '@hooks/miscellaneous/reports/candidates-communication-pdf-generator';
import { NominationListSearchProps } from '@type/candidate-info-management/nomination-list-type';

import { getParams } from '@utils';
import {
  candidatesCommunicationTableBreadcrumbs,
  candidatesCommunicationTableColumns,
} from './constants';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { REPORT_NOMINATION_STATUS_CODES } from '@constants/nomination-status-codes';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import {
  allSelectedData,
  searchStruct,
  searchStructElectionUser,
} from './searchConstants';
import { SearchComponents } from '@components/application-search/SearchComponents';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { ELECTION_INFO } from '@constants/election-info';
import { BadgeElectionUserSearch } from '@components/badge-election-user-search';
import { HeaderComponentCMS } from '@containers/candidate-info-management/components/header';
import { NominationDashboardSearch } from '@components/badge-election-user-search/forms/nomination-dashboard';

function CandidatesCommunication() {
  const { t } = useTranslation();

  const { keycloak } = useAuthWrapper();
  const userType = keycloak.tokenParsed?.userType;
  const {
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
    candidateElectionFullDetailsListAdminList: candidateDetailsAdmin,
    getCandidateElectionFullDetailsListAdminData: downloadCandidateDetailsAdmin,
  } = useCandidateElectionFullDetailsListAdmin();

  const {
    nominationList: candidateDetailsOthers,
    getNominationListData: downloadCandidateDetailsOthers,
  } = useNominationList();

  const {
    generatePdf,
    setGenerateCandidatesCommunicationPdfRequestData,
    generatePdfLoading,
  } = useCandidatesCommunicationPdfGenerator();

  const onSubmitSearch = (data: NominationListSearchProps) => {
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

    setGenerateCandidatesCommunicationPdfRequestData({
      electionTypeId: data.electionTypeId,
      electionScheduleId: data.electionScheduleId,
      candidateTypeId: data.candidateTypeId,
      zillaId: data.zillaId,
      constituencyId: data.constituencyId,
      bengaliAlphabetOrder: data.bengaliAlphabetOrder as boolean,
      candidateSerialOrder: data.candidateSerialOrder as boolean,
      nominationStatusCodes: data?.nominationStatusCodes as string,
    });
  };

  const handleDownloadCandidateDetails = () => {
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
        columns={candidatesCommunicationTableColumns(t)}
        rows={
          userType === USER_TYPES.ADMIN
            ? candidateDetailsAdmin || []
            : candidateDetailsOthers || []
        }
        onClickDownload={handleDownloadCandidateDetails}
        downloadLoading={false}
      />,
    ],
  };

  const paginationOnClick = (page: number) => {
    if (userType === USER_TYPES.ADMIN)
      getCandidateElectionFullDetailsListAdminData({
        page: page - 1,
        searchItems: { ...params },
      });
    else
      getNominationListData({
        page: page - 1,
        searchItems: { ...params },
      });

    setSearchParams({ ...params, page: (page - 1).toString() });
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
              : REPORT_NOMINATION_STATUS_CODES.ALL_REPORT,
        },
      };
      setSearchParams(filterObject.searchItems as URLSearchParamsInit);
      getNominationListData(filterObject as NominationListProps);
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
      requiredField={[
        SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
        SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
        SEARCH_FIELD_REQUIRED.CANDIDATE_TYPE,
        SEARCH_FIELD_REQUIRED.ELECTION_SETTINGS_ID,
      ]}
      allSelectedData={allSelectedData}
      onSubmitHandler={onSubmitSearch}
      ignoreOnlineDraft={true}
      nominationStatusCodes={REPORT_NOMINATION_STATUS_CODES.ALL_REPORT}
    />
  );

  return (
    <div className="container-96 mb-24 mb-20">
      <HeaderComponentCMS
        breadcrumbs={candidatesCommunicationTableBreadcrumbs(t)}
        headerText="CANDIDATES_COMMUNICATION.CANDIDATES_COMMUNICATION_INFO"
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
              {t('CANDIDATES_COMMUNICATION.DOWNLOAD')}
            </Button>
          </div>,
        ]}
      />

      {userType === USER_TYPES.ADMIN ? (
        <SearchComponents
          struct={searchStruct}
          selectAny
          allSelectedData={allSelectedData}
          onSubmitHandler={onSubmitSearch}
          ignoreOnlineDraft={true}
          nominationStatusCodes={REPORT_NOMINATION_STATUS_CODES.ALL_REPORT}
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
        columns={candidatesCommunicationTableColumns(t)}
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

export default CandidatesCommunication;
