import { IconDownloadCloud01 } from '@pentabd/icons';
import { Button } from '@pentabd/ui';

import { useDownloadAttachFile } from '@hooks/miscellaneous/documents/useDownloadAttachFIle';

function StatusDownload({ file }: { file: any }) {
  const { downloadAttachFileHandler } = useDownloadAttachFile();
  return (
    <Button
      size="md"
      className="border px-6"
      onClick={() => {
        downloadAttachFileHandler({
          documentId: file?.documentId,
          fileId: file?.fileId,
          formatId: 2,
          fileType: file?.fileType,
          filePath: file?.filePath,
        });
      }}
      disabled={!file}
    >
      <IconDownloadCloud01 size="17" />
    </Button>
  );
}

export default StatusDownload;
