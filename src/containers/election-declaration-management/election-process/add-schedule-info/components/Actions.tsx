import { IconEdit02 } from '@pentabd/icons';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@constants/routes';

function Actions({ row }: { row: any }) {
  const navigate = useNavigate();

  const handleRowEdit = () => {
    if (row.id) {
      navigate(
        `${ROUTES.ELECTION_DECLARATION_MANAGEMENT}/${
          ROUTES.ADD_SCHEDULE_INFO
        }/${ROUTES.EDIT_ELECTION_SCHEDULE_INFO(row.id)}`,
      );
    } else {
      navigate(
        `${ROUTES.ELECTION_DECLARATION_MANAGEMENT}/${
          ROUTES.ADD_SCHEDULE_INFO
        }/${ROUTES.CREATE_ELECTION_SCHEDULE_INFO(row.electionSettingsId)}`,
      );
    }
  };

  return (
    <div className="pointer" onClick={handleRowEdit}>
      <IconEdit02 fill="primary" size="24" />
    </div>
  );
}

export default Actions;
