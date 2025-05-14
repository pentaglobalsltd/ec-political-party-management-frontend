import { Button } from '@pentabd/ui';
import { useTranslation } from 'react-i18next';

import { useDownloadAttachFile } from '@hooks/miscellaneous/documents/useDownloadAttachFIle';
import { DownloadFileIdType } from '@type/documents/attach-file';

function DownloadFile({ data }: { data: DownloadFileIdType }) {
  const { t } = useTranslation();
  const { downloadAttachFileHandler, loading } = useDownloadAttachFile();
  return (
    <div>
      {data ? (
        <Button
          fill="outline"
          type="primary"
          loading={loading}
          onClick={() => {
            downloadAttachFileHandler({
              documentId: data?.documentId,
              fileId: data?.fileId,
              fileType: data?.fileType,
              formatId: 2,
              filePath: data?.filePath,
            });
          }}
        >
          {t('CANDIDATE_CONFIRMATION.DOWNLOAD')}
        </Button>
      ) : null}
    </div>
  );
}

export default DownloadFile;
