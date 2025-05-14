import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Text, Header, Table } from '@pentabd/ui';

import { SearchComponents } from '@components/application-search/SearchComponents';

import { ROUTES } from '@constants/routes';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
import { USER_PROFILE_LIST_TYPE } from '@containers/user-management/controller-list/constants';
import { resultsSummaryTableBreadcrumbs } from './constants';
import { allSelectedData, structSearch } from './searchConstants';
import {
  GET_POLLING_LIST_TESTED_STATUS,
  RESULT_STATUS,
  descriptionTableColumn,
  resultsTableHeader,
  summaryTableColumn,
  testedResultsTableColumns,
  waitingResultsTableColumns,
} from '../results/constants';

import { useGetPollingCenterSummaryAdmin } from '@hooks/result-management/electoral-process/results/useGetPollingCenterSummaryAdmin';
import { useGetPollingCenterResultListWithUserId } from '@hooks/result-management/electoral-process/results/useGetPollingCenterResultSumaryWithUserId';
import { getParams } from '@utils';

export const ResultSummary = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { summary, getPollingCenterSummary, description, candidateTypeName } =
    useGetPollingCenterSummaryAdmin();

  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const {
    activePage: activePageWaiting,
    totalPage: totalPageWaiting,
    loading: loadingWaiting,
    pollingCenterList: pollingCenterListWaiting,
    getPollingCenterList: getPollingCenterListWaiting,
  } = useGetPollingCenterResultListWithUserId();

  const {
    activePage: activePageTested,
    totalPage: totalPageTested,
    loading: loadingTested,
    pollingCenterList: pollingCenterListTested,
    getPollingCenterList: getPollingCenterListTested,
  } = useGetPollingCenterResultListWithUserId();

  const handleNavigate = (id: number) => {
    if (params?.electionScheduleId && params?.candidateTypeId)
      navigate(
        ROUTES.RESULTS_SUMMARY_PUBLISHED(
          id,
          params?.electionScheduleId,
          params?.candidateTypeId,
        ),
      );
  };

  const onSubmitSearch = (data: any) => {
    const { electionTypeId, electionScheduleId, userId, electionSettingsId } =
      data;

    if (electionScheduleId && userId) {
      getPollingCenterSummary({
        scheduleId: electionScheduleId,
        userId,
        electionTypeId,
      });
    }
    if (electionScheduleId && electionSettingsId && userId) {
      getPollingCenterListWaiting({
        scheduleId: electionScheduleId,
        electionSettingsId: electionSettingsId,
        userId: userId,
        status: RESULT_STATUS.FORWARDED_BY_OP,
        electionTypeId,
      });
      getPollingCenterListTested({
        scheduleId: electionScheduleId,
        electionSettingsId: electionSettingsId,
        userId: userId,
        status: GET_POLLING_LIST_TESTED_STATUS,
        electionTypeId,
      });
    }
  };

  useEffect(() => {
    if (params?.electionScheduleId && params.userId && params?.electionTypeId) {
      getPollingCenterSummary({
        scheduleId: params?.electionScheduleId,
        userId: params?.userId,
        electionTypeId: params?.electionTypeId,
      });
    }
    if (
      params?.electionScheduleId &&
      params?.electionSettingsId &&
      params.userId &&
      params?.electionTypeId
    ) {
      getPollingCenterListWaiting({
        scheduleId: params?.electionScheduleId,
        electionSettingsId: params?.electionSettingsId,
        userId: params.userId,
        status: RESULT_STATUS.FORWARDED_BY_OP,
        electionTypeId: params?.electionTypeId,
      });
      getPollingCenterListTested({
        scheduleId: params?.electionScheduleId,
        electionSettingsId: params?.electionSettingsId,
        userId: params.userId,
        status: GET_POLLING_LIST_TESTED_STATUS,
        electionTypeId: params?.electionTypeId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.electionScheduleId, params?.electionSettingsId, params.userId]);

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-6 pt-10"
        headerText={{
          header: t('ADMIN_RESULT_MANAGEMENT_TOPBAR.RESULTS_SUMMARY'),
        }}
        breadcrumbs={resultsSummaryTableBreadcrumbs(t)}
      />

      {/* in here election settings id = constituencyId */}
      <SearchComponents
        totalCol="grid-cols-lg-8"
        colSpan="col-span-2"
        struct={structSearch}
        allSelectedData={allSelectedData}
        userType={USER_PROFILE_LIST_TYPE.ELECTION}
        requiredField={[SEARCH_FIELD_REQUIRED.USER_ID]}
        onSubmitHandler={onSubmitSearch}
        getElectionSettingsIdForAdmin={true}
      />
      {/* কেন্দ্রের সারসংক্ষেপ */}
      {summary || description ? (
        <div className="pb-16">
          <div className="pb-10">
            <Text size="lg" weight="bold">
              {t('RESULTS.CENTER_SUMMARY')}
            </Text>
          </div>
          <div className="d-flex justify-content-between col-span-5 gap-8">
            <div className="flex-fill">
              <Table
                loading={loadingWaiting}
                isShowColumnHeader={false}
                columns={summaryTableColumn()}
                rows={summary || []}
              />
            </div>

            <div className="flex-fill">
              <Table
                loading={loadingTested}
                columns={descriptionTableColumn(t, candidateTypeName)}
                rows={description || []}
              />
            </div>
          </div>
        </div>
      ) : null}
      {/* অপেক্ষমাণ নির্বাচনের ফলাফল */}
      <div className="pb-16">
        <div className="pb-10">
          <Text size="lg" weight="bold">
            {t('RESULTS.WAITING_ELECTION_RESULTS')}
          </Text>
        </div>
        <Table
          headerExtension={resultsTableHeader}
          rows={pollingCenterListWaiting}
          columns={waitingResultsTableColumns(t, handleNavigate)}
          loading={loadingWaiting}
          pagination={{
            language: 'bn',
            totalPage: totalPageWaiting,
            activePage: activePageWaiting,
            onClick: (page: number) => {
              getPollingCenterListWaiting({
                scheduleId: params?.electionScheduleId,
                electionSettingsId: params?.electionSettingsId,
                userId: params.userId,
                status: RESULT_STATUS.FORWARDED_BY_OP,
                electionTypeId: params?.electionTypeId,
                page: page - 1,
              });
            },
          }}
        />
      </div>
      {/* পরিক্ষিত নির্বাচনের ফলাফল */}
      <div className="pb-16">
        <div className="pb-10">
          <Text size="lg" weight="bold">
            {t('RESULTS.TESTED_ELECTION_RESULTS')}
          </Text>
        </div>
        <Table
          headerExtension={resultsTableHeader}
          rows={pollingCenterListTested}
          columns={testedResultsTableColumns(t, handleNavigate)}
          loading={loadingTested}
          pagination={{
            language: 'bn',
            totalPage: totalPageTested,
            activePage: activePageTested,
            onClick: (page: number) => {
              getPollingCenterListTested({
                scheduleId: params?.electionScheduleId,
                electionSettingsId: params?.electionSettingsId,
                userId: params.userId,
                status: GET_POLLING_LIST_TESTED_STATUS,
                electionTypeId: params?.electionTypeId,
                page: page - 1,
              });
            },
          }}
        />
      </div>
    </div>
  );
};
