import { useNavigate } from 'react-router-dom';
import { IconList } from '@pentabd/icons';
import { CANDIDATE_INFO } from '@constants/candidate-info';
import { ROUTES } from '@constants/routes';

function ShowStatus({
  row,
  candidateTypeId,
}: {
  row: any;
  candidateTypeId?: string | number;
}) {
  const navigate = useNavigate();

  function generateConstituencyName() {
    switch (Number(candidateTypeId)) {
      case CANDIDATE_INFO.UNION_PARISHAD_CHAIRMAN.ID:
        return row?.unionOrWardName;

      case CANDIDATE_INFO.UNION_PARISHAD_CHAIRMAN.ID:
        return row?.unionWardName;

      case CANDIDATE_INFO.UNION_PARISHAD_RESERVED_MEMBER.ID:
        return row?.unionWardName;
      default:
        return row?.constituencyName;
    }
  }
  const handleStatusHistoryButton = (data: any) => {
    const constituencyName = generateConstituencyName();

    if (constituencyName) {
      navigate({
        pathname: ROUTES.CENTER_BASED_RESULT_HISTORY({
          scheduleId: data?.pollingCenter?.electionScheduleId,
          resultId: data?.id,
        }),
        search: `zillaName=${data?.zillaName}&constituencyName=${constituencyName}&serial=${data?.serial}&pollingCenterName=${data?.pollingCenterName}`,
      });
    }
  };

  return (
    <div className="pointer" onClick={() => handleStatusHistoryButton(row)}>
      <IconList size="20" fill="primary" />
    </div>
  );
}

export default ShowStatus;
