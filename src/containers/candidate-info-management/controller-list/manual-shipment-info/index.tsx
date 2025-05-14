import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { DownloadButtons, Table } from '@pentabd/ui';

import { USER_TYPES } from '@constants/user-types';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';

import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { useNominationList } from '@hooks/candidate-info-management/nomination-list/useNominationList';
import { useCandidateElectionFullDetailsListAdmin } from '@hooks/candidate-info-management/nomination-list/useCandidateElectionFullDetailsList';
import { NominationListSearchProps } from '@type/candidate-info-management/nomination-list-type';
import { getParams } from '@utils';

import {
  MANUAL_PAYMENT_TYPE,
  manualShipmentTableBreadcrumbs,
  manualShipmentTableColumns,
} from './constants';
import {
  allSelectedData,
  searchStruct,
  searchStructElectionUser,
} from './searchConstants';
import SearchInput, {
  CallbackParamObjType,
} from '../candidate-management/components/SearchInput';
import { HeaderComponentCMS } from '@containers/candidate-info-management/components/header';
import { CMSRoSearch } from '@containers/candidate-info-management/components/CMSRoSearch';

export default function ManualShipmentInfo() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);
  const { keycloak } = useAuthWrapper();

  const userType = keycloak.tokenParsed?.userType;

  const [searchItems, setSearchItems] = useState<NominationListSearchProps>({});
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

  useEffect(() => {
    if (userType === USER_TYPES.ADMIN && Object.keys(params).length > 0) {
      getCandidateElectionFullDetailsListAdminData({
        page: params?.page ? parseInt(params.page, 10) : 0,
        searchItems: params,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType]);

  const onSubmitSearch = (data: NominationListSearchProps) => {
    setSearchItems(data);
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
    if (userType !== USER_TYPES.ADMIN) {
      downloadGetNominationListData({
        searchItems,
        size: MAX_ROW_SIZE,
      });
    } else {
      downloadGetCandidateElectionFullDetailsListAdminData({
        searchItems,
        size: MAX_ROW_SIZE,
      });
    }
  };

  const handleTableSearch = (obj: CallbackParamObjType) => {
    if (userType === USER_TYPES.ADMIN)
      getCandidateElectionFullDetailsListAdminData(obj);
    else
      getNominationListData({
        ...obj,
      });
  };

  const tableHeaderExt = {
    leftComponents: [<SearchInput callback={handleTableSearch} />],
    rightComponents: [
      <DownloadButtons
        key={1}
        fileName={'manual-invoice-list'}
        columns={manualShipmentTableColumns({
          t,
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
      getCandidateElectionFullDetailsListAdminData({
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
        breadcrumbs={manualShipmentTableBreadcrumbs(t)}
        headerText="MANUAL_SHIPMENT_INFO.MANUAL_SHIPMENT_INFO"
      />
      <CMSRoSearch
        allSelectedData={allSelectedData}
        searchStructAdmin={searchStruct}
        searchStructElectionUser={searchStructElectionUser}
        setSearchParams={setSearchParams}
        callback={getNominationListData}
        nominationStatusCodes=""
        onSubmitSearch={onSubmitSearch}
        paymentType={MANUAL_PAYMENT_TYPE}
      />

      <Table
        headerExtension={tableHeaderExt}
        rows={
          userType === USER_TYPES.ADMIN
            ? candidateElectionFullDetailsListAdminList || []
            : nominationList || []
        }
        columns={manualShipmentTableColumns({ t })}
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
