import { useState } from 'react';

import { Modal } from '@pentabd/ui';
import UpdateProfileModal from './UpdateProfileModal';
import { IconUser01 } from '@pentabd/icons';
import { Tooltip } from 'react-tooltip';

import 'react-tooltip/dist/react-tooltip.css';

function UserProfileUpdate({ row }: { row: any }) {
  const [isOpenProfileModal, setIsOpenProfileModal] = useState<boolean>(false);

  const openModal = () => {
    setIsOpenProfileModal(true);
  };

  const closeModal = () => {
    setIsOpenProfileModal(false);
  };

  return (
    <>
      <div
        className="ms-3 px-6 pointer"
        data-tooltip-id="my-tooltip"
        data-tooltip-html="Edit profile"
        onClick={openModal}
      >
        <IconUser01 size="20" fill="primary" />
      </div>
      <Tooltip id="my-tooltip" />
      {isOpenProfileModal ? (
        <Modal
          isOpen={isOpenProfileModal}
          closeAble
          overlay
          onClose={closeModal}
          portal
        >
          <UpdateProfileModal closeProfileHandler={closeModal} rowData={row} />
        </Modal>
      ) : null}
    </>
  );
}

export default UserProfileUpdate;
