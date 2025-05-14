import { Button, ConfirmationModal, Text } from '@pentabd/ui';
import { useTranslation } from 'react-i18next';
import { USER_ROLE_TYPE } from '@containers/user-management/controller-list/constants';
import { usePollingPersonnelCenterSendCredential } from '@hooks/center-officer-management/controller-list/polling-center/useGetPollingPersonnelCenterSendCredential';
import { useEffect, useState } from 'react';
import { useDeletePollingPersonnelAllocateById } from '@hooks/center-officer-management/controller-list/polling-center/useDeletePollingPersonnelAllocate';

function InstituteAction({
  raw,
  getDataOnSuccess,
}: {
  raw: any;
  getDataOnSuccess: any;
}) {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [deletePollingPersonnel, setDeletePersonnel] = useState<number>();

  const { t } = useTranslation();

  const {
    pollingPersonnelCenterSendCredentialData,
    success,
    loading,
    setSuccess,
  } = usePollingPersonnelCenterSendCredential();

  const {
    deletePollingPersonnelAllocateById,
    setIsDeleteSuccess,
    isDeleteSuccess,
  } = useDeletePollingPersonnelAllocateById();

  const sendSms = (id: number) => {
    pollingPersonnelCenterSendCredentialData({ pollingPersonnelCenterId: id });
  };

  const openDeleteModal = (data: any) => {
    setIsOpenDeleteModal(true);
    setDeletePersonnel(data?.pollingPersonnelCenter?.id);
  };
  const closeDeleteModal = () => {
    setIsOpenDeleteModal(false);
  };

  const confirmDelete = () => {
    if (deletePollingPersonnel) {
      deletePollingPersonnelAllocateById(deletePollingPersonnel);
      setIsOpenDeleteModal(false);
    }
  };

  useEffect(() => {
    if (isDeleteSuccess) {
      getDataOnSuccess();
      setIsDeleteSuccess(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleteSuccess]);

  useEffect(() => {
    if (success) {
      getDataOnSuccess();
      setSuccess(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  return (
    <>
      <div className="d-flex gap-5 align-items-center">
        <Button
          type="danger"
          fill="outline"
          onClick={() => openDeleteModal(raw)}
        >
          <Text component="p" sizeType="fs" size="sm" weight="semibold">
            {t('CENTER_BASED_OFFICER_ALLOCATION.DISCHARGE_OF_POSITION')}
          </Text>
        </Button>
        {raw?.pollingPersonnel?.userTypeModel?.code ===
        USER_ROLE_TYPE.PRESIDING_OFFICER ? (
          <Button
            type="primary"
            fill="outline"
            loading={loading}
            onClick={() => sendSms(raw?.pollingPersonnelCenter?.id)}
          >
            <Text component="p" sizeType="fs" size="sm" weight="semibold">
              {raw?.pollingPersonnelCenter?.isCredentialSent
                ? t('CENTER_BASED_OFFICER_ALLOCATION.RESEND_SMS')
                : t('CENTER_BASED_OFFICER_ALLOCATION.SEND_SMS')}
            </Text>
          </Button>
        ) : null}
      </div>

      {isOpenDeleteModal ? (
        <ConfirmationModal
          portal
          title={t('CENTER_BASED_OFFICER_ALLOCATION.DELETE_MODAL_TITLE')}
          isOpen={isOpenDeleteModal}
          onClose={closeDeleteModal}
          cancelButton={{
            onClick: closeDeleteModal,
            label: t('CENTER_BASED_OFFICER_ALLOCATION.GO_BACK'),
            fill: 'outline',
            type: 'light',
          }}
          confirmButton={{
            onClick: confirmDelete,
            label: t('CENTER_BASED_OFFICER_ALLOCATION.REMOVE'),
            fill: 'fill',
            type: 'info',
          }}
        />
      ) : null}
    </>
  );
}

export default InstituteAction;
