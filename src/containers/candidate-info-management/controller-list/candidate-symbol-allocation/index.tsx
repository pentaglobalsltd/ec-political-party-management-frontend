import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { DownloadButtons, TableSecondary } from '@pentabd/ui';

import SecondaryTableRow from './components/SecondaryTableRow';

import { STEPS } from '@constants/steps';
import { USER_TYPES } from '@constants/user-types';
import { FORM_FIELDS } from '@constants/forms';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import {
  symbolAllocationBreadcrumbs,
  symbolAllocationTableColumns,
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
import {
  SymbolAllocationValidationDataType,
  symbolValidationSchema,
} from '@validations/candidate-info-management/controller-list/symbol-allocation/symbolAllocationValidation';
import { NominationListSearchProps } from '@type/candidate-info-management/nomination-list-type';
import { getParams } from '@utils';
import SearchInput, {
  CallbackParamObjType,
} from '../candidate-management/components/SearchInput';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { HeaderComponentCMS } from '@containers/candidate-info-management/components/header';
import { CMSRoSearch } from '@containers/candidate-info-management/components/CMSRoSearch';

export const ALLOCATION_TABLE =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.SYMBOL_ALLOCATION
    .ALLOCATION_TABLE;

const SymbolAllocation = () => {
  const { t } = useTranslation();

  const { keycloak } = useAuthWrapper();

  const userType = keycloak.tokenParsed?.userType;

  const { isAdmin } = useFiltersRedux();

  const [searchItems, setSearchItems] = useState<NominationListSearchProps>({});
  const stepId = STEPS.SYMBOL_ALLOCATION;
  const { filterStatuses, availableStatuses } = useNominationStepsForQuery({
    stepId,
    filterStatus: true,
    availableStatus: true,
  });
  const {
    nominationList,
    getNominationListData,
    loading,
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

  const methods = useForm<SymbolAllocationValidationDataType>({
    resolver: yupResolver(symbolValidationSchema) as any,
  });

  const {
    register,
    getValues,
    formState: { errors },
    setValue,
  } = methods;

  const onSubmitSearch = (data: NominationListSearchProps) => {
    data.candidateSerialOrder = true;

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

  const callbackRowSubmit = () => {
    if (userType === USER_TYPES.ADMIN) {
      getCandidateElectionFullDetailsListAdminData({
        page: params?.page ? parseInt(params.page, 10) : 0,
        searchItems: {
          ...params,
          candidateSerialOrder: true,
        },
      });
    } else {
      getNominationListData({
        page: params?.page ? parseInt(params.page, 10) : 0,
        searchItems: { ...params, candidateSerialOrder: true },
      });
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
        searchItems: { ...params, candidateSerialOrder: true },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType]);

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
        searchItems: {
          ...params,
          candidateSerialOrder: true,
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
  useEffect(() => {
    if (userType === USER_TYPES.ADMIN && Object.keys(params).length > 0) {
      getCandidateElectionFullDetailsListAdminData({
        page: params?.page ? parseInt(params.page, 10) : 0,
        searchItems: { ...params, candidateSerialOrder: true },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType]);

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
        key={13}
        fileName={'symbol allocation table'}
        columns={symbolAllocationTableColumns({
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
        breadcrumbs={symbolAllocationBreadcrumbs(t)}
        headerText="SYMBOL_ALLOCATION.SYMBOL_ALLOCATION"
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
        <form className="mb-20">
          <TableSecondary
            columns={symbolAllocationTableColumns({ t, params, isAdmin })}
            headerExtension={tableHeaderExt}
            loading={userType === USER_TYPES.ADMIN ? adminLoading : loading}
            loadingItemCount={10}
            pagination={{
              language: 'bn',
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
                      register={register}
                      values={getValues()}
                      errors={errors}
                      availableStatuses={availableStatuses as number}
                      callbackRowSubmit={callbackRowSubmit}
                      setValue={setValue}
                      candidateTypeId={params?.candidateTypeId}
                      isAdmin={isAdmin}
                    />
                  ),
                )
              : nominationList?.map((item, index) => (
                  <SecondaryTableRow
                    key={index}
                    index={index}
                    item={item}
                    register={register}
                    values={getValues()}
                    errors={errors}
                    availableStatuses={availableStatuses as number}
                    callbackRowSubmit={callbackRowSubmit}
                    setValue={setValue}
                    candidateTypeId={params?.candidateTypeId}
                    isAdmin={isAdmin}
                  />
                ))}
          </TableSecondary>
        </form>
      </FormProvider>
    </div>
  );
};

export default SymbolAllocation;
