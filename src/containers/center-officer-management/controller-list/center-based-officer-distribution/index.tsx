import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Header, Table } from '@pentabd/ui';
import OfficerAllocationSummary from './component/officer-allocation-summary';
import {
  APPLICATION_SEARCH,
  SearchComponents,
} from '@components/application-search/SearchComponents';

import { USER_TYPES } from '@constants/user-types';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
import { searchStruct, searchStructElectionUser } from './searchConstruct';
import {
  centerAllocationTableColumns,
  centerBasedOfficerAllocationBreadcrumbs,
  instituteAllocationTableColumns,
} from './constant';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { usePollingCenterSelect } from '@hooks/center-officer-management/controller-list/polling-center/useGetPollingCentersSelect';
import { usePollingPersonnelSummaryList } from '@hooks/center-officer-management/controller-list/polling-center/useGetPollingPersonnelSummary';
import { CenterOfficerManagementSearchProps } from '@type/search-types';
import { getParams } from '@utils';
import { USER_TYPE_CODE_ALL } from '@components/application-search/constants';
import CenterSelect from './component/CenterSelect';
import { useUnionOrWardsByElectionTypeScheduleZillaUpazila } from '@hooks/miscellaneous/core-hook/union-or-ward/useUnionOrWardsByElectionTypeScheduleZillaUpazila';
import { ELECTION_INFO } from '@constants/election-info';
import { ElectionSpecificElectionUserPollingCenterSearch } from './helpers';
import useRoReportFiltersNew from '@hooks/candidate-info-management/report/useRoReportFiltersNew';

const CenterBasedOfficerAllocation = () => {
  const { t } = useTranslation();
  const { keycloak } = useAuthWrapper();
  const userType = keycloak.tokenParsed?.userType;
  const permissionsArray = keycloak.realmAccess?.roles;

  const [electionScheduleForCenter, setElectionScheduleForSelect] = useState<
    string | number
  >();

  const [centerSearchItems, setCenterSearchItems] =
    useState<CenterOfficerManagementSearchProps>();
  const [instituteSearchItems, setInstituteSearchItems] =
    useState<CenterOfficerManagementSearchProps>();

  const { getUnionsOrWardsData, unionsOrWardsIds } =
    useUnionOrWardsByElectionTypeScheduleZillaUpazila();

  const [pollingCenter, setPollingCenter] = useState<number>();

  const { pollingCenters, getPollingCentersData } = usePollingCenterSelect();

  const {
    pollingPersonnelSummaryList: centerPollingPersonnelSummaryList,
    getPollingPersonnelSummaryData: centerGetPollingPersonnelSummaryData,
    totalPage: centerTotalPage,
    activePage: centerActivePage,
    loading: centerLoading,
  } = usePollingPersonnelSummaryList();

  const {
    pollingPersonnelSummaryList: institutePollingPersonnelSummaryList,
    getPollingPersonnelSummaryData: instituteGetPollingPersonnelSummaryData,
    totalPage: instituteTotalPage,
    activePage: instituteActivePage,
    loading: instituteLoading,
  } = usePollingPersonnelSummaryList();

  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);
  const { roReportFilters } = useRoReportFiltersNew();
  const {
    candidateTypes: candidateTypesRedux,
    electionSchedules: electionSchedulesRedux,
    zillas: zillasRedux,
    upazilas: upazilasRedux,
  } = roReportFilters;

  const methods = useForm();
  const { watch, setValue, handleSubmit } = methods;

  const getDataOnSuccess = () => {
    if (centerSearchItems)
      centerGetPollingPersonnelSummaryData({
        searchItems: {
          ...centerSearchItems,
          electionScheduleId:
            userType === USER_TYPES.ADMIN
              ? electionScheduleForCenter
              : electionSchedulesRedux?.[0]?.value,
        },
      });

    if (instituteSearchItems)
      instituteGetPollingPersonnelSummaryData({
        searchItems: {
          ...instituteSearchItems,
          electionScheduleId:
            userType === USER_TYPES.ADMIN
              ? instituteSearchItems?.electionScheduleId
              : electionSchedulesRedux?.[0]?.value,
        },
      });
  };
  const onSubmitCenterButtonSearch = (data: any) => {
    setCenterSearchItems({ pollingCenterId: data?.pollingCenterId });
    setPollingCenter(data?.pollingCenterId as number);

    centerGetPollingPersonnelSummaryData({
      searchItems: {
        electionScheduleId:
          userType === USER_TYPES.ADMIN
            ? electionScheduleForCenter
            : electionSchedulesRedux?.[0]?.value,
        pollingCenterId: data?.pollingCenterId,
      },
    });
  };

  const onSubmitCenterSearch = (data: CenterOfficerManagementSearchProps) => {
    if (data?.unionOrWardId) {
      data = { unionOrWardIds: data?.unionOrWardId, ...data };
    }
    setElectionScheduleForSelect(data?.electionScheduleId);
    getPollingCentersData(data);
    setValue(APPLICATION_SEARCH.POLLING_CENTER, null);
  };

  const onSubmitInstituteSearch = (
    data: CenterOfficerManagementSearchProps,
  ) => {
    if (data.userTypeCode === USER_TYPE_CODE_ALL) {
      delete data.userTypeCode;
    }
    const { agencyId, userTypeCode, electionScheduleId } = data;

    setInstituteSearchItems({
      agencyId,
      userTypeCode,
      electionScheduleId:
        userType === USER_TYPES.ADMIN
          ? electionScheduleId
          : electionSchedulesRedux?.[0]?.value,
    });

    instituteGetPollingPersonnelSummaryData({
      searchItems: {
        agencyId,
        userTypeCode,
        electionScheduleId:
          userType === USER_TYPES.ADMIN
            ? electionScheduleId
            : electionSchedulesRedux?.[0]?.value,
      },
    });
  };

  useEffect(() => {
    if (
      userType !== USER_TYPES.ADMIN &&
      candidateTypesRedux?.[0]?.value === ELECTION_INFO.UNION_PARISHAD.ID
    ) {
      getUnionsOrWardsData({
        getOnlyIds: true,
        electionTypeId: candidateTypesRedux?.[0]?.value,
        electionScheduleId: electionSchedulesRedux?.[0]?.value,
        zillaId: zillasRedux?.[0]?.value,
        upazilaId: upazilasRedux?.[0]?.value,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    userType,
    candidateTypesRedux,
    electionSchedulesRedux,
    zillasRedux,
    upazilasRedux,
  ]);

  return (
    <div className="container-96 mb-24">
      <Header
        headerText={{
          header: t(
            'CENTER_BASED_OFFICER_ALLOCATION.CENTER_BASED_OFFICER_ALLOCATION',
          ),
        }}
        breadcrumbs={centerBasedOfficerAllocationBreadcrumbs(t)}
        className="mb-10 pt-10"
      />

      {userType === USER_TYPES.ADMIN ? (
        <CenterSelect
          onSubmitCenterSearch={onSubmitCenterSearch}
          onSubmitCenterButtonSearch={onSubmitCenterButtonSearch}
          pollingCenters={pollingCenters}
          methods={methods}
          handleSubmit={handleSubmit}
          watch={watch}
        />
      ) : (
        <SearchComponents
          struct={ElectionSpecificElectionUserPollingCenterSearch({
            electionTypeId: candidateTypesRedux?.[0]?.value,
            electionScheduleId: electionSchedulesRedux?.[0]?.value,
            zillaId: zillasRedux?.[0]?.value,
            upazilaId: upazilasRedux?.[0]?.value,
            unionOrWardId: unionsOrWardsIds,
          })}
          onSubmitHandler={onSubmitCenterButtonSearch}
          requiredField={[SEARCH_FIELD_REQUIRED.POLLING_CENTER_ID]}
        />
      )}

      <OfficerAllocationSummary
        centerSummary={centerPollingPersonnelSummaryList?.centerSummary}
      />

      <Table
        rows={centerPollingPersonnelSummaryList?.pollingPersonnels?.items || []}
        columns={centerAllocationTableColumns(
          t,
          getDataOnSuccess,
          permissionsArray,
        )}
        pagination={{
          language: 'bn',
          totalPage: centerTotalPage,
          activePage: centerActivePage,
          onClick: (page: number) => {
            centerGetPollingPersonnelSummaryData({
              page: page - 1,
              searchItems: {
                ...centerSearchItems,
                electionScheduleId:
                  userType === USER_TYPES.ADMIN
                    ? electionScheduleForCenter
                    : electionSchedulesRedux?.[0]?.value,
              },
            });
            setSearchParams({ ...params, page: (page - 1).toString() });
          },
        }}
        loading={centerLoading}
        loadingItemCount={10}
      />

      <div className="mb-16"></div>

      {userType === USER_TYPES.ADMIN ? (
        <SearchComponents
          struct={searchStruct}
          title={t('CENTER_BASED_OFFICER_ALLOCATION.SELECT_INSTITUTE')}
          totalCol="grid-cols-lg-12 grid-cols-1"
          colSpan="col-span-lg-3 col-span-1"
          onSubmitHandler={onSubmitInstituteSearch}
          requiredField={[
            SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
            SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
            SEARCH_FIELD_REQUIRED.AGENCY_ID,
          ]}
        />
      ) : (
        <SearchComponents
          struct={searchStructElectionUser}
          onSubmitHandler={onSubmitInstituteSearch}
          requiredField={[SEARCH_FIELD_REQUIRED.AGENCY_ID]}
        />
      )}

      <Table
        rows={
          institutePollingPersonnelSummaryList?.pollingPersonnels?.items || []
        }
        columns={instituteAllocationTableColumns(
          t,
          pollingCenter,
          permissionsArray,
          centerPollingPersonnelSummaryList,
          getDataOnSuccess,
        )}
        pagination={{
          language: 'bn',
          totalPage: instituteTotalPage,
          activePage: instituteActivePage,
          onClick: (page: number) => {
            instituteGetPollingPersonnelSummaryData({
              page: page - 1,
              searchItems: {
                ...instituteSearchItems,
                electionScheduleId:
                  userType === USER_TYPES.ADMIN
                    ? instituteSearchItems?.electionScheduleId
                    : electionSchedulesRedux?.[0]?.value,
              },
            });
            setSearchParams({ ...params, page: (page - 1).toString() });
          },
        }}
        loading={instituteLoading}
        loadingItemCount={10}
      />
    </div>
  );
};

export default CenterBasedOfficerAllocation;
