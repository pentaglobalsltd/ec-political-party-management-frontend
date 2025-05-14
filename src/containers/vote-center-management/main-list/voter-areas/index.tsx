import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { Header, Table } from '@pentabd/ui';

import {
  voterAreaBreadcrumbs,
  columns,
  bulkEditColumn,
  voterAreaPermissionList,
} from './constants';
import MainListSearch from '@components/application-search/MainListSearch';
import { useVoterAreaGetList } from '@hooks/vote-center-management/main-list/voter-areas/useVoterAreaGetList';
import { getParams } from '@utils';

import { USER_TYPES } from '@constants/user-types';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import useRoReportFilters from '@hooks/candidate-info-management/report/useRoReportFilters';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
import { VOTE_CENTER_MANAGEMENT as FORM_FIELDS } from '@constants/forms/vote-center-management/vote-center-management';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import CreateButton from './components/CreateButton';
import InputSearch from './components/InputSearch';
import UpdateBulkEdit from './components/UpdateBulkEdit';
import { VOTE_CENTER_MANAGEMENT } from '@constants/permissions/vote-center-management';

const { SEARCH_VOTE_CENTER } =
  FORM_FIELDS.CENTER_MANAGEMENT.VOTE_CENTER_ADDITION.NEW_CENTER;

const VoterArea = () => {
  const { keycloak } = useAuthWrapper();
  const userType = keycloak.tokenParsed?.userType;
  const permissionsArray = keycloak.realmAccess?.roles;

  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedItemsIds, setSelectedItemsIds] = useState<number[]>([]);
  const params = getParams(searchParams);
  const { roReportFilters } = useRoReportFilters();

  const {
    getVoterAreaListData,
    voterAreaList,
    totalPage,
    activePage,
    loading,
  } = useVoterAreaGetList();

  const methods = useForm();

  const { watch } = methods;

  const searchCenterWatch = watch(SEARCH_VOTE_CENTER);

  const hasBulkEditPermission = voterAreaPermissionList(
    VOTE_CENTER_MANAGEMENT.MAIN_LIST_VOTER_AREA_EDIT_PERMISSION,
    permissionsArray,
  );
  //for download
  const {
    getVoterAreaListData: downloadGetVoterAreaListData,
    voterAreaList: downloadVoterAreaList,
    loading: downloadLoading,
  } = useVoterAreaGetList();

  useEffect(() => {
    if (Object.keys(params).length > 0) {
      getVoterAreaListData({
        searchItems: params,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //download function
  const onClickDownload = () => {
    if (Object.keys(params).length > 0) {
      downloadGetVoterAreaListData({
        searchItems: {
          ...params,
        },
        size: MAX_ROW_SIZE,
      });
    }
  };

  const onSubmitSearch = (data: any) => {
    const word = searchCenterWatch?.trim();
    getVoterAreaListData({
      searchItems: {
        ...data,
        ...(searchCenterWatch?.trim()?.length ? { nameBn: word } : {}),
      },
    });
  };

  return (
    <div className="container-96 mb-24">
      <div className="mb-10 pt-10">
        <Header
          headerText={{
            header: t('VOTER_AREA.BREADCRUMB_VOTER_AREA'),
          }}
          breadcrumbs={voterAreaBreadcrumbs(t)}
          actions={[<CreateButton />]}
        />
      </div>

      {userType ? (
        <MainListSearch
          inputs={{
            region: userType === USER_TYPES.ADMIN,
            district: userType === USER_TYPES.ADMIN,
            electionUserDistrict: userType !== USER_TYPES.ADMIN,
            electionUserSubDistrict:
              userType === USER_TYPES.UPAZILA_ELECTION_OFFICER,
            subDistrict: userType !== USER_TYPES.UPAZILA_ELECTION_OFFICER,
            municipality: true,
            unionOrWard: true,
            voterAreaCode: true,
          }}
          onSubmitHandler={onSubmitSearch}
          requiredField={[SEARCH_FIELD_REQUIRED.ZILLA_ID]}
          electionUserFields={roReportFilters}
          isUpazilaMunicipalities={true} // populating municipalities using upazilas filter
          isBulkEditButton={hasBulkEditPermission}
          bulkEditRequiredField={[
            SEARCH_FIELD_REQUIRED.ZILLA_ID,
            SEARCH_FIELD_REQUIRED.UPAZILA_ID,
          ]}
        />
      ) : null}

      {params?.isBulkEdit === 'true' && hasBulkEditPermission ? (
        <FormProvider {...methods} key={1}>
          <form onSubmit={(e) => e.preventDefault()}>
            <Table
              check={{
                onCheck: (data: any) => setSelectedItemsIds(data),
              }}
              headerExtension={{
                leftComponents: [
                  <InputSearch getVoterAreaListData={getVoterAreaListData} />,
                ],
              }}
              download={{
                fileName: 'candidate applied online table',
                columns: bulkEditColumn({
                  t,
                }),
                rows: downloadVoterAreaList,
                onClickDownload: onClickDownload,
                downloadLoading: downloadLoading,
              }}
              rows={voterAreaList}
              columns={bulkEditColumn({
                t,
              })}
              pagination={{
                language: 'bn',
                totalPage,
                activePage,
                onClick: (page: number) => {
                  getVoterAreaListData({ searchItems: params, page: page - 1 });
                  setSearchParams({ ...params, page: (page - 1).toString() });
                },
              }}
              loading={loading}
              loadingItemCount={10}
              showExtendedDeleteView={{
                showExtendedDeleteComponent: (
                  <UpdateBulkEdit
                    unionWards={watch()}
                    ids={selectedItemsIds}
                    getVoterAreaListData={getVoterAreaListData}
                    params={params}
                    setSelectedItemsIds={setSelectedItemsIds}
                  />
                ),
                showExtendedDelete: true,
              }}
            />
          </form>
        </FormProvider>
      ) : (
        <Table
          headerExtension={{
            leftComponents: [
              <FormProvider {...methods} key={2}>
                <form onSubmit={(e) => e.preventDefault()}>
                  <InputSearch getVoterAreaListData={getVoterAreaListData} />
                </form>
              </FormProvider>,
            ],
          }}
          download={{
            fileName: 'candidate applied online table',
            columns: columns({
              t,
              isDownload: true,
            }),
            rows: downloadVoterAreaList,
            onClickDownload: onClickDownload,
            downloadLoading: downloadLoading,
          }}
          rows={voterAreaList}
          columns={columns({
            t,
            getVoterAreaListData,
          })}
          pagination={{
            language: 'bn',
            totalPage,
            activePage,
            onClick: (page: number) => {
              getVoterAreaListData({ searchItems: params, page: page - 1 });
              setSearchParams({ ...params, page: (page - 1).toString() });
            },
          }}
          loading={loading}
          loadingItemCount={10}
        />
      )}
    </div>
  );
};

export default VoterArea;
