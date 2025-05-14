import { IconDownload01 } from '@pentabd/icons';
import { Button } from '@pentabd/ui';
import { useDownloadAttachFile } from '@hooks/miscellaneous/documents/useDownloadAttachFIle';

function Download({ data }: { data: any }) {
  const { downloadAttachFileHandler, loading } = useDownloadAttachFile();

  const handleDownloadFile = () => {
    downloadAttachFileHandler({
      documentId: data?.documentId,
      fileId: data?.fileId,
      fileType: data?.fileType,
      formatId: 2,
      filePath: data?.filePath,
    });
  };

  return (
    <Button loading={loading} type="primary" onClick={handleDownloadFile}>
      <IconDownload01 fill="light" size="20" />
    </Button>
  );
}

export default Download;
