import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Button } from '@pentabd/ui';

import { STEPS, STEPS_TYPE } from '@constants/steps';
import { useNominationStepsSelect } from '@hooks/miscellaneous/custom-hook/useNominationStepSelect';
import { useElectionApplicantUpdate } from '@hooks/candidate-info-management/controller-list/useElectionApplicantUpdate';
import { ElectionApplicantTypes } from '@type/candidate-info-management/election-applicant-types';

const ConfirmationButton = () => {
  const { t } = useTranslation();
  const { electionSettingsId, candidateElectionDetailsId, candidateId } =
    useParams();
  const navigate = useNavigate();

  const stepId = STEPS.CANDIDATE_CONFIRMATION;
  const statusType = STEPS_TYPE.AVAILABLE_STATUSES;

  const { options } = useNominationStepsSelect({ stepId, statusType });
  const { electionApplicantUpdate, success, loading } =
    useElectionApplicantUpdate();

  useEffect(() => {
    if (success) {
      navigate(-1);
    }
  }, [success, navigate]);

  const confirmCandidateHandler = () => {
    const ReqBody: ElectionApplicantTypes = {
      id: parseInt(candidateId as string),
      nominationStatusId: parseInt(options[0]?.value as any),
      candidateElectionDetailsId: parseInt(
        candidateElectionDetailsId as string,
      ),
    };

    electionApplicantUpdate({
      data: ReqBody,
      candidateElectionDetailsId,
      electionSettingsId,
    });
  };

  return (
    <div className="d-flex flex-row-reverse border-top py-10">
      <Button
        key={11}
        onClick={confirmCandidateHandler}
        type="info"
        disabled={!stepId}
        loading={loading}
      >
        {t('CANDIDATE_CONFIRMATION.CONFIRM_CANDIDATE')}
      </Button>
    </div>
  );
};

export default ConfirmationButton;
