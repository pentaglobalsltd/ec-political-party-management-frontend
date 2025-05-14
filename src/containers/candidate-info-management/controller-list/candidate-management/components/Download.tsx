import { useState } from 'react';
import { Button, Modal, encodeQuery } from '@pentabd/ui';
import { useTranslation } from 'react-i18next';
import { useDownloadAttachFile } from '@hooks/miscellaneous/documents/useDownloadAttachFIle';
import { DownloadFileIdType } from '@type/documents/attach-file';
import { URLS } from '@constants/urls';
import PDFViewer from '@components/PDFViewer';
import CandidateImage from '../../candidate-confirmation/components/view-candidate-confirmaion/personal-info/CandidateImage';
import Loader from '@components/Loader';

function Download({
  data,
  isViewFile,
  type,
}: {
  data: DownloadFileIdType;
  isViewFile?: boolean;
  type?: string;
}) {
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);
  const { t } = useTranslation();

  const { downloadAttachFileHandler, fileUrl, loading } =
    useDownloadAttachFile();

  const downloadUrl = () => {
    const url = encodeQuery(
      URLS.DOWNLOAD_CANDIDATE_ATTACH_FILE({
        documentId: data?.documentId,
        fileId: data?.fileId,
      }),
      {
        format: data.formatId as number,
        filePath: data.filePath as string,
      },
    );

    return `${import.meta.env.VITE_DOCUMENT_UPLOAD_URL}${url}`;
  };

  const openModal = () => {
    setIsPreviewModalOpen(true);
    if (type !== 'img')
      downloadAttachFileHandler({
        documentId: data?.documentId,
        fileId: data?.fileId,
        formatId: 2,
        fileType: data?.fileType,
        generateLinkOnly: true,
        filePath: data?.filePath,
      });
  };

  const closeModal = () => {
    setIsPreviewModalOpen(false);
  };

  return (
    <div className="d-flex justify-content-end gap-7">
      <a href={downloadUrl()} download>
        <Button fill="fill" type="primary" htmlType="button">
          {t('CANDIDATE_MANAGEMENT.DOWNLOAD')}
        </Button>
      </a>

      {isViewFile ? (
        <Button
          fill="outline"
          type="primary"
          htmlType="button"
          loading={loading}
          onClick={openModal}
        >
          {t('CANDIDATE_MANAGEMENT.WATCH')}
        </Button>
      ) : null}

      {isPreviewModalOpen ? (
        <Modal
          key={1}
          isOpen={isPreviewModalOpen}
          closeAble
          overlay
          portal
          onClose={closeModal}
        >
          <>
            {type === 'img' ? (
              <CandidateImage image={data} />
            ) : loading ? (
              <Loader />
            ) : (
              <PDFViewer pdfURL={fileUrl as string} />
            )}
          </>
        </Modal>
      ) : null}
    </div>
  );
}

export default Download;
