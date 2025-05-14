import { IconList } from '@pentabd/icons';
import { useNavigate } from 'react-router';
import { NominationType } from '@type/candidate-info-management/nomination-list-type';
import { ROUTES } from '@constants/routes';

function StatusView({ row }: { row: NominationType }) {
  const navigate = useNavigate();

  const handleStatusHistoryButton = () => {
    const {
      electionSettingsId,
      candidateElectionDetailsId,
      electionTypeId,
      candidateTypeId,
    } = row;

    const candidateInfo = {
      candidateName: row?.candidateName,
      constituency: row?.constituency,
    };

    localStorage.setItem(
      'candidateInfoForStatusHistory',
      JSON.stringify(candidateInfo),
    );

    navigate(
      ROUTES.VIEW_CANDIDATE_STATUS_HISTORY({
        electionSettingsId,
        candidateElectionDetailsId,
        electionTypeId,
        candidateTypeId,
      }),
    );
  };

  return (
    <div className="pointer" onClick={handleStatusHistoryButton}>
      <IconList size="20" fill="primary" />
    </div>
  );
}

export default StatusView;
