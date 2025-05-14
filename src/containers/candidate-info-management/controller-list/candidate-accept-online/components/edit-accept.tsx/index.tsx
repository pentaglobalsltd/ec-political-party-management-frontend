import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Header } from '@pentabd/ui';

import { APPLICATION_STATUS, acceptBreadcrumbs } from '../../constants';
import { useIndividualCandidateElectionDetails } from '@hooks/candidate-info-management/nomination-list/useIndividualCandidateElectionDetails';
import NominationAcceptanceForm from '../NominationAcceptanceForm';
import CandidateSummary from '@containers/candidate-info-management/controller-list/candidate-applied-online/components/CandidateSummary';

const EditAccept = () => {
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
        breadcrumbs={acceptBreadcrumbs(t)}
      />
      <CandidateSummary candidateDetails={candidateDetails} />

      {candidateDetails?.nominationStatusId === APPLICATION_STATUS.VERIFY && (
        <NominationAcceptanceForm candidateDetails={candidateDetails} />
      )}
    </div>
  );
};

export default EditAccept;
