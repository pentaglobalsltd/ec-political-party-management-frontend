import { Text } from '@pentabd/ui';
import { MESSAGE_SHEET } from '@constants/polling-center-results';
import { GENERATED_BY } from '../constants';
import { useDownloadAttachFile } from '@hooks/miscellaneous/documents/useDownloadAttachFIle';
import SmallLoadingComponent from '@components/small-loading-component';

function AroFileDownload({ row }: { row: any }) {
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

  return row?.generatedBy === GENERATED_BY.ARO ? (
    <div
      className="d-flex gap-6 pointer"
      onClick={() => handleDownloadFile(row?.file)}
    >
      <Text color="primary">{`${MESSAGE_SHEET} - ${row?.sheetSerial}`}</Text>
      {loading ? <SmallLoadingComponent color="#06AED4" /> : null}
    </div>
  ) : null;
}

export default AroFileDownload;
