import { Path } from 'react-router-dom';
import { IconPencil02, IconTrash01 } from '@pentabd/icons';
import { ROUTES } from '@constants/routes';

interface Props {
  rowId: number;
  navigate: (to: string | Partial<Path>) => void;
  deleteDynamicReportByIdData: (id: number) => void;
}

const Actions = ({ rowId, navigate, deleteDynamicReportByIdData }: Props) => {
  return (
    <div className="d-flex gap-4">
      <div
        className="pointer"
        onClick={() => navigate(ROUTES.EDIT_DYNAMIC_REPORT(rowId))}
      >
        <IconPencil02 size="20" fill="primary" />
      </div>
      <div
        className="pointer"
        onClick={() => deleteDynamicReportByIdData(rowId)}
      >
        <IconTrash01 size="20" fill="danger" />
      </div>
    </div>
  );
};

export default Actions;
