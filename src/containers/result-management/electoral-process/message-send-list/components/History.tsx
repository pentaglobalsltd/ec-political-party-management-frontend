import { ROUTES } from '@constants/routes';
import { IconList } from '@pentabd/icons';
import { useNavigate } from 'react-router-dom';

function History({ row }: { row: any }) {
  const navigate = useNavigate();

  const handleStatusHistoryButton = () => {
    navigate({
      pathname: ROUTES.MESSAGE_SEND_LIST_HISTORY({
        scheduleId: row?.electionScheduleId,
        bartaSheetId: row?.id,
        electionTypeId: row?.electionTypeId,
        candidateTypeId: row?.candidateTypeId,
      }),
    });
  };

  return (
    <div className="pointer" onClick={handleStatusHistoryButton}>
      <IconList size="20" fill="primary" />
    </div>
  );
}

export default History;
