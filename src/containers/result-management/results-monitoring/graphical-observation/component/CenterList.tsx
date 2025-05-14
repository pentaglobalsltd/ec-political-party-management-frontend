import { useState } from 'react';
import { Text } from '@pentabd/ui';
import { getDigitBanglaFromEnglish } from '@utils';
import { Modal } from '@pentabd/ui';
import VoteCenterListModal from '@containers/result-management/electoral-process/message-send-list/components/VoteCenterListModal';

function CenterList({ row }: { row: any }) {
  const [includedPollingCenters, setIncludedPollingCenters] = useState([]);
  const [isVoteCenterListModalOpen, setIsVoteCenterListModalOpen] =
    useState<boolean>(false);

  const closeVoteCenterListModal = () => {
    setIsVoteCenterListModalOpen(false);
  };

  const openVoteCenterListModal = (data: any) => {
    const sortedData = data.sort(
      (item: any, nextItem: any) =>
        item.pollingCenterSerial - nextItem.pollingCenterSerial,
    );
    setIncludedPollingCenters(sortedData);
    setIsVoteCenterListModalOpen(true);
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

      {includedPollingCenters?.length > 0 && isVoteCenterListModalOpen ? (
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
