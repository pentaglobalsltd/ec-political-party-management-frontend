import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { DownloadButtons, TableSecondary } from '@pentabd/ui';

import SecondaryTableRow from './components/SecondaryTableRow';

import { STEPS } from '@constants/steps';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import { USER_TYPES } from '@constants/user-types';
import { getSelectionBreadcrumbs, selectionTableColumns } from './constants';
import {
  allSelectedData,
  searchStruct,
  searchStructElectionUser,
} from './searchConstants';
import { useCandidateElectionFullDetailsListAdmin } from '@hooks/candidate-info-management/nomination-list/useCandidateElectionFullDetailsList';
import { useNominationList } from '@hooks/candidate-info-management/nomination-list/useNominationList';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { useNominationStepsForQuery } from '@hooks/miscellaneous/custom-hook/useNominationStepForQuery';
import { NominationListSearchProps } from '@type/candidate-info-management/nomination-list-type';
import { getParams } from '@utils';
import {
  SelectionValidationDataType,
  selectionValidation,
} from '@validations/candidate-info-management/controller-list/selection/selectionValidation';
import SearchInput, {
  CallbackParamObjType,
} from '../candidate-management/components/SearchInput';
import { HeaderComponentCMS } from '@containers/candidate-info-management/components/header';
import { SelfNominationOnlineSearch } from '@containers/candidate-info-management/components/SelfNominationOnlineSearch';

const Selection = () => {
  const { t } = useTranslation();
  const { keycloak } = useAuthWrapper();
  const userType = keycloak.tokenParsed?.userType;

  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);
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

  const stepId = STEPS.PICK_UP;
  const { filterStatuses } = useNominationStepsForQuery({
    stepId,
    filterStatus: true,
  });

  const methods = useForm<SelectionValidationDataType>({
    resolver: yupResolver(selectionValidation) as any,
  });

  const {
    register,
    control,
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

  const onSubmitSearch = (data: NominationListSearchProps) => {
    data.isSelfNomination = false;
    setSearchItems(data);
    if (userType === USER_TYPES.ADMIN) {
      getCandidateElectionFullDetailsListAdminData({
        page: params?.page ? parseInt(params.page, 10) : 0,
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
        searchItems: { ...params },
      });
    } else {
      getNominationListData({
        page: params?.page ? parseInt(params.page, 10) : 0,
        searchItems: { ...params },
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

  const handleTableSearch = (obj: CallbackParamObjType) => {
    if (userType === USER_TYPES.ADMIN) {
      getCandidateElectionFullDetailsListAdminData(obj);
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
        key={1}
        fileName={'selection table'}
        columns={selectionTableColumns({
          t,
          selectionTable: 'SELECTION.TABLE_COLUMN',
          params,
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
        breadcrumbs={getSelectionBreadcrumbs(t)}
        headerText="SELECTION.SECTION_HEADER"
      />

      <SelfNominationOnlineSearch
        allSelectedData={allSelectedData}
        searchStructAdmin={searchStruct}
        searchStructElectionUser={searchStructElectionUser}
        setSearchParams={setSearchParams}
        callback={getNominationListData}
        stepId={stepId.toString()}
        nominationStatusCodes={filterStatuses || ''}
        onSubmitSearch={onSubmitSearch}
        isSelfNomination={false}
      />

      <FormProvider {...methods}>
        <form>
          <TableSecondary
            columns={selectionTableColumns({
              t,
              selectionTable: 'SELECTION.TABLE_COLUMN',
              params,
            })}
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
                      index={item.candidateElectionDetailsId || 0}
                      item={item}
                      control={control}
                      errors={errors}
                      register={register}
                      values={getValues()}
                      callbackRowSubmit={callbackRowSubmit}
                    />
                  ),
                )
              : nominationList.map((item, index) => (
                  <SecondaryTableRow
                    key={index}
                    index={item.candidateElectionDetailsId || 0}
                    item={item}
                    control={control}
                    errors={errors}
                    register={register}
                    values={getValues()}
                    callbackRowSubmit={callbackRowSubmit}
                  />
                ))}
          </TableSecondary>
        </form>
      </FormProvider>
    </div>
  );
};

export default Selection;
