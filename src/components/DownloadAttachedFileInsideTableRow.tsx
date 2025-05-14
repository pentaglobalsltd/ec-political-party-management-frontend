import { Text } from '@pentabd/ui';

import SmallLoadingComponent from '@components/small-loading-component';
import { useDownloadAttachFile } from '@hooks/miscellaneous/documents/useDownloadAttachFIle';

const DownloadAttachFile = ({
  label,
  documentId,
  fileId,
  fileType,
  formatId,
  filePath,
}: {
  label: string;
  documentId: string;
  fileId: string;
  fileType: string;
  formatId: number;
  filePath: string;
}) => {
  const { loading, downloadAttachFileHandler } = useDownloadAttachFile();

  return (
    <div
      onClick={() => {
        downloadAttachFileHandler({
          documentId,
          fileId,
          fileType,
          formatId,
          filePath,
        });
      }}
    >
      <div className="d-flex gap-6">
        <Text color="primary" className="pointer">
          {label}
        </Text>
        {loading ? <SmallLoadingComponent color="#06AED4" /> : null}
      </div>
    </div>
  );
};

export default DownloadAttachFile;
