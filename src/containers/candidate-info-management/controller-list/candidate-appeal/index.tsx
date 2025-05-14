import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { DownloadButtons, TableSecondary } from '@pentabd/ui';

import SecondaryTableRow from './components/SecondaryTableRow';

import { STEPS } from '@constants/steps';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import { appealBreadcrumbs, appealTableColumns } from './constants';
import {
  allSelectedData,
  searchStruct,
  searchStructElectionUser,
} from './searchConstants';
import { useNominationList } from '@hooks/candidate-info-management/nomination-list/useNominationList';
import { useNominationStepsForQuery } from '@hooks/miscellaneous/custom-hook/useNominationStepForQuery';
import { useCandidateElectionFullDetailsListAdmin } from '@hooks/candidate-info-management/nomination-list/useCandidateElectionFullDetailsList';
import { NominationListSearchProps } from '@type/candidate-info-management/nomination-list-type';
import { getParams } from '@utils';
import {
  AppealValidationDataType,
  appealValidation,
} from '@validations/candidate-info-management/controller-list/appeal/appealValidation';
import SearchInput, {
  CallbackParamObjType,
} from '../candidate-management/components/SearchInput';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { HeaderComponentCMS } from '@containers/candidate-info-management/components/header';
import { CMSRoSearch } from '@containers/candidate-info-management/components/CMSRoSearch';

const Appeal = () => {
  const { t } = useTranslation();

  const { isAdmin } = useFiltersRedux();

  const [searchItems, setSearchItems] = useState<NominationListSearchProps>({});
  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const stepId = STEPS.APPEAL;
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

  const { filterStatuses } = useNominationStepsForQuery({
    stepId,
    filterStatus: true,
  });

  const methods = useForm<AppealValidationDataType>({
    resolver: yupResolver(appealValidation) as any,
  });

  const {
    control,
    getValues,
    register,
    formState: { errors },
  } = methods;

  const onSubmitSearch = (data: NominationListSearchProps) => {
    setSearchItems(data);
    if (isAdmin) {
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
    if (isAdmin) {
      getCandidateElectionFullDetailsListAdminData({
        searchItems: params,
      });
    } else {
      getNominationListData({
        searchItems: params,
      });
    }
  };

  useEffect(() => {
    if (Object.keys(params).length > 0 && params?.electionSettingsId) {
      getNominationListData({
        page: params?.page ? parseInt(params.page, 10) : 0,
        searchItems: params,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isAdmin && Object.keys(params).length > 0) {
      getCandidateElectionFullDetailsListAdminData({
        page: params?.page ? parseInt(params.page, 10) : 0,
        searchItems: params,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

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
    if (!isAdmin) {
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
    if (isAdmin) {
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
        key={1}
        fileName={'appeal-list'}
        columns={appealTableColumns({ t, params, isDownload: true, isAdmin })}
        rows={
          isAdmin
            ? downloadCandidateElectionFullDetailsListAdminList || []
            : downloadNominationList || []
        }
        onClickDownload={onClickDownload}
        downloadLoading={isAdmin ? downloadAdminLoading : downloadLoading}
      />,
    ],
  };

  const paginationOnClick = (page: number) => {
    if (isAdmin)
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
        breadcrumbs={appealBreadcrumbs(t)}
        headerText="APPEAL.APPEAL"
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
        <form>
          <TableSecondary
            columns={appealTableColumns({ t, params, isAdmin })}
            headerExtension={tableHeaderExt}
            loading={isAdmin ? adminLoading : loading}
            loadingItemCount={10}
            pagination={{
              language: 'bn',
              totalPage: isAdmin ? adminTotalPage : totalPage,
              activePage: isAdmin ? adminActivePage : activePage,
              onClick: (page: number) => paginationOnClick(page),
            }}
          >
            {isAdmin
              ? candidateElectionFullDetailsListAdminList?.map(
                  (item, index) => (
                    <SecondaryTableRow
                      key={index}
                      index={index}
                      item={item}
                      control={control}
                      errors={errors}
                      register={register}
                      values={getValues()}
                      callbackRowSubmit={callbackRowSubmit}
                      isAdmin={isAdmin}
                    />
                  ),
                )
              : nominationList.map((item, index) => (
                  <SecondaryTableRow
                    key={index}
                    index={index}
                    values={getValues()}
                    item={item}
                    control={control}
                    register={register}
                    errors={errors}
                    callbackRowSubmit={callbackRowSubmit}
                    isAdmin={isAdmin}
                  />
                ))}
          </TableSecondary>
        </form>
      </FormProvider>
    </div>
  );
};

export default Appeal;
