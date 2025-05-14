import { IconPasscodeLock, IconPencil02, IconTrash01 } from '@pentabd/icons';
import { ConfirmationModal, Modal } from '@pentabd/ui';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserProfiles } from '@type/user-management/user-profile-types';
import { ROUTES } from '@constants/routes';
import { ResetPasswordForm } from '../reset-password-form';
import { USER_PROFILE_LIST_TYPE } from '../constants';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getParams } from '@utils';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { USER_MANAGEMENT } from '@constants/permissions/user-management';
import { useDeleteUserProfile } from '@hooks/user-management/useDeleteUserProfile';
import { GetUserProfileList } from '@hooks/user-management/useGetUserProfileListLoginId';

function Actions({
  row,
  getUserProfileListData,
}: {
  row: UserProfiles;
  getUserProfileListData: ({
    searchItems,
    page,
    size,
  }: GetUserProfileList) => void;
}) {
  const [confirmModelOpen, setConfirmModelOpen] = useState(false);
  const [openResetPasswordModal, setOpenResetPasswordModal] = useState(false);
  const [updatePassword, setUpdatePassword] = useState<string>();

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const { keycloak } = useAuthWrapper();
  const permissionsArray = keycloak.realmAccess?.roles;
  const showActionsButton = Boolean(
    permissionsArray?.includes(USER_MANAGEMENT.EDIT_USERS_IN_USER_MANAGEMENT),
  );

  const { deleteUserProfile, isDeleteSuccess, setIsDeleteSuccess } =
    useDeleteUserProfile();

  const handleEditButton = () => {
    navigate({
      pathname: ROUTES.EDIT_SYSTEM_USER(row?.userId as string),
      search: `action=edit&type=${USER_PROFILE_LIST_TYPE.SYSTEM}`,
    });
  };

  const handlePassCheckButton = () => {
    setUpdatePassword(row?.userId);
    setOpenResetPasswordModal(true);
  };

  const handleDeleteButton = () => {
    setConfirmModelOpen(true);
  };

  const closeModal = () => {
    setConfirmModelOpen(false);
  };

  const closeResetPasswordModal = () => {
    setOpenResetPasswordModal(false);
  };

  const confirmDelete = () => {
    deleteUserProfile(row?.userId as string);
    setConfirmModelOpen(false);
  };

  useEffect(() => {
    if (isDeleteSuccess) {
      getUserProfileListData({
        searchItems: { ...params },
        type: USER_PROFILE_LIST_TYPE.SYSTEM,
      });
      setIsDeleteSuccess(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleteSuccess]);

  return (
    <>
      <div className="d-flex gap-6">
        <div className="pointer" onClick={handleEditButton}>
          <IconPencil02 size="20" fill="primary" />
        </div>
        {showActionsButton ? (
          <div className="pointer" onClick={handlePassCheckButton}>
            <IconPasscodeLock size="20" fill="primary" />
          </div>
        ) : null}
        {showActionsButton ? (
          <div className="pointer" onClick={handleDeleteButton}>
            <IconTrash01 size="20" fill="danger" />
          </div>
        ) : null}
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
          portal
          isOpen={confirmModelOpen}
          closeAble
          onClose={closeModal}
        />
      ) : null}

      {openResetPasswordModal ? (
        <Modal
          isOpen={openResetPasswordModal}
          closeAble
          overlay
          onClose={closeResetPasswordModal}
          portal
        >
          <ResetPasswordForm
            updatePassword={updatePassword}
            closeResetPasswordModal={closeResetPasswordModal}
            getUserProfileListData={getUserProfileListData}
            params={params}
            type={USER_PROFILE_LIST_TYPE.SYSTEM}
          />
        </Modal>
      ) : null}
    </>
  );
}

export default Actions;
