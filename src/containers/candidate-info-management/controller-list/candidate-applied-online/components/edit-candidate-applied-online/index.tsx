import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Header } from '@pentabd/ui';

import {
  APPLICATION_STATUS,
  candidateAppliedOnlineBreadcrumbs,
} from '../../constants';
import AcknowledgementReceiptForm from '../AcknowledgementReceiptForm';
import CandidateSummary from '../CandidateSummary';
import { useIndividualCandidateElectionDetails } from '@hooks/candidate-info-management/nomination-list/useIndividualCandidateElectionDetails';

const EditCandidateAppliedOnline = () => {
  const { t } = useTranslation();

  const { electionSettingsId, candidateElectionDetailsId } = useParams();
  const { candidateDetails } = useIndividualCandidateElectionDetails({
    electionSettingsId,
    candidateElectionDetailsId,
  });

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-12 pt-10"
        headerText={{
          header: `${candidateDetails?.candidateName || ''}${
            candidateDetails?.candidateType
              ? `(${candidateDetails?.candidateType})`
              : ''
          }`,
        }}
        breadcrumbs={candidateAppliedOnlineBreadcrumbs(t)}
      />
      <CandidateSummary candidateDetails={candidateDetails} />

      {candidateDetails?.nominationStatusId ===
        APPLICATION_STATUS.ONLINE_NOMINATION_SUBMIT && (
        <AcknowledgementReceiptForm
          candidateSerial={candidateDetails?.formSerialNo}
          candidateLocation={candidateDetails?.constituency}
          candidateName={candidateDetails?.candidateName}
          finalSubmissionDate={candidateDetails?.finalSubmissionDate}
          electionScheduleId={candidateDetails?.electionScheduleId}
        />
      )}
    </div>
  );
};

export default EditCandidateAppliedOnline;
