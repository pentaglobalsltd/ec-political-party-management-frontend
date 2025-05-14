import { Text } from '@pentabd/ui';

import { MESSAGE_SHEET } from '@constants/polling-center-results';
import { FINAL_SHEET_STATUS, GENERATED_BY } from '../constants';
import { useDownloadAttachFile } from '@hooks/miscellaneous/documents/useDownloadAttachFIle';
import SmallLoadingComponent from '@components/small-loading-component';

function RoFileDownload({ row }: { row: any }) {
  const { downloadAttachFileHandler, loading } = useDownloadAttachFile();

  const handleDownloadFile = (data: any) => {
    downloadAttachFileHandler({
      documentId: data?.documentId,
      fileId: data?.fileId,
      fileType: data?.fileType,
      formatId: 2,
      filePath: data?.filePath,
    });
  };

  if (
    row?.generatedBy === GENERATED_BY.RO &&
    row?.sheetStatus === FINAL_SHEET_STATUS
  ) {
    return (
      <div
        className="d-flex gap-6 pointer"
        onClick={() => handleDownloadFile(row?.finalFile)}
      >
        <Text color="primary">{`${MESSAGE_SHEET} - ${row?.sheetSerial}`}</Text>
        {loading ? <SmallLoadingComponent color="#06AED4" /> : null}
      </div>
    );
  } else if (
    row?.generatedBy === GENERATED_BY.RO &&
    row?.sheetStatus !== FINAL_SHEET_STATUS
  ) {
    return (
      <div
        className="d-flex gap-6 pointer"
        onClick={() => handleDownloadFile(row?.file)}
      >
        <Text color="primary">{`${MESSAGE_SHEET} - ${row?.sheetSerial}`}</Text>
        {loading ? <SmallLoadingComponent color="#06AED4" /> : null}
      </div>
    );
  } else {
    return null;
  }
}

export default RoFileDownload;
