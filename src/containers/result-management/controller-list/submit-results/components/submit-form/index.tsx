import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { Note, Text } from '@pentabd/ui';
import { FORM_FIELDS } from '@constants/forms';
import { SubmitResultContext } from '../../context/submitResultContext';
import TableForm from './table-form';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import ModalsSubmitForm from './modals';
import {
  POLLING_CENTER_COLORS,
  SUBMISSION_NOTE_COLOR_CLASS,
} from '@constants/polling-center-results';
import { usePollingCentersOpAroOpListSelect } from '@hooks/result-management/submit-results/usePollingCentersOpAroOp';
import { GetPollingCenterResultSummaryForOp } from '@hooks/result-management/submit-results/usePollingCenterResultSummaryForOp';
import { getParams } from '@utils';

const SUBMIT_RESULTS = FORM_FIELDS.RESULT_MANAGEMENT.SUBMIT_RESULTS;

interface SubmitFormProps {
  addResultByCandidate: (data: any) => void;
  success: boolean;
  loading: boolean;
  successLoading: boolean;
  getPollingCenterResultSummaryForOp: (
    obj: GetPollingCenterResultSummaryForOp,
  ) => void;
}

const SubmitForm = ({
  addResultByCandidate,
  success,
  loading,
  successLoading,
  getPollingCenterResultSummaryForOp,
}: SubmitFormProps) => {
  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const { contextData, setContextData, updateModalStates } =
    useContext(SubmitResultContext)!;

  const { getPollingCentersListSelect } =
    usePollingCentersOpAroOpListSelect(setContextData);

  const [submitNoteColor, setSubmitNoteColor] = useState<string>();

  const { isAdmin, subject: userIdElectionUser } = useFiltersRedux();

  const { t } = useTranslation();

  const { watch } = useFormContext();

  const electionSettingsId =
    contextData?.selectedCandidateSettings?.extra?.electionSettingsId;

  const scheduleIdWatch = watch(SUBMIT_RESULTS.SCHEDULE);

  const getStatusOfSelectedPollingCenter = () => {
    const { color: statusOfSelectedPollingCenter }: any =
      contextData?.contextPollingCenters?.find(
        (item: any) => item?.id === Number(contextData?.selectedCenterId),
      ) || {};

    return statusOfSelectedPollingCenter;
  };

  const getNoteStatus = () => {
    const statusOfSelectedPollingCenter = getStatusOfSelectedPollingCenter();

    const noteStatus =
      statusOfSelectedPollingCenter === POLLING_CENTER_COLORS.RED ||
      statusOfSelectedPollingCenter === POLLING_CENTER_COLORS.GREEN;

    return noteStatus;
  };

  const getNoteColor = () => {
    const statusOfSelectedPollingCenter = getStatusOfSelectedPollingCenter();

    const noteColor =
      statusOfSelectedPollingCenter === POLLING_CENTER_COLORS.RED
        ? 'danger'
        : 'success';

    return noteColor;
  };

  useEffect(() => {
    if (submitNoteColor === SUBMISSION_NOTE_COLOR_CLASS.GREEN) {
      setSubmitNoteColor(SUBMISSION_NOTE_COLOR_CLASS.RED);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextData?.isSuccessResult]);

  // 2
  useEffect(() => {
    if (
      scheduleIdWatch &&
      (userIdElectionUser || params?.userId) &&
      electionSettingsId &&
      success
    ) {
      setSubmitNoteColor(SUBMISSION_NOTE_COLOR_CLASS.GREEN);
      updateModalStates({ isSubmitModalOpen: false });

      getPollingCentersListSelect({
        scheduleId: scheduleIdWatch as number,
        electionSettingsId,
        userId: isAdmin ? params?.userId : (userIdElectionUser as string),
      });

      getPollingCenterResultSummaryForOp({
        scheduleId: scheduleIdWatch,
        userId: params?.userId,
        /**
         * this 'userId' is for 'folafol-dakhil-sharangsho'
         * this 'userId' is the loginId of election user, selected by ADMIN
         */
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    scheduleIdWatch,
    electionSettingsId,
    userIdElectionUser,
    success,
    params?.userId,
  ]);

  return (
    <>
      {/* Polling Center Status -> Grey, Green, Yellow, Red */}
      {getNoteStatus() && (
        <Note
          body={
            <Text
              size="lg"
              weight="semibold"
              className={`lh-sm text-${getNoteColor()}`}
            >
              {getStatusOfSelectedPollingCenter() === POLLING_CENTER_COLORS.RED
                ? t('SUBMIT_RESULTS.POLLING_CENTER_NOTIFICATION_RED')
                : t('SUBMIT_RESULTS.POLLING_CENTER_NOTIFICATION_GREEN')}
            </Text>
          }
          classes={`bg-${getNoteColor()}-lightest border-${getNoteColor()} justify-content-center py-6 mt-8`}
        />
      )}

      <TableForm loading={loading} />

      {/* All Modals --------------------------------- */}
      <ModalsSubmitForm
        addResultByCandidate={addResultByCandidate}
        successLoading={successLoading}
        setSubmitNoteColor={setSubmitNoteColor}
        submitNoteColor={submitNoteColor as string}
      />
    </>
  );
};

export default SubmitForm;
