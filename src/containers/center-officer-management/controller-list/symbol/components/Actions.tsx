import { useState } from 'react';
import { ROUTES } from '@constants/routes';
import { IconEye, IconPencil02 } from '@pentabd/icons';
import { Modal } from '@pentabd/ui';
import { useNavigate } from 'react-router-dom';
import ViewModal from './view-modal';

function Actions({ row }: { row: any }) {
  const [showModal, setShowModal] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(ROUTES.EDIT_SYMBOL(row.id));
  };

  const handleViewButton = (data: any) => {
    setShowModal(true);
  };

  const closeViewModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="d-flex flex-row gap-12 justify-content-end align-items-center">
        <div className="pointer" onClick={handleViewButton}>
          <IconEye size="22" fill="primary" />
        </div>
        <div className="pointer" onClick={handleNavigate}>
          <IconPencil02 size="22" fill="primary" />
        </div>
      </div>
      {showModal ? (
        <Modal
          key={3}
          isOpen={showModal}
          closeAble
          overlay
          portal
          onClose={closeViewModal}
        >
          <ViewModal selectedSymbol={row} />
        </Modal>
      ) : null}
    </>
  );
}

export default Actions;
