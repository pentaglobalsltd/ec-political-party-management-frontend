import { Modal, Table, Text } from '@pentabd/ui';

import { useTranslation } from 'react-i18next';
import { historyListModalTableColumns } from './constant';

interface Props {
  isHistoryListModal: boolean;
  closeHistoryListModal: () => void;
  historyList?: any;
  moduleText: string;
}

function HistoryListModal({
  isHistoryListModal,
  closeHistoryListModal,
  historyList,
  moduleText,
}: Props) {
  const { t } = useTranslation();

  return (
    <>
      <Modal
        key={2}
        isOpen={isHistoryListModal}
        closeAble={false}
        overlay
        portal
        onClose={closeHistoryListModal}
      >
        <div className="p-12 d-grid grid-cols-lg-4">
          <div className="col-span-lg-4">
            <Text weight="semibold" size="md">
              {moduleText}
            </Text>

            <div className="mt-16">
              <Table
                columns={historyListModalTableColumns(t)}
                rows={historyList || []}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default HistoryListModal;
