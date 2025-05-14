import { createContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { Header, Table } from '@pentabd/ui';

import { CENTER_STATUS_NOT_CREATED } from '@components/application-search/constants';

import { USER_TYPES } from '@constants/user-types';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
import { CENTER_OFFICER_MANAGEMENT } from '@constants/permissions/center-officer-management';
import {
  centerBasedOfficerListBreadcrumbs,
  centerBasedOfficerListTableCreatedColumns,
  centerBasedOfficerListTableHeader,
  centerBasedOfficerListTableNonCreatedColumns,
} from './constant';

import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { useGetPollingPersonnelLetterSummaryList } from '@hooks/center-officer-management/controller-list/polling-personnel-letters/useGetPollingPersonnelLetters';
import { CenterOfficerManagementSearchProps } from '@type/search-types';
import { getParams } from '@utils';
import ExtendedDownload from './Component/ExtendedDownload';
import { SearchComponents } from '@components/application-search/SearchComponents';
import { searchStructAdmin, searchStructElectionUser } from './searchStruct';
import ElectionSpecificComponents from './election-specific-components';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useChildFiltersValidation } from './useChildFiltersValidationSchema';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { isPermitted } from '@helpers/permission';
import useRoReportFiltersNew from '@hooks/candidate-info-management/report/useRoReportFiltersNew';

export interface ContextDataType {
  electionTypeId?: number;
  statusId?: string;
  dateResetValue?: boolean;
}
interface PollingPersonnelLetterContextType {
  pollingPersonnelLetterContext: ContextDataType;
  setPollingPersonnelLetterContext: (data: any) => void;
}

export const PollingPersonnelLetterContext = createContext<
  PollingPersonnelLetterContextType | undefined
>(undefined);

const CenterBasedOfficerList = () => {
  const { t } = useTranslation();
  const { keycloak } = useAuthWrapper();
  const userType = keycloak.tokenParsed?.userType;
  const permissionsArray = keycloak.realmAccess?.roles;
  const [pollingPersonnelLetterContext, setPollingPersonnelLetterContext] =
    useState<ContextDataType>({});
  const { validationSchema, setChildFiltersValidationSchema } =
    useChildFiltersValidation();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { electionSchedules, electionTypes } = useFiltersRedux();
  const {
    trigger,
    formState: { errors },
  } = methods;
  const [childFilters, setChildFilters] =
    useState<CenterOfficerManagementSearchProps>();

  const [allPollingCenterIds, setAllPollingCenterIds] = useState<string>();

  const { roReportFilters } = useRoReportFiltersNew();
  const { electionSchedules: electionSchedulesRedux, zillas: zillasRedux } =
    roReportFilters;

  const {
    pollingPersonnelLetterList,
    getPollingPersonnelLetterListData,
    totalPage,
    activePage,
  } = useGetPollingPersonnelLetterSummaryList();
  const {
    pollingPersonnelLetterList: downloadPollingPersonnelLetterList,
    getPollingPersonnelLetterListData:
      downloadGetPollingPersonnelLetterListData,
    loading: downloadListLoading,
  } = useGetPollingPersonnelLetterSummaryList();

  const [getDataForElectionUser, setGetDataForElectionUser] =
    useState<CenterOfficerManagementSearchProps>();

  //get election schedule id and zilla id for election user
  useEffect(() => {
    const shouldCallApi =
      userType !== USER_TYPES.ADMIN &&
      electionSchedulesRedux?.[0]?.value &&
      zillasRedux?.[0]?.value;

    if (shouldCallApi) {
      setGetDataForElectionUser({
        electionScheduleId: electionSchedulesRedux?.[0]?.value,
        zillaId: zillasRedux?.[0]?.value,
      });
    }
  }, [electionSchedulesRedux, zillasRedux, userType]);

  useEffect(() => {
    setChildFiltersValidationSchema({
      electionTypeId: pollingPersonnelLetterContext.electionTypeId,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pollingPersonnelLetterContext.electionTypeId]);

  const handleOnCheck = (data: any) => {
    setAllPollingCenterIds(data);
  };

  const onSubmitSearch = (data: any) => {
    if (userType === USER_TYPES.ADMIN) {
      getPollingPersonnelLetterListData({ searchItems: data, page: 0 });
    } else {
      getPollingPersonnelLetterListData({
        searchItems: { ...data, ...getDataForElectionUser },
        page: 0,
      });
    }
  };

  const onClickDownload = () => {
    if (userType === USER_TYPES.ADMIN) {
      downloadGetPollingPersonnelLetterListData({
        size: MAX_ROW_SIZE,
        searchItems: params,
      });
    } else {
      downloadGetPollingPersonnelLetterListData({
        size: MAX_ROW_SIZE,
        searchItems: { ...params, ...getDataForElectionUser },
      });
    }
  };

  const onClickPagination = (page: number) => {
    if (userType === USER_TYPES.ADMIN) {
      getPollingPersonnelLetterListData({
        searchItems: params,
        page: page - 1,
      });
    } else {
      getPollingPersonnelLetterListData({
        searchItems: { ...params, ...getDataForElectionUser },
        page: page - 1,
      });
    }
    setSearchParams({ ...params, page: (page - 1).toString() });
  };

  return (
    <div className="container-96 mb-24">
      <Header
        headerText={{
          header: t('CENTER_BASED_OFFICER_LIST.CENTER_BASED_OFFICER_LIST'),
        }}
        breadcrumbs={centerBasedOfficerListBreadcrumbs(t)}
        className="mb-10 pt-10"
      />

      {userType ? (
        userType === USER_TYPES.ADMIN ? (
          <div>
            <SearchComponents
              struct={searchStructAdmin}
              requiredField={[
                SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
                SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
                SEARCH_FIELD_REQUIRED.ZILLA_ID,
                SEARCH_FIELD_REQUIRED.UPAZILA_ID,
              ]}
              isGetWatch
              handleSearchWatch={(data) => {
                setPollingPersonnelLetterContext((prev) => ({
                  ...prev,
                  electionTypeId: Number(data.electionTypeId),
                  statusId: data.statusId,
                }));
              }}
              onSubmitHandler={onSubmitSearch}
            ></SearchComponents>
          </div>
        ) : (
          <SearchComponents
            struct={searchStructElectionUser({
              electionScheduleId: Number(electionSchedules?.[0]?.value),
            })}
            isGetWatch
            requiredField={[SEARCH_FIELD_REQUIRED.UPAZILA_ID]}
            onSubmitHandler={onSubmitSearch}
            handleSearchWatch={(data) => {
              setPollingPersonnelLetterContext((prev) => ({
                ...prev,
                electionTypeId: Number(electionTypes?.[0]?.value),
                statusId: data.statusId,
              }));
            }}
          />
        )
      ) : null}
      <PollingPersonnelLetterContext.Provider
        value={{
          pollingPersonnelLetterContext,
          setPollingPersonnelLetterContext,
        }}
      >
        <FormProvider {...methods}>
          <ElectionSpecificComponents setChildFilters={setChildFilters} />
        </FormProvider>
        {params?.statusId !== CENTER_STATUS_NOT_CREATED ? (
          <Table
            {...(isPermitted(
              permissionsArray,
              CENTER_OFFICER_MANAGEMENT.CENTER_WISE_POLLING_PERSONNEL_FULL_PERMISSION,
            )
              ? {
                  check: {
                    onCheck: handleOnCheck,
                  },
                }
              : {})}
            headerExtension={{
              ...centerBasedOfficerListTableHeader,
            }}
            download={{
              fileName: 'officer-list',
              columns: centerBasedOfficerListTableCreatedColumns({
                t,
                permissionsArray,
                childFilters,
                roReportFilters,
                trigger,
                errors,
              }),
              rows: downloadPollingPersonnelLetterList || [],
              downloadLoading: downloadListLoading,
              onClickDownload: onClickDownload,
            }}
            rows={pollingPersonnelLetterList || []}
            columns={centerBasedOfficerListTableCreatedColumns({
              t,
              permissionsArray,
              childFilters,
              roReportFilters,
              trigger,
              errors,
            })}
            pagination={{
              language: 'bn',
              totalPage,
              activePage,
              onClick: onClickPagination,
            }}
            showExtendedDeleteView={{
              showExtendedDeleteComponent: (
                <ExtendedDownload
                  childFilters={childFilters}
                  allPollingCenterIds={allPollingCenterIds}
                  trigger={trigger}
                  errors={errors}
                />
              ),
              showExtendedDelete: true,
            }}
          />
        ) : (
          <Table
            headerExtension={centerBasedOfficerListTableHeader}
            rows={pollingPersonnelLetterList || []}
            columns={centerBasedOfficerListTableNonCreatedColumns(t)}
            pagination={{
              language: 'bn',
              totalPage,
              activePage,
              onClick: onClickPagination,
            }}
          />
        )}
      </PollingPersonnelLetterContext.Provider>
    </div>
  );
};

export default CenterBasedOfficerList;
