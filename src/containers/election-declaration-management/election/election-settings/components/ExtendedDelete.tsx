import { Button, Modal, Text } from '@pentabd/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ChangedSettingsModal from './ChangedSettingsModal';

function ExtendedDelete() {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const { t } = useTranslation();

  const openSettingsModal = () => {
    setIsSettingsModalOpen(true);
  };

  const closeSettingsModal = () => {
    setIsSettingsModalOpen(false);
  };

  return (
    <>
      <Button onClick={openSettingsModal} htmlType="button" size="xs">
        <Text color="primary">{t('ELECTION_SETTINGS.CHANGE_SETTINGS')}</Text>
      </Button>

      <Modal
        isOpen={isSettingsModalOpen}
        closeAble
        overlay
        onClose={closeSettingsModal}
        portal
      >
        <ChangedSettingsModal
          closeSettingsModal={closeSettingsModal}
          openSettingsModal={openSettingsModal}
        />
      </Modal>
    </>
  );
}

export default ExtendedDelete;
