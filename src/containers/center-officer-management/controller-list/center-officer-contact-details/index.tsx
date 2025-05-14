import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Header, Table, Text } from '@pentabd/ui';

import { SearchComponents } from '@components/application-search/SearchComponents';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { useGetCenterOfficerContactDetailsList } from '@hooks/center-officer-management/controller-list/center-officer-contact-details/useGetCenterOfficerContactDetails';

import { USER_TYPES } from '@constants/user-types';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import {
  allSelectedData,
  searchStructAdmin,
  searchStructElectionUser,
} from './searchConstants';
import {
  centerOfficerContactDetailsBreadcrumbs,
  centerOfficerContactDetailsTableColumns,
} from './constants';
import { getDigitBanglaFromEnglish, getParams } from '@utils';
import { CenterOfficerContactDetailsSearchProps } from '@type/center-officer-management/center-officer-contact-details-types';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
import useRoReportFiltersNew from '@hooks/candidate-info-management/report/useRoReportFiltersNew';
import CommonTableSearchInput from '@components/CommonTableSearchInput';

const TABLE_SEARCH_KEY = 'searchValue';

const CenterOfficerContactDetails = () => {
  const { t } = useTranslation();

  const { keycloak } = useAuthWrapper();
  const userType = keycloak.tokenParsed?.userType;
  const permissionsArray = keycloak.realmAccess?.roles;

  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const { roReportFilters } = useRoReportFiltersNew();
  const { electionSchedules: electionSchedulesRedux, zillas: zillasRedux } =
    roReportFilters;

  const [getDataForElectionUser, setGetDataForElectionUser] =
    useState<CenterOfficerContactDetailsSearchProps>();

  const {
    centerOfficerContactDetailsList,
    getCenterOfficerContactDetailsListData,
    loading,
    totalPage,
    activePage,
    totalCount,
  } = useGetCenterOfficerContactDetailsList();

  const {
    centerOfficerContactDetailsList: downloadCenterOfficerContactDetailsList,
    getCenterOfficerContactDetailsListData:
      downloadGetCenterOfficerContactDetailsListData,
    loading: downloadLoading,
  } = useGetCenterOfficerContactDetailsList();

  const getDataOnSuccess = () => {
    if (userType === USER_TYPES.ADMIN) {
      getCenterOfficerContactDetailsListData({
        page: params?.page ? parseInt(params.page, 10) : 0,
        searchItems: params,
      });
    } else {
      getCenterOfficerContactDetailsListData({
        searchItems: { ...params, ...getDataForElectionUser },
        page: params?.page ? parseInt(params.page, 10) : 0,
      });
    }
  };
  // Search
  const onSubmit = (data: any) => {
    if (userType === USER_TYPES.ADMIN) {
      getCenterOfficerContactDetailsListData({
        searchItems: {
          ...data,
        },
        page: 0,
      });
    } else {
      getCenterOfficerContactDetailsListData({
        searchItems: {
          ...data,
          ...getDataForElectionUser,
        },
        page: 0,
      });
    }
  };

  // Download CSV
  const onClickDownload = () => {
    if (userType === USER_TYPES.ADMIN) {
      downloadGetCenterOfficerContactDetailsListData({
        size: MAX_ROW_SIZE,
        searchItems: params,
      });
    } else {
      downloadGetCenterOfficerContactDetailsListData({
        size: MAX_ROW_SIZE,
        searchItems: { ...params, ...getDataForElectionUser },
      });
    }
  };

  const onClickPagination = (page: number) => {
    getCenterOfficerContactDetailsListData({
      page: page - 1,
      searchItems: {
        ...params,
      },
    });

    setSearchParams({ ...params, page: (page - 1).toString() });
  };

  // get election-schedule-id and zilla-id for election user
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

  return (
    <div className="container-96 mb-24">
      <Header
        headerText={{
          header: t(
            'CENTER_OFFICER_CONTACT_DETAILS.CENTER_OFFICER_CONTACT_DETAILS',
          ),
        }}
        breadcrumbs={centerOfficerContactDetailsBreadcrumbs(t)}
        className="mb-10 pt-10"
      />

      {userType === USER_TYPES.ADMIN ? (
        <SearchComponents
          struct={searchStructAdmin}
          onSubmitHandler={onSubmit}
          requiredField={[
            SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
            SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
          ]}
          allSelectedData={allSelectedData}
          userTypeCodesIncludingAll={false}
        />
      ) : null}

      {userType !== USER_TYPES.ADMIN ? (
        <SearchComponents
          struct={searchStructElectionUser}
          onSubmitHandler={onSubmit}
          requiredField={[
            SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
            SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
          ]}
          allSelectedData={allSelectedData}
          userTypeCodesIncludingAll={false}
        />
      ) : null}

      <Table
        headerExtension={{
          leftComponents: [
            <div key={1} className="d-flex gap-12 align-items-center">
              <CommonTableSearchInput
                callback={getCenterOfficerContactDetailsListData as any}
                tableSearchKey={TABLE_SEARCH_KEY}
              />

              <Text size="md">
                {t('CENTER_OFFICER_CONTACT_DETAILS.TOTAL_CENTERS')}:{' '}
                {getDigitBanglaFromEnglish(totalCount)}
              </Text>
            </div>,
          ],
        }}
        download={{
          fileName: 'center-officer-contact-details',
          columns: centerOfficerContactDetailsTableColumns({
            t,
            permissionsArray,
            isDownload: true,
          }),
          rows: downloadCenterOfficerContactDetailsList || [],
          onClickDownload: onClickDownload,
          downloadLoading: downloadLoading,
        }}
        rows={centerOfficerContactDetailsList || []}
        columns={centerOfficerContactDetailsTableColumns({
          t,
          getDataOnSuccess,
          permissionsArray,
        })}
        loading={loading}
        pagination={{
          language: 'bn',
          totalPage: totalPage,
          activePage: activePage,
          onClick: onClickPagination,
        }}
      />
    </div>
  );
};

export default CenterOfficerContactDetails;
