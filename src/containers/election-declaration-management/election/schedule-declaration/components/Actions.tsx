import { ROUTES } from '@constants/routes';
import { useDeleteElectionScheduleById } from '@hooks/election-schedule-management/election/election-schedule/useDeleteElectionScheduleById';
import { IconPencil02 } from '@pentabd/icons';
import { ConfirmationModal } from '@pentabd/ui';
import { getParams } from '@utils';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

function Actions({
  raw,
  getElectionDetailsListData,
}: {
  raw: any;
  getElectionDetailsListData: any;
}) {
  const [confirmModelOpen, setConfirmModelOpen] = useState(false);
  const { deleteElectionScheduleById, isDeleteSuccess, setIsDeleteSuccess } =
    useDeleteElectionScheduleById();

  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const closeModal = () => {
    setConfirmModelOpen(false);
  };

  const handleEdit = () => {
    navigate(ROUTES.EDIT_SCHEDULE_DECLARATION(raw?.electionScheduleId));
  };

  const confirmDelete = () => {
    deleteElectionScheduleById(raw?.electionScheduleId);
  };

  // const handleRemove = () => {
  //   setConfirmModelOpen(true);
  // };

  useEffect(() => {
    if (isDeleteSuccess) {
      setConfirmModelOpen(false);
      getElectionDetailsListData({ searchItems: params });
      setIsDeleteSuccess(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleteSuccess]);

  return (
    <>
      <div className="d-flex gap-10">
        <div onClick={handleEdit} className="pointer">
          <IconPencil02 size="20" fill="primary" />
        </div>
        {/* <div onClick={handleRemove} className="pointer">
          <IconTrash01 size="20" fill="danger" />
        </div> */}
      </div>

      {confirmModelOpen ? (
        <ConfirmationModal
          title={t('SCHEDULE_DECLARATION.DELETE')}
          portal
          cancelButton={{
            onClick: closeModal,
            fill: 'outline',
            type: 'primary',
            label: t('SCHEDULE_DECLARATION.MODAL_CANCEL'),
          }}
          confirmButton={{
            onClick: confirmDelete,
            fill: 'fill',
            type: 'danger',
            label: t('SCHEDULE_DECLARATION.MODAL_SUCCESS'),
          }}
          isOpen={confirmModelOpen}
          closeAble
          onClose={closeModal}
        />
      ) : null}
    </>
  );
}

export default Actions;
