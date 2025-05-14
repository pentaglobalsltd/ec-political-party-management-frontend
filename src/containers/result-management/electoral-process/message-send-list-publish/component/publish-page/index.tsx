import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Header, Text } from '@pentabd/ui';

import { useGetMessageSend } from '@hooks/result-management/electoral-process/message-sending-list/useGetMessageSend';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { useDownloadAttachFile } from '@hooks/miscellaneous/documents/useDownloadAttachFIle';
import PDFViewer from '@components/PDFViewer';
import { RESULT_MANAGEMENT } from '@constants/permissions/result-management';
import PublishModal from '../publish-modal';
import { messageSendPublishAndViewBreadcrumbs } from './constant';

const MessageSendListPublishAndView = () => {
  const { t } = useTranslation();
  const { keycloak } = useAuthWrapper();
  const permissionsArray = keycloak.realmAccess?.roles;
  const { id, scheduleId } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState<boolean>(false);

  const {
    downloadAttachFileHandler: downloadAttachFileHandlerFile,
    fileUrl: fileUrlFile,
    loading: loadingFileUrlFile,
  } = useDownloadAttachFile();
  const {
    downloadAttachFileHandler: downloadAttachFileHandlerFinalFile,
    fileUrl: fileUrlFinalFile,
    loading: loadingFileUrlFinalFile,
  } = useDownloadAttachFile();

  // const { updateMessageSend, isSuccess } = useUpdateMessageSend();
  const { messageSendData, getMessageSend } = useGetMessageSend();

  useEffect(() => {
    if (scheduleId && id) {
      // getMessageSend({ scheduleId: 185, id });
      getMessageSend({ scheduleId, id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleId, id, pathname]);

  function hasUndefinedValues(data: any) {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        if (typeof data[key] === 'undefined') {
          return false;
        }
      }
    }
    return true;
  }

  const handlePublish = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (
      messageSendData?.file &&
      hasUndefinedValues(messageSendData?.file) &&
      !fileUrlFile
    ) {
      downloadAttachFileHandlerFile({
        documentId: messageSendData?.file?.documentId,
        fileId: messageSendData?.file?.fileId,
        fileType: messageSendData?.file?.fileType,
        formatId: 2,
        generateLinkOnly: true,
        filePath: messageSendData?.file?.filePath,
      });
    }
    if (
      messageSendData?.finalFile &&
      hasUndefinedValues(messageSendData?.finalFile) &&
      !fileUrlFinalFile
    ) {
      downloadAttachFileHandlerFinalFile({
        documentId: messageSendData?.finalFile?.documentId,
        fileId: messageSendData?.finalFile?.fileId,
        fileType: messageSendData?.finalFile?.fileType,
        formatId: 2,
        generateLinkOnly: true,
        filePath: messageSendData?.finalFile?.filePath,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageSendData]);

  return (
    <div className="container-96">
      <Header
        className="mb-10 pt-10"
        headerText={{
          header: t('MESSAGE_SEND_LIST_PUBLISH.MESSAGE_SEND_LIST_PUBLISH'),
        }}
        breadcrumbs={messageSendPublishAndViewBreadcrumbs(t)}
      />

      <div className="mb-16 d-flex flex-column gap-18">
        {messageSendData?.file && hasUndefinedValues(messageSendData?.file) && (
          <div className="overflow-y-auto pdf-viewer-modal col-span-1">
            <div className="h-100">
              {loadingFileUrlFile ? (
                <Text>Loading...</Text>
              ) : fileUrlFile ? (
                <PDFViewer pdfURL={fileUrlFile} showZoom />
              ) : (
                <Text size="xl" color="danger">
                  No Pdf
                </Text>
              )}
            </div>
          </div>
        )}

        {messageSendData?.finalFile &&
          hasUndefinedValues(messageSendData?.finalFile) && (
            <div className="overflow-y-auto pdf-viewer-modal col-span-1">
              <div className="h-100">
                {loadingFileUrlFinalFile ? (
                  <Text>Loading...</Text>
                ) : fileUrlFinalFile ? (
                  <PDFViewer pdfURL={fileUrlFinalFile} showZoom />
                ) : (
                  <Text size="xl" color="danger">
                    No Pdf
                  </Text>
                )}
              </div>
            </div>
          )}
      </div>
      <div className="d-flex pt-10 justify-content-end gap-12">
        <Button
          size="md"
          key={4}
          type="secondary"
          className="bg-purple text-white"
          htmlType="button"
          onClick={() => navigate(-1)}
        >
          {t('MESSAGE_SEND_LIST_PUBLISH.RETURN_BUTTON')}
        </Button>
        {permissionsArray?.includes(
          RESULT_MANAGEMENT.ELECTION_PROCESS_PUBLISH_BARTA_SHEET,
        ) ? (
          <Button
            size="md"
            key={5}
            fill="fill"
            type="primary"
            htmlType="button"
            onClick={handlePublish}
          >
            {t('MESSAGE_SEND_LIST_PUBLISH.PUBLISH_BUTTON')}
          </Button>
        ) : null}
      </div>

      {scheduleId ? (
        <PublishModal
          isOpen={openModal}
          rowData={messageSendData}
          fromView={true}
          handleCloseModal={handleCloseModal}
          scheduleId={scheduleId}
        />
      ) : null}
    </div>
  );
};

export default MessageSendListPublishAndView;
