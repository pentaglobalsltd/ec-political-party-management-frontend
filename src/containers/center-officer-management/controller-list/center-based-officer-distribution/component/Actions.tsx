import { useEffect, useState } from 'react';
import { Button, ConfirmationModal, Modal, Text } from '@pentabd/ui';
import { useTranslation } from 'react-i18next';
import OfficerAllocationModal from './officer-allocation-modal';
import { useDeletePollingPersonnelAllocateById } from '@hooks/center-officer-management/controller-list/polling-center/useDeletePollingPersonnelAllocate';
import { userTypeCodesPollingCenter } from '../constant';

function Actions({
  data,
  raw,
  pollingCenter,
  centerPollingPersonnelSummaryList,
  getDataOnSuccess,
}: {
  data: any;
  raw: any;
  pollingCenter: number | string;
  centerPollingPersonnelSummaryList: any;
  getDataOnSuccess: any;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenSelectCenterModal, setIsOpenSelectCenterModal] = useState(false);

  const [pollingPersonnel, setPollingPersonnel] = useState<number>();
  const [deletePollingPersonnel, setDeletePersonnel] = useState<number>();

  const { t } = useTranslation();

  const {
    deletePollingPersonnelAllocateById,
    setIsDeleteSuccess,
    isDeleteSuccess,
  } = useDeletePollingPersonnelAllocateById();

  const openModal = (data: any) => {
    setIsModalOpen(true);
    setPollingPersonnel(data?.pollingPersonnel?.id);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openDeleteModal = (data: any) => {
    setIsOpenDeleteModal(true);
    setDeletePersonnel(data?.pollingPersonnelCenter?.id);
  };
  const closeDeleteModal = () => {
    setIsOpenDeleteModal(false);
  };

  const closeSelectSuccessModal = () => {
    setIsOpenSelectCenterModal(false);
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

  return (
    <>
      <div>
        {!data?.id ? (
          <Button
            type="info"
            fill="fill"
            onClick={() =>
              pollingCenter ? openModal(raw) : setIsOpenSelectCenterModal(true)
            }
          >
            <Text component="p" sizeType="fs" size="sm" weight="semibold">
              {t('CENTER_BASED_OFFICER_ALLOCATION.RESPONSIBILITY_ALLOCATION')}
            </Text>
          </Button>
        ) : (
          <Button
            type="danger"
            fill="outline"
            onClick={() => openDeleteModal(raw)}
          >
            <Text component="p" sizeType="fs" size="sm" weight="semibold">
              {t('CENTER_BASED_OFFICER_ALLOCATION.DISCHARGE_OF_POSITION')}
            </Text>
          </Button>
        )}
      </div>

      {isModalOpen ? (
        <Modal
          isOpen={isModalOpen}
          closeAble
          overlay
          portal
          onClose={closeModal}
        >
          <OfficerAllocationModal
            userTypeCodes={userTypeCodesPollingCenter}
            pollingPersonnel={pollingPersonnel}
            pollingCenter={pollingCenter as number}
            closeModal={closeModal}
            getDataOnSuccess={getDataOnSuccess}
            centerSummary={centerPollingPersonnelSummaryList?.centerSummary}
          />
        </Modal>
      ) : null}

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

      {isOpenSelectCenterModal ? (
        <ConfirmationModal
          portal
          title={t('CENTER_BASED_OFFICER_ALLOCATION.SELECT_CENTER')}
          isOpen={isOpenSelectCenterModal}
          onClose={closeSelectSuccessModal}
          cancelButton={{
            onClick: closeSelectSuccessModal,
            label: t('AFFIDAVIT_STEP_ONE.CONFIRMATION_DELETE_BUTTON_TEXT'),
            fill: 'outline',
            type: 'light',
          }}
          confirmButton={{
            onClick: closeSelectSuccessModal,
            label: t('REGISTRATION.NEXT'),
            fill: 'fill',
            type: 'primary',
          }}
        />
      ) : null}
    </>
  );
}

export default Actions;
