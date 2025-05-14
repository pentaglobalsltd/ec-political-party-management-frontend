import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Table, Header, Text, DownloadButtons } from '@pentabd/ui';

import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import useResultStatusListSelect from '@hooks/result-management/useResultStatusListSelect';
import { useGetPollingCenterList } from '@hooks/result-management/electoral-process/results/useGetPollingCenterList';
import { useGetCandidateTypeById } from '@hooks/election-schedule-management/other/candidate-type/useGetCandidateTypeById';

import { USER_TYPES } from '@constants/user-types';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import { allSelectedData, searchStruct } from './searchConstants';
import {
  allSelectedDataElectionUser,
  searchStructElectionUser,
} from './searchConstantsElectionUsers';
import {
  centerBasedMonitoringResultsTableBreadcrumbs,
  centerBasedMonitoringResultsTableColumns,
} from './constants';
import { getParams } from '@utils';
import CommonTableSearchInput from '@components/CommonTableSearchInput';
import { CenterBasedMonitoringResultSearch } from './components/CenterBasedMonitoringResultSearch';

const TABLE_SEARCH_KEY: string = 'commonSearchParam';

function CenterBasedMonitoringResults() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const { keycloak } = useAuthWrapper();
  const userType = keycloak.tokenParsed?.userType;
  const permissionsArray = keycloak.realmAccess?.roles;
  const { resultStatuses, getResultStatuses } = useResultStatusListSelect();
  const { electionTypes: electionTypesRedux, isAdmin } = useFiltersRedux();

  const [tableHeader, setTableHeader] = useState<string>('');

  // get CandidateTypeLabel for text label above table
  const { candidateType, getCandidateTypeData } = useGetCandidateTypeById();

  useEffect(() => {
    if (params?.candidateTypeId) {
      getCandidateTypeData(Number(params?.candidateTypeId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.candidateTypeId]);

  const {
    activePage,
    totalPage,
    loading,
    pollingCenterList,
    getPollingCenterList,
  } = useGetPollingCenterList();

  const {
    loading: downloadLoading,
    pollingCenterList: downloadedCenterList,
    getPollingCenterList: downloadCenterList,
  } = useGetPollingCenterList();

  const handleSearch = (data: any) => {
    data.scheduleId = data.electionScheduleId;
    data.electionSettings = data.electionSettingsId;

    const result: any = resultStatuses.find(
      (obj) => obj.value === data?.status,
    );
    setTableHeader(result?.label);
    getPollingCenterList(data);
  };

  const getPaginatedCenters = (page: number) => {
    setSearchParams({
      ...params,
      page: (page - 1).toString(),
    });

    getPollingCenterList({
      ...params,
      page: page - 1,
      scheduleId: params?.electionScheduleId,
      electionSettings: params.electionSettingsId,
    });
  };

  const handleDownloadList = () => {
    if (params?.electionScheduleId) {
      downloadCenterList({
        ...params,
        scheduleId: params?.electionScheduleId,
        size: MAX_ROW_SIZE,
      });
    }
  };

  useEffect(() => {
    if (Object.keys(params).length > 0) {
      getPollingCenterList({
        ...params,
        page: Number(params?.page),
        scheduleId: params?.electionScheduleId,
        electionSettings: params.electionSettingsId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getResultStatuses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tableInputSearch = (data: any) => {
    const { page, searchItems } = data;
    getPollingCenterList({ page, ...searchItems });
  };

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{
          header: t(
            'CENTER_BASED_MONITORING_RESULTS.CENTER_BASED_MONITORING_RESULTS',
          ),
        }}
        breadcrumbs={centerBasedMonitoringResultsTableBreadcrumbs(t)}
      />

      <CenterBasedMonitoringResultSearch
        onSubmitSearch={handleSearch}
        setSearchParams={setSearchParams}
        searchStructAdmin={searchStruct}
        searchStructElectionUser={searchStructElectionUser}
        allSelectedDataForSearch={allSelectedData}
        allSelectedDataElectionUser={allSelectedDataElectionUser}
      />

      <div className="mb-12">
        <Text size="md" weight="bold">
          {candidateType?.name}
        </Text>
      </div>

      <div className="mb-20 p-10 bg-light box-ex rounded-5">
        <div className="mb-12">
          <Text size="sm" weight="normal">
            {t('CENTER_BASED_MONITORING_RESULTS.RESULTS_CONDITION')}
          </Text>
          <Text size="sm" weight="bold">
            {tableHeader}
          </Text>
        </div>

        <Table
          headerExtension={{
            leftComponents: [
              <CommonTableSearchInput
                key={1}
                callback={tableInputSearch as any}
                tableSearchKey={TABLE_SEARCH_KEY}
              />,
            ],
            rightComponents: [
              <DownloadButtons
                key={1}
                fileName={'Result statuses of Polling Centers'}
                columns={centerBasedMonitoringResultsTableColumns({
                  t,
                  params,
                  electionTypeId: isAdmin
                    ? params?.electionTypeId
                    : electionTypesRedux?.[0]?.value,
                  permissionsArray,
                  isAdmin: userType === USER_TYPES.ADMIN,
                  isDownload: true,
                  getPollingCenterList,
                })}
                rows={downloadedCenterList}
                onClickDownload={handleDownloadList}
                downloadLoading={downloadLoading}
              />,
            ],
          }}
          rows={pollingCenterList}
          columns={centerBasedMonitoringResultsTableColumns({
            t,
            params,
            electionTypeId: isAdmin
              ? params?.electionTypeId
              : electionTypesRedux?.[0]?.value,
            candidateTypeId: params?.candidateTypeId,
            permissionsArray,
            isAdmin: userType === USER_TYPES.ADMIN,
            getPollingCenterList,
          })}
          pagination={{
            language: 'bn',
            totalPage: totalPage,
            activePage: activePage,
            onClick: getPaginatedCenters,
          }}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default CenterBasedMonitoringResults;
