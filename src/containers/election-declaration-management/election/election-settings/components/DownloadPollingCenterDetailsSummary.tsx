import { useEffect, useState } from 'react';
import { usePollingCenterDetailsSummaryPdfGenerator } from '@hooks/miscellaneous/reports/polling-center-details-summary-pdf-generator';
import { IconDownloadCloud01 } from '@pentabd/icons';
import { Button } from '@pentabd/ui';

function DownloadPollingCenterDetailsSummary({ row }: { row: any }) {
  const [rowSummaryLoading, setRowSummaryLoading] = useState<number>();

  const {
    downloadPollingCenterDetailsSummary,
    getBufferData: getSummaryBufferData,
    loading: generatePdfSummaryLoading,
    pdfBuffer: summaryPdfBuffer,
  } = usePollingCenterDetailsSummaryPdfGenerator();

  const handlePollingCenterDetailsSummaryPdfGenerate = (row: any) => {
    setRowSummaryLoading(row.id);

    getSummaryBufferData({
      electionScheduleId: row?.electionScheduleId,
      electionSettingsId: row?.id,
    });
  };

  useEffect(() => {
    if (summaryPdfBuffer) downloadPollingCenterDetailsSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [summaryPdfBuffer]);

  return (
    <Button
      type="primary"
      loading={rowSummaryLoading === row.id && generatePdfSummaryLoading}
      onClick={() => handlePollingCenterDetailsSummaryPdfGenerate(row)}
    >
      <IconDownloadCloud01 fill="light" size="20" />
    </Button>
  );
}

export default DownloadPollingCenterDetailsSummary;
