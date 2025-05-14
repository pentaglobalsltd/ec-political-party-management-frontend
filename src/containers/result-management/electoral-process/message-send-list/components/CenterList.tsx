import { useState, useTransition } from 'react';
import { Modal, Text } from '@pentabd/ui';

import VoteCenterListModal from './VoteCenterListModal';
import { getDigitBanglaFromEnglish } from '@utils';

function CenterList({ row }: { row: any }) {
  const [isPending, startTransition] = useTransition();

  const [includedPollingCenters, setIncludedPollingCenters] = useState([]);
  const [isVoteCenterListModalOpen, setIsVoteCenterListModalOpen] =
    useState<boolean>(false);

  const openVoteCenterListModal = (data: any) => {
    const sortedData = data.sort(
      (item: any, nextItem: any) =>
        item.pollingCenterSerial - nextItem.pollingCenterSerial,
    );

    setIncludedPollingCenters(sortedData);
    setIsVoteCenterListModalOpen(true);
  };

  const closeVoteCenterListModal = () => {
    startTransition(() => {
      setIsVoteCenterListModalOpen(false);
    });
  };

  return (
    <>
      {row?.bartaSheetPollingCenterResults?.length === 0 ? (
        <Text color="primary">
          {getDigitBanglaFromEnglish(
            row?.bartaSheetPollingCenterResults?.length,
          )}
        </Text>
      ) : (
        <span
          className="pointer"
          onClick={() =>
            openVoteCenterListModal(row?.bartaSheetPollingCenterResults)
          }
        >
          <Text color="primary">
            {getDigitBanglaFromEnglish(
              row?.bartaSheetPollingCenterResults?.length,
            )}
          </Text>
        </span>
      )}

      {!isPending ? (
        <Modal
          key={2}
          isOpen={isVoteCenterListModalOpen}
          closeAble
          overlay
          portal
          onClose={closeVoteCenterListModal}
        >
          <VoteCenterListModal
            includedPollingCenters={includedPollingCenters}
          />
        </Modal>
      ) : null}
    </>
  );
}

export default CenterList;
