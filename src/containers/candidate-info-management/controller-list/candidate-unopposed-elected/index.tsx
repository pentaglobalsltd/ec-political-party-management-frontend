import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { DownloadButtons, Table, Text } from '@pentabd/ui';

import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { useNominationList } from '@hooks/candidate-info-management/nomination-list/useNominationList';
import { useCandidateInformation } from '@hooks/candidate-info-management/nomination-list/useCandidateInformation';
import { useNominationStepsForQuery } from '@hooks/miscellaneous/custom-hook/useNominationStepForQuery';
import { useElectionApplicantUpdate } from '@hooks/candidate-info-management/controller-list/useElectionApplicantUpdate';

import { USER_TYPES } from '@constants/user-types';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import { UNOPPOSED_ELECTED_CODES } from '@constants/nomination-status-codes';
import {
  allSelectedData,
  searchStructAdmin,
  searchStructElectionUser,
} from './searchConstants';
import {
  unopposedElectedBreadcrumbs,
  unopposedElectedTableColumns,
} from './constants';
import {
  NominationListSearchProps,
  NominationType,
} from '@type/candidate-info-management/nomination-list-type';
import { getParams } from '@utils/index';
import SearchInput, {
  CallbackParamObjType,
} from '../candidate-management/components/SearchInput';
import { HeaderComponentCMS } from '@containers/candidate-info-management/components/header';
import { CMSRoSearch } from '@containers/candidate-info-management/components/CMSRoSearch';
import { STEPS } from '@constants/steps';

const CandidateUnopposedElected = () => {
  const { t } = useTranslation();
  const stepId = STEPS.ELECTED_UNOPPOSED;

  const { keycloak } = useAuthWrapper();
  const userType = keycloak.tokenParsed?.userType;

  const [searchItems, setSearchItems] = useState<NominationListSearchProps>({});
  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const [isTableVisible, setIsTableVisible] = useState<boolean>(true);

  const { filterStatuses } = useNominationStepsForQuery({
    stepId: 6,
    filterStatus: true,
  });

  // for Post request
  const {
    electionApplicantUpdate,
    success: updateSuccess,
    loading: updateLoading,
  } = useElectionApplicantUpdate();

  // for Table data get request
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

  // for Table downloads (Print / CSV)
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

  const onSubmitSearch = (data: NominationListSearchProps) => {
    setSearchItems(data);

    if (userType === USER_TYPES.ADMIN) {
      getCandidateInformation({
        searchItems: data,
      });
    } else {
      if (data?.electionSettingsId)
        getNominationListData({
          searchItems: data,
        });
    }
  };

  // for Table downloads (Print / CSV)
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

  // for Table row button action
  const onClickDelete = (row: NominationType) => {
    electionApplicantUpdate({
      electionSettingsId: row?.electionSettingsId as number,
      candidateElectionDetailsId: row?.candidateElectionDetailsId as number,
      data: {
        id: row?.electionApplicantId as number,
        nominationStatusId: row?.isSelfNomination
          ? (UNOPPOSED_ELECTED_CODES.ACCEPT as number)
          : (UNOPPOSED_ELECTED_CODES.SELECTION_CANCELLED as number),
        candidateElectionDetailsId: row?.candidateElectionDetailsId as number,
      },
    });
  };

  // for Table row button action
  const onClickElectUnopposed = (row?: NominationType) => {
    electionApplicantUpdate({
      electionSettingsId: row?.electionSettingsId as number,
      candidateElectionDetailsId: row?.candidateElectionDetailsId as number,
      data: {
        id: row?.electionApplicantId as number,
        nominationStatusId: UNOPPOSED_ELECTED_CODES.DELETE as number,
        candidateElectionDetailsId: row?.candidateElectionDetailsId as number,
      },
    });
  };

  // Table only visible if noOfCandidates <= 1
  useEffect(() => {
    if (userType === USER_TYPES.ADMIN) {
      // for noOfCandidates <= 1, show table. else show Note
      if (candidateInformation?.length > 1) setIsTableVisible(false);
      else setIsTableVisible(true);
    } else {
      if (nominationList?.length > 1) setIsTableVisible(false);
      else setIsTableVisible(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nominationList, candidateInformation]);

  // for Page refresh (Election users)
  useEffect(() => {
    if (
      userType !== USER_TYPES.ADMIN &&
      Object.keys(params).length > 0 &&
      params?.electionSettingsId
    ) {
      getNominationListData({
        page: params?.page ? parseInt(params.page, 10) : 0,
        searchItems: params,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType, updateSuccess]);

  // for Page refresh (Admin)
  useEffect(() => {
    if (userType === USER_TYPES.ADMIN && Object.keys(params).length > 0) {
      getCandidateInformation({
        page: params?.page ? parseInt(params.page, 10) : 0,
        searchItems: params,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType, updateSuccess]);

  const handleTableSearch = (obj: CallbackParamObjType) => {
    if (userType === USER_TYPES.ADMIN) getCandidateInformation(obj);
    else
      getNominationListData({
        ...obj,
      });
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
        breadcrumbs={unopposedElectedBreadcrumbs(t)}
        headerText="UNOPPOSED_ELECTED.UNOPPOSED_ELECTED"
      />
      <CMSRoSearch
        allSelectedData={allSelectedData}
        searchStructAdmin={searchStructAdmin}
        searchStructElectionUser={searchStructElectionUser}
        setSearchParams={setSearchParams}
        callback={getNominationListData}
        nominationStatusCodes={filterStatuses || ''}
        onSubmitSearch={onSubmitSearch}
        stepId={stepId.toString()}
      />

      {isTableVisible ? (
        <Table
          headerExtension={{
            leftComponents: [<SearchInput callback={handleTableSearch} />],
            rightComponents: [
              <DownloadButtons
                key={2}
                fileName="reserved-ward-list"
                columns={unopposedElectedTableColumns({
                  t,
                  isDownload: true,
                  onClickDelete,
                  onClickElectUnopposed,
                  updateLoading,
                  params,
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
          columns={unopposedElectedTableColumns({
            t,
            onClickDelete,
            onClickElectUnopposed,
            updateLoading,
            params,
          })}
          rows={
            userType === USER_TYPES.ADMIN
              ? candidateInformation
              : nominationList
          }
          pagination={{
            totalPage:
              userType === USER_TYPES.ADMIN ? adminTotalPage : totalPage,
            activePage:
              userType === USER_TYPES.ADMIN ? adminActivePage : activePage,
            onClick: (page: number) => paginationOnClick(page),
          }}
          loading={
            userType === USER_TYPES.ADMIN
              ? adminLoading || updateLoading
              : loading || updateLoading
          }
          loadingItemCount={1}
        />
      ) : (
        <div className="d-flex justify-content-center px-8 py-6 my-4 bg-danger-lightest border border-danger rounded-5 notification-container">
          <Text size="sm" weight="semibold" className=" lh-sm text-danger px-4">
            {t('UNOPPOSED_ELECTED.UNOPPOSED_ELECTED_NOTIFICATION')}
          </Text>
        </div>
      )}
    </div>
  );
};

export default CandidateUnopposedElected;
