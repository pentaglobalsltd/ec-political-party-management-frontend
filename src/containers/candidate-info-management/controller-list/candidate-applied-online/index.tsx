import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { DownloadButtons, Table, encodeQuery } from '@pentabd/ui';

import { CANDIDATE_MANAGEMENT } from '@constants/permissions/candidate-management';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import { USER_TYPES } from '@constants/user-types';
import { ROUTES } from '@constants/routes';
import { STEPS } from '@constants/steps';
import {
  candidateAppliedOnlineBreadcrumbs,
  candidateAppliedOnlineTableColumns,
} from './constants';
import {
  allSelectedData,
  searchStructAdmin,
  searchStructElectionUser,
} from './searchConstants';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { useNominationList } from '@hooks/candidate-info-management/nomination-list/useNominationList';
import { useNominationStepsForQuery } from '@hooks/miscellaneous/custom-hook/useNominationStepForQuery';
import {
  NominationListSearchProps,
  NominationType,
} from '@type/candidate-info-management/nomination-list-type';
import { getParams } from '@utils';
import { useCandidateInformation } from '@hooks/candidate-info-management/nomination-list/useCandidateInformation';
import SearchInput, {
  CallbackParamObjType,
} from '../candidate-management/components/SearchInput';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { HeaderComponentCMS } from '@containers/candidate-info-management/components/header';
import { SelfNominationOnlineSearch } from '@containers/candidate-info-management/components/SelfNominationOnlineSearch';

const stepId = STEPS.ONLINE_NOMINATED_CANDIDATE_ACKNOWLEDGMENT;

const CandidateAppliedOnline = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { keycloak } = useAuthWrapper();

  const { isAdmin } = useFiltersRedux();

  const [searchItems, setSearchItems] = useState<NominationListSearchProps>({});
  const [isAccessible, setIsAccessible] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const permissionsArray = keycloak.realmAccess?.roles;
  const userType = keycloak.tokenParsed?.userType;

  useEffect(() => {
    if (permissionsArray?.includes(CANDIDATE_MANAGEMENT.E_ONLINE_NOMINATION)) {
      setIsAccessible(true);
    }
  }, [permissionsArray]);

  const params = getParams(searchParams);

  const { filterStatuses } = useNominationStepsForQuery({
    stepId,
    filterStatus: true,
  });

  const {
    nominationList,
    loading,
    getNominationListData,
    activePage,
    totalPage,
  } = useNominationList();

  const {
    candidateInformation,
    getCandidateInformation,
    adminActivePage,
    adminLoading,
    adminTotalPage,
  } = useCandidateInformation();

  const handleButton = (data: any) => {
    const {
      electionSettingsId,
      candidateElectionDetailsId,
      electionApplicantId,
      electionTypeId,
      candidateTypeId,
    } = data;

    navigate(
      ROUTES.EDIT_CANDIDATES_APPLIED_ONLINE({
        electionSettingsId,
        candidateElectionDetailsId,
        electionApplicantId,
        electionTypeId,
        candidateTypeId,
      }),
    );
  };

  const handleSummary = (data: NominationType) => {
    const {
      electionSettingsId,
      candidateElectionDetailsId,
      electionApplicantId,
      electionTypeId,
      candidateTypeId,
      electionScheduleId,
    } = data;

    navigate(
      ROUTES.CANDIDATES_APPLIED_ONLINE_SUMMARY({
        electionSettingsId,
        candidateElectionDetailsId,
        electionApplicantId,
        electionTypeId,
        candidateTypeId,
        scheduleId: electionScheduleId,
      }),
    );
  };

  const handleAttachmentView = (row: NominationType) => {
    const {
      electionSettingsId,
      candidateElectionDetailsId,
      electionApplicantId,
      nominationPercentage,
      electionTypeId,
      candidateTypeId,
    } = row;

    if (
      electionSettingsId &&
      candidateElectionDetailsId &&
      electionApplicantId &&
      nominationPercentage &&
      electionTypeId &&
      candidateTypeId
    ) {
      navigate(
        encodeQuery(
          ROUTES.VIEW_CANDIDATE_MANAGEMENT({
            electionSettingsId,
            candidateElectionDetailsId,
            electionApplicantId,
            electionTypeId,
            candidateTypeId,
          }),
          {
            nominationPercentage,
          },
        ),
      );
    }
  };

  useEffect(() => {
    if (
      Object.keys(params).length > 0 &&
      params?.electionSettingsId &&
      userType !== USER_TYPES.ADMIN
    ) {
      getNominationListData({
        page: params?.page ? parseInt(params.page, 10) : 0,
        searchItems: params,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType]);

  useEffect(() => {
    if (userType === USER_TYPES.ADMIN && Object.keys(params).length > 0) {
      getCandidateInformation({
        page: params?.page ? parseInt(params.page, 10) : 0,
        searchItems: params,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType]);

  const onSubmitSearch = (data: NominationListSearchProps) => {
    data.isSelfNomination = true;
    setSearchItems(data);

    if (userType === USER_TYPES.ADMIN) {
      getCandidateInformation({
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
    candidateInformation: downloadCandidateElectionFullDetailsListAdminList,
    adminLoading: downloadAdminLoading,
    getCandidateInformation:
      downloadGetCandidateElectionFullDetailsListAdminData,
  } = useCandidateInformation();

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

  const tableColumnsCommonInUiAndDownload = {
    t,
    handleButton,
    handleSummary,
    stepId,
    isAccessible,
    handleAttachmentView,
    params,
  };

  const handleTableSearch = (obj: CallbackParamObjType) => {
    if (userType === USER_TYPES.ADMIN) {
      getCandidateInformation(obj);
    } else {
      getNominationListData({
        ...obj,
      });
    }
  };

  const tableHeaderExt = {
    leftComponents: [<SearchInput callback={handleTableSearch} />],
    rightComponents: [
      <DownloadButtons
        key={2}
        fileName={'candidates-applied-online-list'}
        columns={candidateAppliedOnlineTableColumns({
          ...tableColumnsCommonInUiAndDownload,
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
          userType === USER_TYPES.ADMIN ? downloadAdminLoading : downloadLoading
        }
      />,
    ],
  };

  const paginationOnClick = (page: number) => {
    if (userType === USER_TYPES.ADMIN) {
      getCandidateInformation({
        page: page - 1,
        searchItems: { ...searchItems, ...params },
      });
    } else {
      getNominationListData({
        page: page - 1,
        searchItems: { ...searchItems, ...params },
      });
    }

    setSearchParams({ ...params, page: (page - 1).toString() });
  };

  return (
    <div className="container-96 mb-24">
      <HeaderComponentCMS
        breadcrumbs={candidateAppliedOnlineBreadcrumbs(t)}
        headerText="CANDIDATE_APPLIED_ONLINE.CANDIDATE_APPLIED_ONLINE"
      />
      <SelfNominationOnlineSearch
        allSelectedData={allSelectedData}
        searchStructAdmin={searchStructAdmin}
        searchStructElectionUser={searchStructElectionUser}
        setSearchParams={setSearchParams}
        callback={getNominationListData}
        stepId={stepId.toString()}
        nominationStatusCodes={filterStatuses || ''}
        onSubmitSearch={onSubmitSearch}
        isSelfNomination={true}
      />

      <Table
        headerExtension={tableHeaderExt}
        rows={
          userType === USER_TYPES.ADMIN ? candidateInformation : nominationList
        }
        columns={candidateAppliedOnlineTableColumns({
          ...tableColumnsCommonInUiAndDownload,
          isDownload: false,
          userType,
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

export default CandidateAppliedOnline;
