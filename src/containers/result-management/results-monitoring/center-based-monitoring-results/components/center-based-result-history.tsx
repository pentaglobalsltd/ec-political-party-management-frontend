import { useEffect } from 'react';
import { Header, Table, Text } from '@pentabd/ui';
import { useTranslation } from 'react-i18next';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  centerBasedResultHistoryColumns,
  centerBasedResultsHistoryTableBreadcrumbs,
} from '../constants';
import { useCenterBasedResultHistory } from '@hooks/result-management/monitoring-overall-results/useCenterBasedResultHistory';

import useResultStatusListSelect from '@hooks/result-management/useResultStatusListSelect';
import { getParams } from '@utils';

export const CenterBasedResultHistory = () => {
  const { t } = useTranslation();
  const { scheduleId, resultId } = useParams();
  const {
    centerBasedResultHistory,
    getCenterBasedResultHistory,
    loading,
    totalPage,
    activePage,
  } = useCenterBasedResultHistory();
  const { resultStatuses, getResultStatuses } = useResultStatusListSelect();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  useEffect(() => {
    if (scheduleId && resultId)
      getCenterBasedResultHistory({
        scheduleId,
        resultId,
        page: params?.page ?? 0,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleId, resultId, params?.page]);

  useEffect(() => {
    getResultStatuses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{
          header: t('CANDIDATE_MANAGEMENT.CANDIDATE_STATUS_HISTORY_DASHBOARD'),
        }}
        breadcrumbs={centerBasedResultsHistoryTableBreadcrumbs(t)}
      />
      <div className="mb-5 d-flex flex-column">
        <Text size="lg">
          {t('CENTER_BASED_MONITORING_RESULTS.DISTRICT')} : {params?.zillaName}
        </Text>
        <Text size="lg">
          {t('CENTER_BASED_MONITORING_RESULTS.ELECTION_SEAT')} :{' '}
          {params?.constituencyName}
        </Text>
        <Text size="lg">
          {t('CENTER_BASED_MONITORING_RESULTS.CENTER_NO')} : {params?.serial}
        </Text>
        <Text size="lg">
          {t('CENTER_BASED_MONITORING_RESULTS.VOTE_CENTER_NAME')} :{' '}
          {params?.pollingCenterName}
        </Text>
      </div>
      <Table
        rows={
          centerBasedResultHistory?.map((item, idx) => ({
            serialNo: idx + 1,
            ...item,
          })) || []
        }
        columns={centerBasedResultHistoryColumns(t, resultStatuses)}
        pagination={{
          language: 'bn',
          totalPage: totalPage,
          activePage: activePage,
          onClick: (page) => {
            setSearchParams({ ...params, page: (page - 1).toString() });
          },
        }}
        loading={loading}
      />
    </div>
  );
};
