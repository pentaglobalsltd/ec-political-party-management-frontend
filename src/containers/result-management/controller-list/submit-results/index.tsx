import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { Button, Header } from '@pentabd/ui';
import { FORM_FIELDS } from '@constants/forms';
import { submitResultsTableBreadcrumbs } from './constants';

import { useResultByCandidates } from '@hooks/result-management/submit-results/useResultByCandidates';
import { usePollingCenterResultSummaryForOp } from '@hooks/result-management/submit-results/usePollingCenterResultSummaryForOp';

import {
  SubmitResultsOpValidationType,
  submitResultsOpValidation,
} from '@validations/result-management/submit-results/submitResultsOpFormValidation';
import ElectionDetailsSearch from './components/election-details-search';
import SubmitForm from './components/submit-form';

import NotificationComponent from './components/notification-component';
import { useCreateResultByCandidate } from '@hooks/result-management/submit-results/useCreateResultByCandidate';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import {
  ContextDataSubmitResult,
  SubmitResultContext,
} from './context/submitResultContext';
import UploadPdf from './components/UploadPdf';
import { useDownloadAttachFile } from '@hooks/miscellaneous/documents/useDownloadAttachFIle';
import {
  ButtonStates,
  ModalStates,
} from './components/submit-form/modals/types';
import PreviewUploadFileModal from './components/submit-form/modals/PreviewUploadFileModal';
import { POLLING_CENTER_COLORS } from '@constants/polling-center-results';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@constants/routes';
import { TotalVoter } from './components/submit-form/total-voter';

const SUBMIT_RESULTS = FORM_FIELDS.RESULT_MANAGEMENT.SUBMIT_RESULTS;

const SubmitResults = () => {
  const [contextData, setContextData] = useState<ContextDataSubmitResult>();
  const { t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();

  const [fileUploadDisable, setFileUploadDisable] = useState(true);

  const [submitBtnStates, setSubmitBtnStates] = useState({
    disableButton: true,
    isSubmitBtnLoading: false,
    submittedData: {},
  });

  const [modalStates, setModalStates] = useState({
    isErrorModalOpen: false,
    isSubmitModalOpen: false,
    isPreviewModalOpen: false,
    errorText: '',
  });

  const updateButtonStates = (obj: ButtonStates) => {
    setSubmitBtnStates((prev) => ({
      ...prev,
      ...obj,
    }));
  };

  const updateModalStates = (obj: ModalStates) => {
    setModalStates((prev) => ({
      ...prev,
      ...obj,
    }));
  };

  const { electionSettings, electionSchedules, isAdmin } = useFiltersRedux();

  const { getPollingCenterResultSummaryForOp } =
    usePollingCenterResultSummaryForOp({ setContextData, isAdmin });

  const { resultByCandidates, getResultByCandidates, loading } =
    useResultByCandidates(setContextData, updateButtonStates);

  const {
    addResultByCandidate,
    loading: successLoading,
    success,
  } = useCreateResultByCandidate();

  const methods = useForm<SubmitResultsOpValidationType>({
    resolver: yupResolver(submitResultsOpValidation),
    values: {
      [SUBMIT_RESULTS.SCHEDULE]: electionSchedules?.[0]?.value,
      [SUBMIT_RESULTS.CONSTITUENCY]: electionSettings?.[0]?.value,

      [SUBMIT_RESULTS.CANDIDATE_TYPE]: contextData?.candidateType
        ? contextData?.candidateType
        : null,

      [SUBMIT_RESULTS.UNION_OR_WARD]: contextData?.selectedWardId
        ? contextData?.selectedWardId
        : null,

      // ================= below is only for union parishad election =================
      [SUBMIT_RESULTS.UP_UNION_OR_WARD]: contextData?.selectedUpUnionOrWardId
        ? contextData?.selectedUpUnionOrWardId
        : null,

      [SUBMIT_RESULTS.UP_WARD]: contextData?.selectedUpWardId
        ? contextData?.selectedUpWardId
        : null,
      // ================= above is only for union parishad election =================

      [SUBMIT_RESULTS.UPAZILA]: contextData?.selectedUpazilaId
        ? contextData?.selectedUpazilaId
        : null,

      candidateVoteDetails: resultByCandidates?.candidateVoteCounts
        ? resultByCandidates.candidateVoteCounts
        : null,

      [SUBMIT_RESULTS.POLLING_CENTERS]: contextData?.selectedCenterId
        ? contextData?.selectedCenterId
        : null,

      [SUBMIT_RESULTS.TOTAL_LEGAL_VOTE_COUNT]: 0,
      [SUBMIT_RESULTS.TOTAL_ILLEGAL_VOTE_COUNT]:
        contextData?.contextResultByCandidates?.totalIllegalVoteCount || 0,
      [SUBMIT_RESULTS.NET_TOTAL]: 0,
      [SUBMIT_RESULTS.TOTAL_ABSENT_VOTE_COUNT]:
        contextData?.contextResultByCandidates?.totalAbsentVoteCount || 0,
    },
  });

  const { control } = methods;

  useFieldArray({
    name: SUBMIT_RESULTS.CANDIDATE_VOTE_DETAILS,
    control,
  });

  // -------------------------------

  const isPollingCenterGreen = () => {
    const { color: statusOfSelectedPollingCenter }: any =
      contextData?.contextPollingCenters?.find(
        (item: any) => item?.id === Number(contextData?.selectedCenterId),
      ) || {};

    return statusOfSelectedPollingCenter === POLLING_CENTER_COLORS.GREEN;
  };

  const { downloadAttachFileHandler, fileUrl, resetFileUrl } =
    useDownloadAttachFile();

  const showPdf = () => {
    return isPollingCenterGreen() || fileUrl;
  };

  useEffect(() => {
    const isFileExists =
      Object.keys(resultByCandidates?.fileFromOp || {}).length > 0;

    if (isFileExists && isPollingCenterGreen()) {
      const document = resultByCandidates?.fileFromOp;

      downloadAttachFileHandler({
        documentId: document?.documentId,
        fileId: document?.fileId,
        fileType: document?.fileType,
        formatId: 2,
        generateLinkOnly: true,
        filePath: document?.filePath,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultByCandidates?.fileFromOp]);

  return (
    <SubmitResultContext.Provider
      value={{
        contextData: contextData as ContextDataSubmitResult,
        setContextData,

        modalStates,
        updateModalStates,

        submitBtnStates,
        updateButtonStates,

        fileUploadDisable,
        setFileUploadDisable,

        fileUrl,
        resetFileUrl,
        downloadAttachFileHandler,
      }}
    >
      <div className="container-96 mb-24">
        {!isAdmin && (
          <div className="d-flex justify-content-between align-items-center">
            <Header
              className="mb-3 pt-7 border-none"
              breadcrumbs={submitResultsTableBreadcrumbs(t)}
            />
            {params ? (
              <Button
                fill="outline"
                type="light"
                className="mt-16"
                onClick={() =>
                  navigate(`/${ROUTES.RESULT_MANAGEMENT}`, { replace: true })
                }
              >
                {t('RESULTS.RETURN_BUTTON')}
              </Button>
            ) : null}
          </div>
        )}

        {/* Polling center search */}
        <FormProvider {...methods}>
          <div className="d-grid grid-cols-10 mt-5 gap-6">
            {/* 40 */}

            <div className="col-span-4 mt-10 ">
              <UploadPdf
                electionSchedules={electionSchedules}
                disabled={isPollingCenterGreen()}
                className="py-24"
              />
            </div>

            <div className="col-span-6 ">
              <ElectionDetailsSearch
                // isPollingCenterSelected={true}
                getResultByCandidates={getResultByCandidates}
                getPollingCenterResultSummaryForOp={
                  getPollingCenterResultSummaryForOp
                }
              />
            </div>
            <div className="col-span-4">
              {showPdf() && (
                <div
                  className="bg-primary-lightest pb-10"
                  style={{ minHeight: '750px' }}
                >
                  <PreviewUploadFileModal fileUrl={fileUrl as string} />
                </div>
              )}
            </div>
            <div className="col-span-6 ">
              <TotalVoter />
              <SubmitForm
                addResultByCandidate={addResultByCandidate}
                success={success}
                loading={loading}
                successLoading={successLoading}
                getPollingCenterResultSummaryForOp={
                  getPollingCenterResultSummaryForOp
                }
              />
            </div>
          </div>
          <div className="pt-10">
            <NotificationComponent
              getPollingCenterResultSummaryForOp={
                getPollingCenterResultSummaryForOp
              }
            />
          </div>
        </FormProvider>
      </div>
    </SubmitResultContext.Provider>
  );
};

export default SubmitResults;
