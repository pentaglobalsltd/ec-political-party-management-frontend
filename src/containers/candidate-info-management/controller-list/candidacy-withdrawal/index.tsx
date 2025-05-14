import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { DownloadButtons, TableSecondary } from '@pentabd/ui';

import SecondaryTableRow from './SecondaryTableRow';

import { STEPS } from '@constants/steps';
import { USER_TYPES } from '@constants/user-types';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import {
  candidacyWithdrawalBreadcrumbs,
  candidacyWithdrawalTableColumns,
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
import {
  CandidacyWithdrawalValidationDataType,
  candidacyWithdrawalValidation,
} from '@validations/candidate-info-management/controller-list/withdrawal-of-candidature/withdrawalOfCandidatureValidation';
import { getParams } from '@utils';

import SearchInput, {
  CallbackParamObjType,
} from '../candidate-management/components/SearchInput';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { HeaderComponentCMS } from '@containers/candidate-info-management/components/header';
import { CMSRoSearch } from '@containers/candidate-info-management/components/CMSRoSearch';

const CandidacyWithdrawal = () => {
  const { t } = useTranslation();

  const { keycloak } = useAuthWrapper();

  const userType = keycloak.tokenParsed?.userType;

  const { isAdmin } = useFiltersRedux();

  const [pageNo, setPageNo] = useState(0);

  const [searchItems, setSearchItems] = useState<NominationListSearchProps>({});
  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const stepId = STEPS.WITHDRAWAL_OF_CANDIDATURE;

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

  const { filterStatuses, availableStatuses } = useNominationStepsForQuery({
    stepId,
    filterStatus: true,
    availableStatus: true,
  });

  const methods = useForm<CandidacyWithdrawalValidationDataType>({
    resolver: yupResolver(candidacyWithdrawalValidation) as any,
  });

  const {
    register,
    getValues,
    formState: { errors },
  } = methods;

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
      getCandidateElectionFullDetailsListAdminData({
        page: params?.page ? parseInt(params.page, 10) : 0,
        searchItems: params,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType]);

  const callbackRowSubmit = () => {
    if (userType === USER_TYPES.ADMIN) {
      getCandidateElectionFullDetailsListAdminData({
        page: params?.page ? parseInt(params.page, 10) : 0,
        searchItems: { ...params },
      });
    } else {
      getNominationListData({
        page: params?.page ? parseInt(params.page, 10) : 0,
        searchItems: { ...params },
      });
    }
  };
  const onSubmitSearch = (data: NominationListSearchProps) => {
    setSearchItems(data);
    if (userType === USER_TYPES.ADMIN) {
      getCandidateElectionFullDetailsListAdminData({
        page: pageNo,
        searchItems: data,
      });
    } else {
      if (data?.electionSettingsId)
        getNominationListData({
          page: pageNo,
          searchItems: data,
        });
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
    if (userType === USER_TYPES.ADMIN) {
      getCandidateElectionFullDetailsListAdminData(obj);
    } else
      getNominationListData({
        ...obj,
      });
  };

  const tableHeaderExt = {
    leftComponents: [<SearchInput callback={handleTableSearch} />],
    rightComponents: [
      <DownloadButtons
        key={2}
        fileName={'candidate withdrawal table'}
        columns={candidacyWithdrawalTableColumns({
          t,
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
          userType === USER_TYPES.ADMIN ? downloadAdminLoading : downloadLoading
        }
      />,
    ],
  };

  const paginationOnClick = (page: number) => {
    if (userType === USER_TYPES.ADMIN) {
      getCandidateElectionFullDetailsListAdminData({
        page: page - 1,
        searchItems: { ...searchItems, ...params },
      });
    } else if (userType !== USER_TYPES.ADMIN && params?.electionSettingsId) {
      getNominationListData({
        page: page - 1,
        searchItems: { ...searchItems, ...params },
      });
    }
    setPageNo(page - 1);
    setSearchParams({ ...params, page: (page - 1).toString() });
  };

  return (
    <div className="container-96 mb-24">
      <HeaderComponentCMS
        breadcrumbs={candidacyWithdrawalBreadcrumbs(t)}
        headerText="CANDIDACY_WITHDRAWAL.CANDIDACY_WITHDRAWAL"
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

      <FormProvider {...methods}>
        <form className="pb-10">
          <TableSecondary
            columns={candidacyWithdrawalTableColumns({ t, params, isAdmin })}
            headerExtension={tableHeaderExt}
            loading={userType === USER_TYPES.ADMIN ? adminLoading : loading}
            loadingItemCount={10}
            pagination={{
              totalPage:
                userType === USER_TYPES.ADMIN ? adminTotalPage : totalPage,
              activePage:
                userType === USER_TYPES.ADMIN ? adminActivePage : activePage,
              onClick: (page: number) => paginationOnClick(page),
            }}
          >
            {userType === USER_TYPES.ADMIN
              ? candidateElectionFullDetailsListAdminList?.map(
                  (item, index) => (
                    <SecondaryTableRow
                      key={index}
                      index={index}
                      item={item}
                      errors={errors}
                      register={register}
                      getValues={getValues}
                      callbackRowSubmit={callbackRowSubmit}
                      availableStatuses={availableStatuses}
                      isAdmin={isAdmin}
                    />
                  ),
                )
              : nominationList?.map((item, index) => (
                  <SecondaryTableRow
                    key={index}
                    index={index}
                    item={item}
                    errors={errors}
                    register={register}
                    getValues={getValues}
                    callbackRowSubmit={callbackRowSubmit}
                    availableStatuses={availableStatuses}
                    isAdmin={isAdmin}
                  />
                ))}
          </TableSecondary>
        </form>
      </FormProvider>
    </div>
  );
};

export default CandidacyWithdrawal;
