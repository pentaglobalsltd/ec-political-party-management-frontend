import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { Header, Table } from '@pentabd/ui';

import { USER_TYPES } from '@constants/user-types';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import usePollingInstitutes from '@hooks/vote-center-management/center-management/polling-institute/usePollingInstitutes';
import { getParams } from '@utils';

import { VOTE_CENTER_MANAGEMENT as FORM_FIELDS } from '@constants/forms/vote-center-management/vote-center-management';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import { SearchComponents } from '@components/application-search/SearchComponents';
import { allSelectedData, searchStruct } from './searchConstants';
import { searchStructElectionUser } from './searchConstantsElectionUser';
import {
  pollingInstituteBreadcrumbs,
  pollingInstituteTableColumns,
} from './constant';
import CreateButton from './components/CreateButton';
import InputSearch from './components/InputSearch';
import PublishToAppButton from './components/PublishToAppButton';

export const POLLING_INSTITUTE =
  FORM_FIELDS.CENTER_MANAGEMENT.POLLING_INSTITUTE;

const PollingInstitute = () => {
  const { keycloak } = useAuthWrapper();
  const userType = keycloak.tokenParsed?.userType;

  const methods = useForm();
  const { watch } = methods;
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const {
    pollingInstitutes,
    getPollingInstitutesList,
    activePage,
    loading,
    totalPage,
  } = usePollingInstitutes();

  const {
    pollingInstitutes: downloadPollingInstitutes,
    getPollingInstitutesList: downloadGetPollingInstitutesList,
    loading: downloadLoading,
  } = usePollingInstitutes();

  const searchCenterWatch = watch(POLLING_INSTITUTE.SEARCH_POLLING_INSTITUTE);

  const onSubmitSearch = (data: any) => {
    getPollingInstitutesList({
      queryParams: {
        unionOrWardId: data.unionOrWardId,
        upazilaId: data.upazilaId,
        nameBn: searchCenterWatch,
      },
    });
    if (searchCenterWatch)
      setSearchParams({
        page: 0,
        ...data,
        nameBn: searchCenterWatch,
      });
    else setSearchParams({ page: 0, ...data });
  };

  const getPaginatedInstitutes = (page: number) => {
    // const { unionOrWardId } = params;

    setSearchParams({
      page: (page - 1).toString(),
      // unionOrWardId: params?.unionOrWardId,
      ...params,
    });

    getPollingInstitutesList({
      page: page - 1,
      queryParams: {
        unionOrWardId: params?.unionOrWardId,
        upazilaId: params?.upazilaId,
        nameBn: searchCenterWatch ? searchCenterWatch : params?.nameBn,
      },
    });
  };

  useEffect(() => {
    if (Object.keys(params).length > 0) {
      getPollingInstitutesList({
        page: Number(params?.page),
        queryParams: {
          unionOrWardId: params?.unionOrWardId,
          upazilaId: params?.upazilaId,
          nameBn: searchCenterWatch ? searchCenterWatch : params?.nameBn,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //for download
  const onClickDownload = () => {
    if (Object.keys(params).length > 0) {
      downloadGetPollingInstitutesList({
        queryParams: {
          ...params,
        },
        size: MAX_ROW_SIZE,
      });
    }
  };

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{
          header: t('POLLING_INSTITUTE.INSTITUTE_LIST_BREADCRUMB'),
        }}
        breadcrumbs={pollingInstituteBreadcrumbs(t)}
        actions={[<PublishToAppButton/>,<CreateButton />]}
      />

      {userType === USER_TYPES.ADMIN ? (
        <SearchComponents
          struct={searchStruct}
          allSelectedData={allSelectedData}
          onSubmitHandler={onSubmitSearch}
          requiredField={[SEARCH_FIELD_REQUIRED.UPAZILA_ID]}
        />
      ) : (
        <SearchComponents
          struct={searchStructElectionUser()}
          allSelectedData={allSelectedData}
          onSubmitHandler={onSubmitSearch}
          requiredField={[SEARCH_FIELD_REQUIRED.UPAZILA_ID]}
        />
      )}

      <Table
        headerExtension={{
          leftComponents: [
            <FormProvider {...methods} key={1}>
              <InputSearch
                getPollingInstitutesList={getPollingInstitutesList}
              />
            </FormProvider>,
          ],
        }}
        download={{
          fileName: 'list of polling institutes',
          columns: pollingInstituteTableColumns({
            t,
            isDownload: true,
          }),
          rows: downloadPollingInstitutes,
          onClickDownload: onClickDownload,
          downloadLoading: downloadLoading,
        }}
        rows={pollingInstitutes}
        columns={pollingInstituteTableColumns({
          t,
          getPollingInstitutesList,
        })}
        pagination={{
          language: 'bn',
          totalPage: totalPage,
          activePage: activePage,
          onClick: getPaginatedInstitutes,
        }}
        loading={loading}
      />
    </div>
  );
};

export default PollingInstitute;
