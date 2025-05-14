import { useState, useTransition } from 'react';
import { Modal, Text } from '@pentabd/ui';
import { MessageSendingType } from '@type/result-management/electoral-process/message-sending-list/message-sending-list-type';
import { getDigitBanglaFromEnglish } from '@utils';
import VoteCenterListModalView from './vote-center-list-modal-view';

function CenterList({ data }: { data: MessageSendingType[] }) {
  const [isPending, startTransition] = useTransition();
  const [isVoteCenterListModalOpen, setIsVoteCenterListModalOpen] =
    useState<boolean>(false);

  const openVoteCenterListModal = async () => {
    setIsVoteCenterListModalOpen(true);
  };

  const closeVoteCenterListModal = () => {
    startTransition(() => {
      setIsVoteCenterListModalOpen(false);
    });
  };

  return (
    <>
      {data?.length === 0 ? (
        <Text>{getDigitBanglaFromEnglish(data?.length)}</Text>
      ) : (
        <span className="pointer" onClick={openVoteCenterListModal}>
          <Text color="primary">{getDigitBanglaFromEnglish(data?.length)}</Text>
        </span>
      )}

      {!isPending ? (
        <Modal
          key={3}
          isOpen={isVoteCenterListModalOpen}
          closeAble
          overlay
          portal
          onClose={closeVoteCenterListModal}
        >
          <VoteCenterListModalView data={data} />
        </Modal>
      ) : null}
    </>
  );
}

export default CenterList;
