import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { Button, Header, Table } from '@pentabd/ui';
import { IconDownloadCloud02 } from '@pentabd/icons';

import { SearchComponents } from '@components/application-search/SearchComponents';

import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { useNominationList } from '@hooks/candidate-info-management/nomination-list/useNominationList';
import { useCandidateElectionFullDetailsListAdmin } from '@hooks/candidate-info-management/nomination-list/useCandidateElectionFullDetailsList';

import { USER_TYPES } from '@constants/user-types';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
import { REPORT_NOMINATION_STATUS_CODES } from '@constants/nomination-status-codes';
import {
  contendingCandidatesNumberTableHeader,
  contendingCandidatesNumberTableColumns,
  contendingCandidatesNumberTableBreadcrumbs,
} from './constants';
import {
  allSelectedData,
  searchStruct,
  searchStructElectionUser,
} from './searchConstants';
import { NominationListSearchProps } from '@type/candidate-info-management/nomination-list-type';
import { getParams } from '@utils';

function ContendingCandidatesNumber() {
  const { t } = useTranslation();

  const { keycloak } = useAuthWrapper();
  const userType = keycloak.tokenParsed?.userType;

  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

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
      REPORT_NOMINATION_STATUS_CODES.CONTENDING_CANDIDATES_NUMBER;

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

  return (
    <div className="container-96 mb-24 mb-20">
      <Header
        className="mb-10 pt-10"
        headerText={{
          header: t(
            'CONTENDING_CANDIDATES_NUMBER.REJECTED_CONTENDING_CANDIDATES_NUMBER',
          ),
        }}
        breadcrumbs={contendingCandidatesNumberTableBreadcrumbs(t)}
        actions={[
          <Button key={1} type="primary" htmlType="button" size="sm">
            <IconDownloadCloud02 fill="light" size="20" />{' '}
            {t('CONTENDING_CANDIDATES_NUMBER.DOWNLOAD')}
          </Button>,
        ]}
      />

      {userType === USER_TYPES.ADMIN && (
        <SearchComponents
          struct={searchStruct}
          selectAny
          allSelectedData={allSelectedData}
          onSubmitHandler={onSubmitSearch}
        />
      )}

      {userType === USER_TYPES.RETURNING_OFFICER && (
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
      )}

      <Table
        headerExtension={contendingCandidatesNumberTableHeader}
        rows={
          userType === USER_TYPES.ADMIN
            ? candidateElectionFullDetailsListAdminList || []
            : nominationList || []
        }
        columns={contendingCandidatesNumberTableColumns(t)}
        pagination={{
          language: 'bn',
          totalPage: userType === USER_TYPES.ADMIN ? adminTotalPage : totalPage,
          activePage:
            userType === USER_TYPES.ADMIN ? adminActivePage : activePage,
          onClick: (page: number) => {
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
          },
        }}
        loading={userType === USER_TYPES.ADMIN ? adminLoading : loading}
        loadingItemCount={10}
      />
    </div>
  );
}

export default ContendingCandidatesNumber;
