import { useEffect } from 'react';
import { t } from 'i18next';
import { Table } from '@pentabd/ui';
import { descriptionTableColumn, summaryTableColumn } from '../../constants';
import { useGetPollingCenterSummaryARO } from '@hooks/result-management/electoral-process/results/useGetPollingCenterSummaryARO';

export default function DefaultElection({
  scheduleId,
}: {
  scheduleId?: string | number;
}) {
  const {
    summary,
    getPollingCenterSummary,
    description,
    candidateTypeName,
    loading,
  } = useGetPollingCenterSummaryARO();
  useEffect(() => {
    if (scheduleId) {
      getPollingCenterSummary(scheduleId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleId]);

  return (
    <div className="d-flex justify-content-between col-span-5 gap-8">
      <div className="flex-fill">
        <Table
          isShowColumnHeader={false}
          loading={loading}
          columns={summaryTableColumn()}
          rows={summary || []}
        />
      </div>

      <div className="flex-fill">
        <Table
          loading={loading}
          columns={descriptionTableColumn(t, candidateTypeName)}
          rows={description || []}
        />
      </div>
    </div>
  );
}
