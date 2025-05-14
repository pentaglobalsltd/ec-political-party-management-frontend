import { useEffect, useState } from 'react';
import { usePollingCenterDetailsPdfGenerator } from '@hooks/miscellaneous/reports/polling-center-details-pdf-generator';
import { IconDownloadCloud01 } from '@pentabd/icons';
import { Button } from '@pentabd/ui';

function DownloadPollingCenterDetails({ row }: { row: any }) {
  const [rowListLoading, setRowListLoading] = useState<number>();

  // download গেজেটেড ভোটকেন্দ্রের তালিকা pdf
  const {
    downloadPollingCenterDetails,
    getBufferData,
    loading: generatePdfLoading,
    pdfBuffer,
  } = usePollingCenterDetailsPdfGenerator();

  const handlePollingCenterDetailsPdfGenerate = (row: any) => {
    setRowListLoading(row.id);

    getBufferData({
      electionScheduleId: row?.electionScheduleId,
      electionSettingsId: row?.id,
    });
  };

  useEffect(() => {
    if (pdfBuffer) downloadPollingCenterDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdfBuffer]);

  return (
    <Button
      key={rowListLoading}
      type="primary"
      loading={rowListLoading === row.id && generatePdfLoading}
      onClick={() => handlePollingCenterDetailsPdfGenerate(row)}
    >
      <IconDownloadCloud01 fill="light" size="20" />
    </Button>
  );
}

export default DownloadPollingCenterDetails;
