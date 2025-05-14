import { ROUTES } from '@constants/routes';
import { IconEye } from '@pentabd/icons';
import { encodeQuery } from '@pentabd/ui';
import { useNavigate } from 'react-router';
import { NominationType } from '@type/candidate-info-management/nomination-list-type';

function View({ row }: { row: NominationType }) {
  const navigate = useNavigate();

  const handleButton = () => {
    const {
      electionSettingsId,
      candidateElectionDetailsId,
      electionApplicantId,
      electionTypeId,
      candidateTypeId,
    } = row;

    navigate(
      encodeQuery(
        ROUTES.VIEW_CANDIDATE_MANAGEMENT({
          electionSettingsId,
          candidateElectionDetailsId,
          electionApplicantId,
          electionTypeId,
          candidateTypeId,
        }),
        {
          nominationPercentage: row?.nominationPercentage as string,
        },
      ),
    );
  };

  return (
    <div className="pointer" onClick={handleButton}>
      <IconEye size="20" fill="primary" />
    </div>
  );
}

export default View;
