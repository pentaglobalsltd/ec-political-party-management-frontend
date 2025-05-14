import { IconEdit02 } from '@pentabd/icons';
import CreatePollingInstitute from '../CreatePollingInstitute';
import { Modal } from '@pentabd/ui';
import { useState } from 'react';
import { GetPollingPollingInstitutes } from '@api/vote-center-management/center-management/polling-institute/polling-institutes';

function Actions({
  raw,
  getPollingInstitutesList,
}: {
  raw: any;
  getPollingInstitutesList?: (obj: GetPollingPollingInstitutes) => void;
}) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const rowEditClicked = () => {
    setIsOpenModal(true);
  };

  return (
    <>
      <div className="pointer  " onClick={rowEditClicked}>
        <IconEdit02 fill="primary" size="24" />
      </div>

      {/* edit modal */}
      {isOpenModal ? (
        <Modal
          portal
          isOpen={isOpenModal}
          closeAble
          overlay
          onClose={closeModal}
        >
          <CreatePollingInstitute
            pollingInstituteId={raw?.id}
            closeModal={closeModal}
            getPollingInstitutesList={() =>
              getPollingInstitutesList &&
              getPollingInstitutesList({
                queryParams: {
                  upazilaId: raw?.upazila?.id,
                  unionOrWardId: raw?.unionOrWard?.id,
                  nameBn: raw?.nameBn,
                },
              })
            }
          />
        </Modal>
      ) : null}
    </>
  );
}

export default Actions;
