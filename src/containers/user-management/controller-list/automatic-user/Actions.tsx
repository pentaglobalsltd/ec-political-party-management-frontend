import { useEffect, useState } from 'react';
import { IconPasscodeLock, IconTrash01 } from '@pentabd/icons';
import { ConfirmationModal, Modal } from '@pentabd/ui';
import { useTranslation } from 'react-i18next';

import {
  BulkUserProfiles,
  UserProfiles,
} from '@type/user-management/user-profile-types';
import { ResetPasswordForm } from '../reset-password-form';

import { USER_PROFILE_LIST_TYPE } from '../constants';
import { useDeleteUserProfile } from '@hooks/user-management/useDeleteUserProfile';
import { GetUserProfileList } from '@hooks/user-management/useGetUserProfileListLoginId';

function Actions({
  row,
  getUserProfileListData,
  searchItems,
}: {
  row: UserProfiles;
  getUserProfileListData: ({
    searchItems,
    page,
    size,
  }: GetUserProfileList) => void;
  searchItems: BulkUserProfiles;
}) {
  const { t } = useTranslation();

  const [updatePassword, setUpdatePassword] = useState<string>();

  const [confirmModelOpen, setConfirmModelOpen] = useState(false);
  const [openResetPasswordModal, setOpenResetPasswordModal] = useState(false);

  const { deleteUserProfile, isDeleteSuccess, setIsDeleteSuccess } =
    useDeleteUserProfile();

  //   const handleEditButton = () => {
  //     console.log('Edit row: ', row.id);
  //   };

  const handlePassCheckButton = () => {
    setUpdatePassword(row.userId);
    setOpenResetPasswordModal(true);
  };

  const handleDeleteButton = () => {
    setConfirmModelOpen(true);
  };

  const closeModal = () => {
    setConfirmModelOpen(false);
  };

  const confirmDelete = () => {
    deleteUserProfile(row?.userId as string);
    setConfirmModelOpen(false);
  };

  const closeResetPasswordModal = () => {
    setOpenResetPasswordModal(false);
  };

  useEffect(() => {
    if (isDeleteSuccess) {
      getUserProfileListData({
        searchItems,
        type: USER_PROFILE_LIST_TYPE.ELECTION,
      });
      setIsDeleteSuccess(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleteSuccess]);

  return (
    <>
      <div className="d-flex gap-6">
        {/* <div className="pointer" onClick={handleEditButton}>
          <IconPencil02 size="20" fill="primary" />
        </div> */}
        <div className="pointer" onClick={handlePassCheckButton}>
          <IconPasscodeLock size="20" fill="primary" />
        </div>
        <div className="pointer" onClick={handleDeleteButton}>
          <IconTrash01 size="20" fill="danger" />
        </div>
      </div>

      {confirmModelOpen ? (
        <ConfirmationModal
          title={t('ELECTION_USER.DELETE')}
          cancelButton={{
            onClick: closeModal,
            fill: 'outline',
            type: 'primary',
            label: t('CONFIRMATION_MODAL.MODAL_CANCEL'),
          }}
          confirmButton={{
            onClick: confirmDelete,
            fill: 'fill',
            type: 'danger',
            label: t('CONFIRMATION_MODAL.MODAL_SUCCESS'),
          }}
          isOpen={confirmModelOpen}
          closeAble
          portal
          onClose={closeModal}
        />
      ) : null}

      {openResetPasswordModal ? (
        <Modal
          isOpen={openResetPasswordModal}
          closeAble
          overlay
          portal
          onClose={closeResetPasswordModal}
        >
          <ResetPasswordForm
            updatePassword={updatePassword}
            closeResetPasswordModal={closeResetPasswordModal}
            getUserProfileListData={getUserProfileListData}
            params={searchItems}
            type={USER_PROFILE_LIST_TYPE.ELECTION}
          />
        </Modal>
      ) : null}
    </>
  );
}

export default Actions;
