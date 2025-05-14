import { yupResolver } from '@hookform/resolvers/yup';
import { getParams } from '@utils';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { Header, Modal, Text } from '@pentabd/ui';

import { PDFViewer, PreviewUploadFileModal } from './components';

import { FORM_FIELDS } from '@constants/forms';
import { USER_TYPES } from '@constants/user-types';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { useDownloadAttachFile } from '@hooks/miscellaneous/documents/useDownloadAttachFIle';
import { useBartaSheetPdfGenerator } from '@hooks/miscellaneous/reports/barta-sheet-pdf-generator';
import {
  MessageSendListPrepareValidationType,
  messageSendListPrepareValidation,
} from '@validations/result-management/electoral-process/messageSendListPrepareValidation';
import { messageSendListPrepareBreadcrumbs } from './constants';
import Loader from '@components/Loader';
import {
  conditionalRequiredField,
  searchStructElectionUser,
} from './searchConstantsElectionUser';
import { allSelectedData, structSearch } from './searchConstants';
import ElectionWiseSubmitFile from './components/election-wise-submit-file';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { MessageSendListPrepareSearch } from './components/MessageSendListPrepareSearch';

export const MESSAGE_SEND_LIST_PREPARE =
  FORM_FIELDS.RESULT_MANAGEMENT.MESSAGE_SEND_LIST_PREPARE;

const MessageSendListPrepare = () => {
  const { t } = useTranslation();
  const { keycloak } = useAuthWrapper();
  const permissionsArray = keycloak.realmAccess?.roles;
  const userType = keycloak?.tokenParsed?.userType;
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);
  const {
    electionTypeId,
    electionScheduleId,
    electionSettingsId,
    candidateTypeId,
    userId,
  } = params;
  const { electionTypes, isAdmin } = useFiltersRedux();
  const {
    pdfBuffer,
    downloadBartaSheet,
    getBufferData,
    error,
    setPdfBuffer,
    loading: showPdfLoading,
  } = useBartaSheetPdfGenerator();

  const {
    downloadAttachFileHandler,
    fileUrl,
    loading: pdfLoading,
  } = useDownloadAttachFile();

  const methods = useForm<MessageSendListPrepareValidationType>({
    resolver: yupResolver(messageSendListPrepareValidation),
  });

  const {
    watch,
    trigger,
    formState: { errors },
  } = methods;

  const electionType = isAdmin ? electionTypeId : electionTypes?.[0]?.value;

  useEffect(() => {
    if (
      electionScheduleId &&
      electionSettingsId &&
      candidateTypeId &&
      userId &&
      !pdfBuffer
    ) {
      getBufferData(
        {
          electionScheduleId,
          candidateTypeId,
        },
        {
          electionSettingsId,
          userId,
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const onSubmitSearch = (data: any) => {
    getBufferData(
      {
        electionScheduleId: data?.electionScheduleId,
        candidateTypeId: data?.candidateTypeId,
      },
      {
        electionSettingsId: data?.electionSettingsId,
        userId: data?.userId,
      },
    );
  };

  const handleDownloadForm = async () => {
    if (userType === USER_TYPES.ADMIN) {
      downloadBartaSheet(params.userTypeCode);
    } else downloadBartaSheet();
  };

  // for PDF preview
  const uploadedPdfData: any = watch();

  const handlePreviewButton = async () => {
    await trigger(MESSAGE_SEND_LIST_PREPARE.ATTACH_FILE);
    if (Object.keys(errors).length === 0) {
      await downloadAttachFileHandler({
        documentId: uploadedPdfData?.attachFile?.documentId,
        fileId: uploadedPdfData?.attachFile?.fileId,
        fileType: uploadedPdfData?.attachFile?.fileType,
        formatId: 2,
        generateLinkOnly: true,
        filePath: uploadedPdfData?.attachFile?.filePath,
      });

      setIsOpenModal(true);
    }
  };

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-12 pt-14"
        headerText={{
          header: t('MESSAGE_SEND_LIST_PREPARE.MESSAGE_SEND_LIST_PREPARE'),
        }}
        breadcrumbs={messageSendListPrepareBreadcrumbs(t)}
      />

      <MessageSendListPrepareSearch
        setSearchParams={setSearchParams}
        searchStructAdmin={structSearch}
        searchStructElectionUser={searchStructElectionUser}
        conditionalRequiredField={conditionalRequiredField}
        allSelectedDataForSearch={allSelectedData}
        onSubmitSearch={onSubmitSearch}
      />

      {showPdfLoading ? <Loader position="align-items-start" /> : null}

      {pdfBuffer ? (
        <>
          <PDFViewer
            pdfBuffer={pdfBuffer}
            showList
            showZoom
            handlePrint={handleDownloadForm}
          />
          <FormProvider {...methods}>
            <ElectionWiseSubmitFile
              electionTypeId={Number(electionType)}
              handlePreviewButton={handlePreviewButton}
              setPdfBuffer={setPdfBuffer}
              pdfLoading={pdfLoading}
              electionScheduleId={electionScheduleId}
              electionSettingsId={electionSettingsId}
              permissionsArray={permissionsArray}
              userId={userId}
              userType={userType}
            />
          </FormProvider>
        </>
      ) : (
        error &&
        error.isError && (
          <div className="bg-light border rounded-5 p-14 text-center">
            <Text color="danger" weight="bold">
              {error.message || ''}
            </Text>
          </div>
        )
      )}

      {isOpenModal ? (
        <Modal
          key={1}
          isOpen={isOpenModal}
          closeAble
          overlay
          portal
          onClose={closeModal}
        >
          <PreviewUploadFileModal fileUrl={fileUrl} />
        </Modal>
      ) : null}
    </div>
  );
};

export default MessageSendListPrepare;
