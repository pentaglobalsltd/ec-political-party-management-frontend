import { Button, ConfirmationModal } from '@pentabd/ui';
import { useTranslation } from 'react-i18next';

import { VOTE_CENTER_MANAGEMENT } from '@constants/permissions/vote-center-management';

import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';

import usePublishToApp from '@hooks/vote-center-management/center-management/polling-institute/usePublishToApp';
import { useEffect, useState, useTransition } from 'react';
import { isPermitted } from '@helpers/permission';

function PublishToAppButton() {
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  const [isPending, startTransition] = useTransition();

  const { keycloak } = useAuthWrapper();
  const permissionsArray = keycloak.realmAccess?.roles;

  const { t } = useTranslation();

  const { success, loading, getPublishToAppData } = usePublishToApp();

  const openConfirmationModal = () => {
    setIsOpenConfirmModal(true);
  };

  const closeConfirmationModal = () => {
    startTransition(() => {
      setIsOpenConfirmModal(false);
    });
  };

  const handleButtonClick = () => {
    getPublishToAppData();
  };

  useEffect(() => {
    if (success) {
      closeConfirmationModal();
    }
  }, [success]);

  return isPermitted(
    permissionsArray,
    VOTE_CENTER_MANAGEMENT.PUBLISH_TO_APP,
  ) ? (
    <>
      <Button
        key={1}
        type="success"
        htmlType="button"
        onClick={openConfirmationModal}
        loading={loading}
      >
        {t('POLLING_INSTITUTE.PUBLISH_TO_APP')}
      </Button>
      {!isPending ? (
        <ConfirmationModal
          portal
          overlay
          closeAble={false}
          title={t('POLLING_INSTITUTE.PUBLISH_TO_APP_MODAL_TITLE')}
          isOpen={isOpenConfirmModal}
          onClose={closeConfirmationModal}
          cancelButton={{
            onClick: closeConfirmationModal,
            label: `${t(
              'DATA_PROVIDER_INFO.CONFIRMATION_MODAL.CANCEL_BUTTON',
            )}`,
            fill: 'outline',
            type: 'light',
          }}
          confirmButton={{
            onClick: handleButtonClick,
            label: `${t(
              'DATA_PROVIDER_INFO.CONFIRMATION_MODAL.CONFIRM_BUTTON',
            )}`,
            fill: 'fill',
            type: 'success',
            loading: loading,
          }}
        />
      ) : null}
    </>
  ) : (
    <></>
  );
}

export default PublishToAppButton;
