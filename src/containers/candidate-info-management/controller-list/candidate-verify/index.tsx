import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { DownloadButtons, Table } from '@pentabd/ui';

import { STEPS } from '@constants/steps';
import { ROUTES } from '@constants/routes';
import { USER_TYPES } from '@constants/user-types';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import {
  candidateVerifyTableBreadcrumbs,
  candidateVerifyTableColumns,
} from './constants';
import {
  allSelectedData,
  searchStruct,
  searchStructElectionUser,
} from './searchConstants';

import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { useNominationList } from '@hooks/candidate-info-management/nomination-list/useNominationList';
import { useNominationStepsForQuery } from '@hooks/miscellaneous/custom-hook/useNominationStepForQuery';
import { NominationListSearchProps } from '@type/candidate-info-management/nomination-list-type';
import { getParams } from '@utils';
import { useCandidateInformation } from '@hooks/candidate-info-management/nomination-list/useCandidateInformation';
import SearchInput, {
  CallbackParamObjType,
} from '../candidate-management/components/SearchInput';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { HeaderComponentCMS } from '@containers/candidate-info-management/components/header';
import { CMSRoSearch } from '@containers/candidate-info-management/components/CMSRoSearch';

export default function CandidateVerify() {
  const { t } = useTranslation();
  const { keycloak } = useAuthWrapper();

  const userType = keycloak.tokenParsed?.userType;

  const { isAdmin } = useFiltersRedux();

  const navigate = useNavigate();
  const [searchItems, setSearchItems] = useState<NominationListSearchProps>({});

  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const stepId = STEPS.VERIFY;

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

  const { filterStatuses } = useNominationStepsForQuery({
    stepId,
    filterStatus: true,
  });

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
      getCandidateInformation({
        page: params?.page ? parseInt(params.page, 10) : 0,
        searchItems: { ...params },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType]);

  const handleButton = (data: any) => {
    const {
      electionSettingsId,
      candidateElectionDetailsId,
      electionTypeId,
      candidateTypeId,
    } = data;
    navigate(
      ROUTES.VIEW_CANDIDATE_VERIFY({
        electionSettingsId,
        candidateElectionDetailsId,
        candidateId: data?.electionApplicantId,
        electionTypeId,
        candidateTypeId,
      }),
    );
  };
  const onSubmitSearch = (data: NominationListSearchProps) => {
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
    if (userType !== USER_TYPES.ADMIN) {
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
    stepId,
    params,
    isAdmin,
  };

  const handleTableSearch = (obj: CallbackParamObjType) => {
    if (userType === USER_TYPES.ADMIN) getCandidateInformation(obj);
    else
      getNominationListData({
        ...obj,
      });
  };

  const tableHeaderExt = {
    // ...candidateVerifyTableHeader,
    leftComponents: [<SearchInput callback={handleTableSearch} />],
    rightComponents: [
      <DownloadButtons
        key={1}
        fileName={'candidate verify table'}
        columns={candidateVerifyTableColumns({
          ...tableColumnsCommonInUiAndDownload,
          isDownload: true,
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
    if (userType === USER_TYPES.ADMIN)
      getCandidateInformation({
        page: page - 1,
        searchItems: { ...searchItems, ...params },
      });
    else
      getNominationListData({
        page: page - 1,
        searchItems: { ...searchItems, ...params },
      });
    setSearchParams({ ...params, page: (page - 1).toString() });
  };

  return (
    <div className="container-96 mb-24">
      <HeaderComponentCMS
        breadcrumbs={candidateVerifyTableBreadcrumbs(t)}
        headerText="VERIFY.CANDIDATE_VERIFY_TITLE"
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
        headerExtension={tableHeaderExt}
        rows={
          userType === USER_TYPES.ADMIN
            ? candidateInformation || []
            : nominationList || []
        }
        columns={candidateVerifyTableColumns({
          ...tableColumnsCommonInUiAndDownload,
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
