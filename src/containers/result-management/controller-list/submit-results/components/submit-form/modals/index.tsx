import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { Modal } from '@pentabd/ui';
import PreviewUploadFileModal from './PreviewUploadFileModal';
import ErrorModal from './ErrorModal';
import SubmitModal from './submit-modal';
import { SubmitResultContext } from '../../../context/submitResultContext';
import { FORM_FIELDS } from '@constants/forms';
import {
  POLLING_CENTER_COLORS,
  SUBMISSION_NOTE_COLOR_CLASS,
} from '@constants/polling-center-results';

const SUBMIT_RESULTS = FORM_FIELDS.RESULT_MANAGEMENT.SUBMIT_RESULTS;

interface Props {
  submitNoteColor: string;
  setSubmitNoteColor: (x?: string) => void;
  addResultByCandidate: (data: any) => void;
  successLoading: boolean;
}

const ModalsSubmitForm = ({
  submitNoteColor,
  setSubmitNoteColor,

  addResultByCandidate,
  successLoading,
}: Props) => {
  const { t } = useTranslation();

  const {
    contextData,
    modalStates,
    updateModalStates,
    submitBtnStates,
    updateButtonStates,
    fileUrl,
  } = useContext(SubmitResultContext)!;

  const {
    watch,
    setValue,
    formState: { isDirty },
  } = useFormContext();
  const scheduleIdWatch = watch(SUBMIT_RESULTS.SCHEDULE);

  const closePreviewModal = () => {
    updateModalStates({ isPreviewModalOpen: false });
  };

  const closeErrorModal = () => {
    updateModalStates({ isErrorModalOpen: false });
  };

  const closeSubmitModal = () => {
    updateModalStates({ isSubmitModalOpen: false });
  };

  const pollingCenter = contextData?.contextPollingCenters?.find(
    (item: any) => item?.id === contextData?.selectedCenterId,
  );

  const handleSubmit = () => {
    const mappedData = {
      pollingCenterId: pollingCenter?.id,
      electionSettingsId:
        contextData?.selectedCandidateSettings?.extra?.electionSettingsId,
      electionScheduleId: scheduleIdWatch,
      candidateTypeId: contextData?.candidateType,

      candidateVoteCounts:
        submitBtnStates.submittedData?.candidateVoteDetails?.map(
          (item: any) => ({
            ...item,
            pollingCenterId: pollingCenter?.id,
            electionSettingsId:
              contextData?.selectedCandidateSettings?.extra?.electionSettingsId,
            electionScheduleId: scheduleIdWatch,
            candidateTypeId: submitBtnStates.submittedData?.candidateType,
            pollingCenterResultId: contextData?.contextResultByCandidates?.id,
          }),
        ),

      totalLegalVoteCount: submitBtnStates.submittedData?.totalLegalVoteCount,
      totalIllegalVoteCount:
        submitBtnStates.submittedData?.totalIllegalVoteCount,
      fileFromOp: submitBtnStates.submittedData?.resultFile,
    };

    addResultByCandidate(mappedData);
  };

  // 5 - show error modal for this type of polling center
  useEffect(() => {
    const { color: statusOfSelectedPollingCenter }: any =
      contextData?.contextPollingCenters?.find(
        (item: any) => item?.id === Number(contextData?.selectedCenterId),
      ) || {};

    // if (statusOfSelectedPollingCenter === POLLING_CENTER_COLORS.YELLOW) {
    //   updateModalStates({
    //     isErrorModalOpen: true,
    //     errorText: t('SUBMIT_RESULTS.POLLING_CENTER_NOTIFICATION_YELLOW'),
    //   });
    // }

    // show notification for this type of polling center
    if (statusOfSelectedPollingCenter === POLLING_CENTER_COLORS.GREEN) {
      updateButtonStates({ isSubmitBtnLoading: true });
      submitNoteColor !== SUBMISSION_NOTE_COLOR_CLASS.GREEN &&
        setSubmitNoteColor(SUBMISSION_NOTE_COLOR_CLASS.RED);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextData?.contextPollingCenters]);

  // calculation of total votes
  let totalCandidateVotes: number = 0;
  let grandTotal: number = 0;

  const candidateVoteDetailsWatch = watch(
    SUBMIT_RESULTS.CANDIDATE_VOTE_DETAILS,
  ) as [];

  const totalIllegalVoteCountWatch = watch(
    SUBMIT_RESULTS.TOTAL_ILLEGAL_VOTE_COUNT,
  ) as number;

  const currentPollingCenter = contextData?.contextPollingCenters?.find(
    (center) => center.id === contextData?.selectedCenterId,
  );

  const totalVoterOfCenter = currentPollingCenter?.totalVoter;

  if (candidateVoteDetailsWatch?.length) {
    candidateVoteDetailsWatch?.forEach((item: any) => {
      if (item?.totalLegalVoteCount) {
        totalCandidateVotes += parseInt(item?.totalLegalVoteCount, 10);
      }
    });
    grandTotal = totalCandidateVotes + Number(totalIllegalVoteCountWatch);

    const absentVoter = pollingCenter?.totalVoter - grandTotal;

    setValue(SUBMIT_RESULTS.TOTAL_LEGAL_VOTE_COUNT, totalCandidateVotes);
    setValue(SUBMIT_RESULTS.NET_TOTAL, grandTotal);

    /**
     * don't set absent value when
     * the form is untouched for the 1st time
     * and absentVoter===totalVoters
     */
    if (grandTotal && isDirty) {
      setValue(SUBMIT_RESULTS.TOTAL_ABSENT_VOTE_COUNT, absentVoter);
    }
  }

  // 4
  useEffect(() => {
    if (
      contextData?.contextResultByCandidates?.totalIllegalVoteCount &&
      contextData?.contextResultByCandidates?.totalIllegalVoteCount
    ) {
      grandTotal =
        // eslint-disable-next-line react-hooks/exhaustive-deps
        contextData?.contextResultByCandidates?.totalIllegalVoteCount +
        contextData?.contextResultByCandidates?.totalIllegalVoteCount;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextData?.selectedCenterId, totalVoterOfCenter]);

  // 6 - show error modal for grandTotal value exceeding মোট ভোটার সংখ্যা
  useEffect(() => {
    if (grandTotal > totalVoterOfCenter) {
      updateModalStates({
        isErrorModalOpen: true,
        errorText: t('SUBMIT_RESULTS.MODAL_ERROR_2'),
      });
    } else {
      updateModalStates({ isErrorModalOpen: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextData?.selectedCenterId, grandTotal, totalVoterOfCenter]);

  return (
    <>
      {/* preview file upload modal */}
      <Modal
        key={1}
        isOpen={modalStates.isPreviewModalOpen}
        closeAble
        overlay
        portal
        onClose={closePreviewModal}
      >
        <PreviewUploadFileModal fileUrl={fileUrl as string} />
      </Modal>

      {/* error modal */}
      <Modal
        key={4}
        isOpen={modalStates.isErrorModalOpen}
        closeAble
        overlay
        portal
        onClose={closeErrorModal}
      >
        <ErrorModal
          errorText={modalStates.errorText}
          closeErrorModal={closeErrorModal}
        />
      </Modal>

      {/* submit results modal  */}
      {modalStates.isSubmitModalOpen && (
        <Modal
          key={3}
          isOpen={modalStates.isSubmitModalOpen}
          closeAble
          overlay
          portal
          onClose={closeSubmitModal}
        >
          <SubmitModal
            pollingCenter={contextData?.contextPollingCenters?.find(
              (item: any) => item?.id === contextData?.selectedCenterId,
            )}
            closeSubmitModal={closeSubmitModal}
            fileUrl={fileUrl}
            data={submitBtnStates.submittedData}
            successLoading={successLoading}
            handleSubmit={handleSubmit}
          />
        </Modal>
      )}
    </>
  );
};

export default ModalsSubmitForm;
