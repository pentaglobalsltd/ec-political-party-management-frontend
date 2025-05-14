import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { DownloadButtons, Table } from '@pentabd/ui';

import { STEPS } from '@constants/steps';
import { ROUTES } from '@constants/routes';
import { USER_TYPES } from '@constants/user-types';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import {
  candidateConfirmationBreadcrumbs,
  candidateConfirmationTableColumns,
} from './constants';
import {
  allSelectedData,
  searchStruct,
  searchStructElectionUser,
} from './searchConstants';

import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { useNominationList } from '@hooks/candidate-info-management/nomination-list/useNominationList';
import { useNominationStepsForQuery } from '@hooks/miscellaneous/custom-hook/useNominationStepForQuery';
import { useCandidateElectionFullDetailsListAdmin } from '@hooks/candidate-info-management/nomination-list/useCandidateElectionFullDetailsList';
import { NominationListSearchProps } from '@type/candidate-info-management/nomination-list-type';
import { getParams } from '@utils';
import SearchInput, {
  CallbackParamObjType,
} from '../candidate-management/components/SearchInput';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { HeaderComponentCMS } from '@containers/candidate-info-management/components/header';
import { CMSRoSearch } from '@containers/candidate-info-management/components/CMSRoSearch';

const CandidateConfirmation = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { keycloak } = useAuthWrapper();

  const userType = keycloak.tokenParsed?.userType;

  const { isAdmin } = useFiltersRedux();

  const stepId = STEPS.CANDIDATE_CONFIRMATION;
  const {
    nominationList,
    loading,
    getNominationListData,
    activePage,
    totalPage,
  } = useNominationList();

  const {
    candidateElectionFullDetailsListAdminList,
    getCandidateElectionFullDetailsListAdminData,
    adminActivePage,
    adminLoading,
    adminTotalPage,
  } = useCandidateElectionFullDetailsListAdmin();

  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const { filterStatuses } = useNominationStepsForQuery({
    stepId,
    filterStatus: true,
  });
  const handleButton = (data: any) => {
    const {
      electionSettingsId,
      candidateElectionDetailsId,
      electionTypeId,
      candidateTypeId,
    } = data;
    navigate(
      ROUTES.VIEW_CANDIDATE_CONFIRMATION({
        electionSettingsId,
        candidateElectionDetailsId,
        candidateId: data?.electionApplicantId,
        electionTypeId,
        candidateTypeId,
      }),
    );
  };

  useEffect(() => {
    if (
      Object.keys(params).length > 0 &&
      params?.electionSettingsId &&
      userType !== USER_TYPES.ADMIN
    ) {
      getNominationListData({
        page: params?.page ? parseInt(params.page, 10) : 0,
        searchItems: { ...params },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType]);

  useEffect(() => {
    if (userType === USER_TYPES.ADMIN && Object.keys(params).length > 0) {
      getCandidateElectionFullDetailsListAdminData({
        page: params?.page ? parseInt(params.page, 10) : 0,
        searchItems: { ...params },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType]);

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
  };

  // ------------------------------

  const {
    nominationList: downloadNominationList,
    loading: downloadLoading,
    getNominationListData: downloadGetNominationListData,
  } = useNominationList();

  const {
    candidateElectionFullDetailsListAdminList:
      downloadCandidateElectionFullDetailsListAdminList,
    adminLoading: downloadAdminLoading,
    getCandidateElectionFullDetailsListAdminData:
      downloadGetCandidateElectionFullDetailsListAdminData,
  } = useCandidateElectionFullDetailsListAdmin();

  const onClickDownload = () => {
    if (userType !== USER_TYPES.ADMIN && params?.electionSettingsId) {
      downloadGetNominationListData({
        searchItems: {
          ...params,
        },
        size: MAX_ROW_SIZE,
      });
    } else {
      downloadGetCandidateElectionFullDetailsListAdminData({
        searchItems: {
          ...params,
        },
        size: MAX_ROW_SIZE,
      });
    }
  };

  const paginationOnClick = (page: number) => {
    if (userType === USER_TYPES.ADMIN) {
      getCandidateElectionFullDetailsListAdminData({
        page: page - 1,
        searchItems: params,
      });
    } else {
      getNominationListData({
        page: page - 1,
        searchItems: params,
      });
    }
    setSearchParams({ ...params, page: (page - 1).toString() });
  };

  const handleTableSearch = (obj: CallbackParamObjType) => {
    if (userType === USER_TYPES.ADMIN)
      getCandidateElectionFullDetailsListAdminData(obj);
    else
      getNominationListData({
        ...obj,
      });
  };

  return (
    <div className="container-96 mb-24">
      <HeaderComponentCMS
        breadcrumbs={candidateConfirmationBreadcrumbs(t)}
        headerText="CANDIDATE_CONFIRMATION.CANDIDATE_CONFIRMATION"
        subHeaderText="CANDIDATE_CONFIRMATION.CANDIDATE_CONFIRMATION_SUBTITLE"
      />
      <CMSRoSearch
        allSelectedData={allSelectedData}
        searchStructAdmin={searchStruct}
        searchStructElectionUser={searchStructElectionUser}
        setSearchParams={setSearchParams}
        callback={getNominationListData}
        stepId={stepId.toString()}
        nominationStatusCodes={filterStatuses || ''}
        onSubmitSearch={onSubmitSearch}
      />

      <Table
        headerExtension={{
          leftComponents: [<SearchInput callback={handleTableSearch} />],
          rightComponents: [
            <DownloadButtons
              key={2}
              fileName={'candidates-confirmation-list'}
              columns={candidateConfirmationTableColumns({
                t,
                handleButton,
                stepId,
                params,
                isDownload: true,
                isAdmin,
              })}
              rows={
                userType === USER_TYPES.ADMIN
                  ? downloadCandidateElectionFullDetailsListAdminList || []
                  : downloadNominationList || []
              }
              onClickDownload={onClickDownload}
              downloadLoading={
                userType === USER_TYPES.ADMIN
                  ? downloadAdminLoading
                  : downloadLoading
              }
            />,
          ],
        }}
        rows={
          userType === USER_TYPES.ADMIN
            ? candidateElectionFullDetailsListAdminList || []
            : nominationList || []
        }
        columns={candidateConfirmationTableColumns({
          t,
          handleButton,
          stepId,
          params,
          isAdmin,
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
};
export default CandidateConfirmation;
