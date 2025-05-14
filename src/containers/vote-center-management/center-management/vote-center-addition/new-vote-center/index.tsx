import { useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { DownloadButtons, Header, Table } from '@pentabd/ui';

import usePollingInstitutes from '@hooks/vote-center-management/center-management/polling-institute/usePollingInstitutes';
import usePollingCentersAggregated from '@hooks/vote-center-management/center-management/polling-center/usePollingCentersAggregated';

import { getParams } from '@utils';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { USER_TYPES } from '@constants/user-types';
import { VOTE_CENTER_MANAGEMENT as FORM_FIELDS } from '@constants/forms/vote-center-management/vote-center-management';

import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import { SearchComponents } from '@components/application-search/SearchComponents';
import {
  allSelectedDataVoteCenterAddition,
  searchStructVoteCenterAddition,
} from './searchConstantVoteCenterAddition';
import {
  getBreadcrumbsCreateVoteCenterAddition,
  getColumnsStatusTable,
} from '../constants';

import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { electionUserSearchForVoteCenterAddition } from '../helpers';
import InstituteSearchInput from './components/InstituteSearchInput';
import PolingCenterSearchInput from './components/PolingCenterSearchInput';
import { mapOpRoSearchSubmit } from './create-edit/helper/map-op-ro-search-submit';
import { getColumnsAddedCenterTable } from './constants';
import { ELECTION_INFO } from '@constants/election-info';
import { BadgeElectionUserSearch } from '@components/badge-election-user-search';
import { VoteCenterListSearch } from '@components/badge-election-user-search/forms/vote-center-list';

export const POLLING_INSTITUTE =
  FORM_FIELDS.CENTER_MANAGEMENT.POLLING_INSTITUTE;

const NewCenter = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);
  const methods = useForm();
  const { watch } = methods;

  const {
    pollingInstitutes,
    getPollingInstitutesList,
    activePage: activePageInstitutes,
    loading: loadingInstitutes,
    totalPage: totalPageInstitutes,
  } = usePollingInstitutes();

  const {
    pollingInstitutes: downloadPollingInstitutes,
    getPollingInstitutesList: downloadGetPollingInstitutesList,
    loading: downloadLoading,
  } = usePollingInstitutes();

  const {
    pollingCentersAggregated,
    getPollingCenterAggregatedData,
    loading: loadingCenter,
    activePage: activePageCenter,
    totalPage: totalPageCenter,
  } = usePollingCentersAggregated();

  const {
    pollingCentersAggregated: downloadPollingCentersAggregated,
    getPollingCenterAggregatedData: downloadGetPollingCenterAggregatedData,
    loading: downloadCenterLoading,
  } = usePollingCentersAggregated();

  const {
    electionTypes: electionTypesRedux,
    electionSchedules: electionSchedulesRedux,
    candidateTypes: candidateTypesRedux,
    zillas: zillasRedux,
    constituencies: constituenciesRedux,
  } = useFiltersRedux();

  const electionUserNationalType =
    electionTypesRedux?.[0]?.value === ELECTION_INFO.NATIONAL.ID;

  const searchInstituteWatch = watch(
    POLLING_INSTITUTE.SEARCH_POLLING_INSTITUTE,
  );
  const searchCenterWatch = watch(POLLING_INSTITUTE.SEARCH_POLLING_CENTER);

  const tablePaginationInstitutes = (page: number) => {
    setSearchParams({ ...params, institutePage: (page - 1).toString() });

    getPollingInstitutesList({
      page: page - 1,
      queryParams: { ...params },
    });
  };

  const tablePaginationCenters = (page: number) => {
    setSearchParams({ ...params, centerPage: (page - 1).toString() });

    getPollingCenterAggregatedData({
      page: page - 1,
      queryParams: { ...params },
    });
  };

  useEffect(() => {
    if (Object.keys(params).length > 0) {
      getPollingInstitutesList({
        page: params?.institutePage as unknown as number,
        queryParams: {
          ...params,
        },
      });

      getPollingCenterAggregatedData({
        page: params?.centerPage as unknown as number,
        queryParams: {
          ...params,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //for download
  const onInstituteClickDownload = () => {
    if (Object.keys(params).length > 0) {
      downloadGetPollingInstitutesList({
        queryParams: {
          ...params,
          nameBn: searchInstituteWatch,
        },
        size: MAX_ROW_SIZE,
      });
    }
  };

  const onCenterClickDownload = () => {
    if (Object.keys(params).length > 0) {
      downloadGetPollingCenterAggregatedData({
        queryParams: {
          ...params,
          pollingInstituteNameBn: searchCenterWatch,
        },
        size: MAX_ROW_SIZE,
      });
    }
  };

  const submitHandler = (dataObj: any) => {
    const objInstitute = {
      queryParams: {
        ...dataObj,
        nameBn: searchInstituteWatch,
      },
    };

    const objCenterAggregated = {
      queryParams: {
        ...dataObj,
        pollingInstituteNameBn: searchCenterWatch,
      },
    };

    getPollingInstitutesList(objInstitute);
    getPollingCenterAggregatedData(objCenterAggregated);
  };

  // RO OP filter =============================

  const { keycloak } = useAuthWrapper();
  const userType = keycloak.tokenParsed?.userType;

  const opRoSearchSubmit = (data: any) => {
    mapOpRoSearchSubmit({
      data,
      searchInstituteWatch,
      searchCenterWatch,
      getPollingInstitutesList,
      getPollingCenterAggregatedData,
      setSearchParams,
    });
  };

  const electionUserSearchCallback = useCallback((data: any) => {
    const filterObject = {
      searchItems: {
        electionTypeId: electionTypesRedux?.[0]?.value,
        electionScheduleId: electionSchedulesRedux?.[0]?.value,
        candidateTypeId: candidateTypesRedux?.[0]?.value,
        zillaId: zillasRedux?.[0]?.value,
        electionSettingsIds:
          constituenciesRedux?.[0]?.extra?.electionSettingsId,
        unionOrWardId: data?.unionOrWardIds,
        ...data,
      },
    };

    opRoSearchSubmit(filterObject.searchItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-96 mb-24">
      <div className="my-5">
        <Header
          className="border-none"
          breadcrumbs={getBreadcrumbsCreateVoteCenterAddition(t)}
        />
        <Header
          className=""
          headerText={{
            header: t('ADD_VOTE_CENTER.SECTION_HEADER'),
          }}
        />
      </div>

      {/* OP - সেটিংস ভিত্তিক অনুসন্ধান */}

      {electionUserNationalType && userType !== USER_TYPES.ADMIN && (
        <>
          <BadgeElectionUserSearch
            labels={{
              electionTypes: electionTypesRedux?.[0]?.label,
              electionSchedules: electionSchedulesRedux?.[0]?.label,
              candidateTypes: candidateTypesRedux?.[0]?.label,
              zillas: zillasRedux?.[0]?.label,
              constituencies: constituenciesRedux?.[0]?.label,
            }}
            callback={electionUserSearchCallback}
            children={
              <VoteCenterListSearch
                callback={electionUserSearchCallback}
                requiredField={[SEARCH_FIELD_REQUIRED.UNION_OR_WARDS]}
                field={{
                  upazila: true,
                  unionward: true,
                  centerType: false,
                  status: false,
                }}
              />
            }
            alignment="below"
          />
        </>
      )}
      {!electionUserNationalType && userType !== USER_TYPES.ADMIN && (
        <>
          <SearchComponents
            title="ADD_VOTE_CENTER.SEARCH_VOTE_CENTER"
            struct={electionUserSearchForVoteCenterAddition(
              electionTypesRedux?.[0]?.value,
            )}
            onSubmitHandler={opRoSearchSubmit}
            requiredField={[
              SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
              SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
              SEARCH_FIELD_REQUIRED.ELECTION_SETTINGS_IDS,
              SEARCH_FIELD_REQUIRED.UNION_OR_WARD,
            ]}
            allSelectedData={allSelectedDataVoteCenterAddition}
            // loading={loading}
          />
        </>
      )}

      {/* ADMIN search filter */}
      {userType === USER_TYPES.ADMIN && (
        <SearchComponents
          title="ADD_VOTE_CENTER.SEARCH_VOTE_CENTER"
          struct={searchStructVoteCenterAddition}
          onSubmitHandler={submitHandler}
          requiredField={[SEARCH_FIELD_REQUIRED.UPAZILA_ID]}
          allSelectedData={allSelectedDataVoteCenterAddition}
        />
      )}

      {/* Table - Polling Institutes */}
      <div className="my-10">
        <Table
          headerExtension={{
            leftComponents: [
              <FormProvider {...methods} key={1}>
                <InstituteSearchInput
                  getPollingInstitutesList={getPollingInstitutesList}
                />
              </FormProvider>,
            ],
            rightComponents: [
              <DownloadButtons
                key={2}
                fileName={'vote center addition table'}
                rows={downloadPollingInstitutes}
                columns={getColumnsStatusTable({
                  t,
                  tStatusTableColumn: 'ADD_VOTE_CENTER.STATUS_TABLE_COLUMN',
                  searchInstituteWatch,
                  getPollingInstitutesList,
                  isDownload: true,
                })}
                onClickDownload={() => onInstituteClickDownload()}
                downloadLoading={downloadLoading}
              />,
            ],
          }}
          rows={pollingInstitutes}
          columns={getColumnsStatusTable({
            t,
            tStatusTableColumn: 'ADD_VOTE_CENTER.STATUS_TABLE_COLUMN',
            searchInstituteWatch,
            getPollingInstitutesList,
          })}
          pagination={{
            language: 'bn',
            totalPage: totalPageInstitutes,
            activePage: activePageInstitutes,
            onClick: tablePaginationInstitutes,
          }}
          loading={loadingInstitutes}
          loadingItemCount={10}
        />
      </div>

      {/* Table - Polling Center */}
      <div className="my-10">
        <Table
          headerExtension={{
            leftComponents: [
              <FormProvider {...methods} key={1}>
                <PolingCenterSearchInput
                  getPollingCenterAggregatedData={
                    getPollingCenterAggregatedData
                  }
                />
              </FormProvider>,
            ],
            rightComponents: [
              <DownloadButtons
                key={3}
                fileName={'added vote center table'}
                rows={downloadPollingCentersAggregated}
                columns={getColumnsAddedCenterTable({
                  t,
                  isDownload: true,
                })}
                onClickDownload={onCenterClickDownload}
                downloadLoading={downloadCenterLoading}
              />,
            ],
          }}
          rows={pollingCentersAggregated}
          columns={getColumnsAddedCenterTable({
            t,
            getPollingCenterAggregatedData,
            getPollingInstitutesList,
          })}
          header={{
            title: t('ADD_VOTE_CENTER.ADDED_CENTERS_TABLE.HEADER_TITLE'),
          }}
          pagination={{
            language: 'bn',
            totalPage: totalPageCenter,
            activePage: activePageCenter,
            onClick: tablePaginationCenters,
          }}
          loading={loadingCenter}
          loadingItemCount={10}
        />
      </div>
    </div>
  );
};

export default NewCenter;
