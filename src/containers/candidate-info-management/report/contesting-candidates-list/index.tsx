import { useTranslation } from 'react-i18next';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

import { IconDownloadCloud02, IconSearch } from '@pentabd/icons';
import { Button, DownloadButtons, InputText, Modal, Table } from '@pentabd/ui';

import { SearchComponents } from '@components/application-search/SearchComponents';
import ContestingCandidatesPdfDownloadModal from './components/ContestingCandidatesPdfDownloadModal';

import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import {
  NominationListProps,
  useNominationList,
} from '@hooks/candidate-info-management/nomination-list/useNominationList';
import { useCandidateElectionFullDetailsListAdmin } from '@hooks/candidate-info-management/nomination-list/useCandidateElectionFullDetailsList';

import { USER_TYPES } from '@constants/user-types';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
import { REPORT_NOMINATION_STATUS_CODES } from '@constants/nomination-status-codes';
import {
  contestingCandidatesListTableBreadcrumbs,
  contestingCandidatesListTableColumns,
  shouldModalOpen,
} from './constants';
import {
  allSelectedData,
  searchStruct,
  searchStructElectionUser,
} from './searchConstants';

import { NominationListSearchProps } from '@type/candidate-info-management/nomination-list-type';
import { getParams } from '@utils';
import { useContestingCandidatesPdfGenerator } from '@hooks/miscellaneous/reports/contesting-candidates-pdf-generator';
import { BadgeElectionUserSearch } from '@components/badge-election-user-search';
import { ELECTION_INFO } from '@constants/election-info';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { HeaderComponentCMS } from '@containers/candidate-info-management/components/header';

function ContestingCandidatesList() {
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

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  const { generatePdf, generatePdfLoading } =
    useContestingCandidatesPdfGenerator();

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
      REPORT_NOMINATION_STATUS_CODES.VALID_NOMINATED_CANDIDATE_LIST_NEW;
    data.candidateSerialOrder = true;
    // data.bengaliAlphabetOrder = true;

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
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const actionButtonDisable = () => {
    if (userType === USER_TYPES.ADMIN) {
      return (
        candidateElectionFullDetailsListAdminList &&
        candidateElectionFullDetailsListAdminList.length === 0
      );
    } else {
      return nominationList && nominationList.length === 0;
    }
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
        fileName="contentending-candidate-details"
        columns={contestingCandidatesListTableColumns(
          t,
          params?.electionTypeId,
        )}
        rows={
          userType === USER_TYPES.ADMIN
            ? candidateDetailsAdmin
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
  const onDownload = () => {
    generatePdf({
      // Mandatory fields
      electionTypeId: Number(params.electionTypeId) as number,
      nominationStatusCodes: params.nominationStatusCodes as string,
      candidateSerialOrder: Boolean(params.candidateSerialOrder) as boolean,
      // Non-mandatory fields
      electionScheduleId: Number(params.electionScheduleId) as number,
      candidateTypeId: Number(params.candidateTypeId) as number,
      zillaId: Number(params.zillaId) as number,
      constituencyId: Number(params.constituencyId) as number,
      bengaliAlphabetOrder: Boolean(params.bengaliAlphabetOrder) as boolean,
    });
  };

  const electionUserSearchCallback = useCallback(() => {
    const filterObject: any = {
      searchItems: {
        electionTypeId: electionTypes?.[0]?.value,
        electionScheduleId: electionSchedules?.[0]?.value,
        candidateTypeId: candidateTypes?.[0]?.value,
        zillaId: zillas?.[0]?.value,
        constituencyId: constituencies?.[0]?.value,
        electionSettingsId: constituencies?.[0]?.extra?.electionSettingsId,
        nominationStatusCodes:
          REPORT_NOMINATION_STATUS_CODES.VALID_NOMINATED_CANDIDATE_LIST_NEW,
        candidateSerialOrder: true,
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
        breadcrumbs={contestingCandidatesListTableBreadcrumbs(t)}
        headerText="CONTESTING_CANDIDATES_LIST.CONTESTING_CANDIDATES_LIST"
        actions={[
          <div className="pt-6">
            <Button
              key={3}
              type="primary"
              htmlType="button"
              size="sm"
              onClick={shouldModalOpen(params) ? openModal : onDownload}
              disabled={actionButtonDisable()}
              loading={generatePdfLoading}
            >
              <IconDownloadCloud02 fill="light" size="20" />
              {t('CONTESTING_CANDIDATES_LIST.DOWNLOAD')}
            </Button>
          </div>,
        ]}
      />
      {isAdmin ? (
        <SearchComponents
          struct={searchStruct}
          requiredField={[SEARCH_FIELD_REQUIRED.ELECTION_TYPE]}
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
        columns={contestingCandidatesListTableColumns(
          t,
          params?.electionTypeId,
          params?.candidateTypeId,
        )}
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

      <Modal
        key={4}
        isOpen={isModalOpen}
        closeAble
        overlay
        portal
        onClose={closeModal}
      >
        <ContestingCandidatesPdfDownloadModal closeModal={closeModal} />
      </Modal>
    </div>
  );
}

export default ContestingCandidatesList;
