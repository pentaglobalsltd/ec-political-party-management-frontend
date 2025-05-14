import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { SubmitResultContext } from '../../../context/submitResultContext';
import { FORM_FIELDS } from '@constants/forms';
import { POLLING_CENTER_COLORS } from '@constants/polling-center-results';
import ResultSubmitForm from './result-submit-form';
import { Button } from '@pentabd/ui';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { RESULT_MANAGEMENT } from '@constants/permissions/result-management';

const SUBMIT_RESULTS = FORM_FIELDS.RESULT_MANAGEMENT.SUBMIT_RESULTS;

interface Props {
  loading: boolean;
}

const TableForm = ({ loading }: Props) => {
  const { t } = useTranslation();
  const { keycloak } = useAuthWrapper();
  const permissionsArray = keycloak.realmAccess?.roles;

  const {
    contextData,
    modalStates,
    updateModalStates,
    submitBtnStates,
    updateButtonStates,
    downloadAttachFileHandler,
  } = useContext(SubmitResultContext)!;

  const currentPollingCenter = contextData?.contextPollingCenters?.find(
    (center) => center.id === contextData?.selectedCenterId,
  );

  const totalVoterOfCenter = currentPollingCenter?.totalVoter;

  const {
    formState: { errors },
    getValues,
    handleSubmit,
  } = useFormContext();

  const uploadedPdfData: any = getValues(SUBMIT_RESULTS.RESULT_FILE);

  const onSubmit = async (data: any) => {
    if (Object.keys(errors).length === 0) {
      if (
        data?.candidatesTotalVote > totalVoterOfCenter ||
        data?.netTotalVotes > totalVoterOfCenter
      ) {
        updateModalStates({
          isErrorModalOpen: true,
          errorText: t('SUBMIT_RESULTS.MODAL_ERROR_2'),
        });
      } else {
        updateButtonStates({ isSubmitBtnLoading: true });

        await downloadAttachFileHandler({
          documentId: uploadedPdfData?.documentId,
          fileId: uploadedPdfData?.fileId,
          fileType: uploadedPdfData?.fileType,
          formatId: 2,
          generateLinkOnly: true,
          filePath: uploadedPdfData?.filePath,
        });

        updateModalStates({ isSubmitModalOpen: true });
        updateButtonStates({ isSubmitBtnLoading: false, submittedData: data });
      }
    }
  };

  const getStatusOfSelectedPollingCenter = () => {
    const { color: statusOfSelectedPollingCenter }: any =
      contextData?.contextPollingCenters?.find(
        (item: any) => item?.id === Number(contextData?.selectedCenterId),
      ) || {};

    return statusOfSelectedPollingCenter;
  };

  const showResultSubmitForm =
    contextData?.selectedCenterId &&
    Object.keys(contextData?.contextResultByCandidates || {}).length !== 0 &&
    (getStatusOfSelectedPollingCenter() === POLLING_CENTER_COLORS.GRAY ||
      getStatusOfSelectedPollingCenter() === POLLING_CENTER_COLORS.GREEN);

  const showFileUpload =
    getStatusOfSelectedPollingCenter() === POLLING_CENTER_COLORS.GRAY &&
    !loading;

  const showResultSubmitBtn =
    showFileUpload &&
    permissionsArray?.includes(
      RESULT_MANAGEMENT.ELECTION_PROCESS_RESULT_SUBMIT,
    );

  return (
    <form
      className="d-flex flex-column box-ex rounded-5 "
      onSubmit={handleSubmit(onSubmit)}
    >
      {showResultSubmitForm && (
        <ResultSubmitForm
          loading={loading}
          isErrorModalOpen={modalStates.isErrorModalOpen as boolean}
        />
      )}

      {/* Open submit modal button - ফলাফল দাখিল করুন */}
      {showResultSubmitBtn ? (
        <div className="d-flex justify-content-end align-items-center border-top pt-8">
          <Button
            key={2}
            htmlType="submit"
            type="success"
            loading={loading || submitBtnStates.isSubmitBtnLoading}
            disabled={submitBtnStates.disableButton}
          >
            {t('SUBMIT_RESULTS.SUBMIT_RESULT')}
          </Button>
        </div>
      ) : null}
    </form>
  );
};

export default TableForm;
