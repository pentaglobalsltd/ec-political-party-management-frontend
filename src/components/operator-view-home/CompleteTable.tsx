import { useEffect } from 'react';
import { DownloadButtons, Table, Text } from '@pentabd/ui';
import { useNominationList } from '@hooks/candidate-info-management/nomination-list/useNominationList';
import { useSearchParams } from 'react-router-dom';
import { getParams } from '@utils';
import { useCandidateElectionFullDetailsListAdmin } from '@hooks/candidate-info-management/nomination-list/useCandidateElectionFullDetailsList';
import { USER_TYPES } from '@constants/user-types';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import SearchInput, {
  CallbackParamObjType,
} from '@containers/candidate-info-management/controller-list/candidate-management/components/SearchInput';
import { PropsCompleteTable } from './types';

const CompleteTable = ({
  tableName,
  tableColumnsFn,
  queryParamsObj,
  downloadFileName,
}: PropsCompleteTable) => {
  const { keycloak } = useAuthWrapper();

  const userType = keycloak.tokenParsed?.userType;

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

  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  useEffect(() => {
    if (
      Object.keys(params).length > 0 &&
      params?.electionSettingsId &&
      userType !== USER_TYPES.ADMIN
    ) {
      getNominationListData({
        searchItems: {
          ...params,
          ...queryParamsObj,
          isSelfNomination: false,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    params?.candidateTypeId,
    params?.constituencyId,
    params?.electionScheduleId,
    params?.electionTypeId,
    params?.zillaId,
    params?.municipalityId,
    params?.upazilaThanaId,
    params?.unionOrWardId,
    params?.electionSettingsId,
  ]);

  useEffect(() => {
    if (userType === USER_TYPES.ADMIN && Object.keys(params).length > 0) {
      getCandidateElectionFullDetailsListAdminData({
        searchItems: {
          ...params,
          ...queryParamsObj,
          isSelfNomination: false,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    userType,
    params?.candidateTypeId,
    params?.constituencyId,
    params?.electionScheduleId,
    params?.electionTypeId,
    params?.zillaId,
    params?.municipalityId,
    params?.upazilaThanaId,
    params?.unionOrWardId,
  ]);

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
          ...queryParamsObj,
          isSelfNomination: false,
        },
        size: MAX_ROW_SIZE,
      });
    } else {
      downloadGetCandidateElectionFullDetailsListAdminData({
        searchItems: {
          ...params,
          ...queryParamsObj,
          isSelfNomination: false,
        },
        size: MAX_ROW_SIZE,
      });
    }
  };

  const handleTableSearch = (obj: CallbackParamObjType) => {
    const currentSearchItems = {
      ...obj.searchItems,
      ...queryParamsObj,
      isSelfNomination: false,
    };

    if (userType === USER_TYPES.ADMIN) {
      getCandidateElectionFullDetailsListAdminData({
        ...obj,
        searchItems: currentSearchItems,
      });
    } else {
      getNominationListData({
        ...obj,
        searchItems: currentSearchItems,
      });
    }
  };

  const tableHeaderExt = {
    leftComponents: [<SearchInput callback={handleTableSearch} />],
    rightComponents: [
      <DownloadButtons
        key={1}
        fileName={downloadFileName}
        columns={(tableColumnsFn && tableColumnsFn({ isDownload: true })) || []}
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

  return (
    <div className="mb-12">
      <div className="mb-7">
        <Text size="md" weight="bold">
          {tableName}
        </Text>
      </div>
      <Table
        headerExtension={tableHeaderExt}
        rows={
          userType === USER_TYPES.ADMIN
            ? candidateElectionFullDetailsListAdminList || []
            : nominationList || []
        }
        loading={userType === USER_TYPES.ADMIN ? adminLoading : loading}
        loadingItemCount={1}
        // columns={tableColumns}
        columns={
          (tableColumnsFn && tableColumnsFn({ isDownload: false })) || []
        }
        pagination={{
          language: 'bn',
          totalPage: userType === USER_TYPES.ADMIN ? adminTotalPage : totalPage,
          activePage:
            userType === USER_TYPES.ADMIN ? adminActivePage : activePage,
          onClick: (page) => {
            if (userType === USER_TYPES.ADMIN) {
              getCandidateElectionFullDetailsListAdminData({
                page: page - 1,
                searchItems: {
                  ...params,
                  ...queryParamsObj,
                  isSelfNomination: false,
                },
              });
            } else {
              getNominationListData({
                page: page - 1,
                searchItems: {
                  ...params,
                  ...queryParamsObj,
                  isSelfNomination: false,
                },
              });
            }
          },
        }}
      />
    </div>
  );
};

export default CompleteTable;
