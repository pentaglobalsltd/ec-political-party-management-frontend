import { useEffect, useState } from 'react';
import { ConfirmationModal } from '@pentabd/ui';
import { IconPencil02, IconTrash01 } from '@pentabd/icons';
import { CENTER_OFFICER_MANAGEMENT } from '@constants/permissions/center-officer-management';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getParams } from '@utils';
import { ROUTES } from '@constants/routes';
import { useDeleteOfficerById } from '@hooks/center-officer-management/controller-list/officer-list/useDeleteOfficer';
import { isPermitted } from '@helpers/permission';

function Actions({ raw, getOfficers }: { raw: any; getOfficers: any }) {
  const [isOpenDeleteConfirmModal, setIsOpenDeleteConfirmModal] =
    useState(false);

  const { t } = useTranslation();
  const { keycloak } = useAuthWrapper();

  const permissionsArray = keycloak.realmAccess?.roles;
  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);
  const navigate = useNavigate();

  const { deleteOfficerById, isLoading, isDeleteSuccess } =
    useDeleteOfficerById();

  const closeDeleteConfirmationModal = () => {
    setIsOpenDeleteConfirmModal(false);
  };
  const confirmDeleteOfficer = () => {
    deleteOfficerById(raw.id);
  };
  const handleButton = (data: any) => {
    const { id } = data;
    navigate(ROUTES.EDIT_OFFICER(id));
  };

  function pollingPersonnelPermission(name: string) {
    if (
      permissionsArray?.includes(
        CENTER_OFFICER_MANAGEMENT.POLLING_PERSONNEL_FULL_PERMISSION,
      )
    ) {
      return true;
    }
    return isPermitted(permissionsArray, name);
  }

  useEffect(() => {
    if (isDeleteSuccess) {
      getOfficers({ searchItems: params, page: 0 });
      setIsOpenDeleteConfirmModal(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleteSuccess]);

  return (
    <>
      <div className="d-flex gap-6 align-items-center">
        {pollingPersonnelPermission(
          CENTER_OFFICER_MANAGEMENT.POLLING_PERSONNEL_CREATE_EDIT_PERMISSION,
        ) ? (
          <div className="pointer" onClick={() => handleButton(raw)}>
            <IconPencil02 size="20" fill="primary" />
          </div>
        ) : null}
        {pollingPersonnelPermission(
          CENTER_OFFICER_MANAGEMENT.POLLING_PERSONNEL_DELETE_PERMISSION,
        ) ? (
          <div
            className="pointer"
            onClick={() => {
              setIsOpenDeleteConfirmModal(true);
            }}
          >
            <IconTrash01 size="20" fill="danger" />
          </div>
        ) : null}
      </div>

      {isOpenDeleteConfirmModal ? (
        <ConfirmationModal
          portal
          title={t('AFFIDAVIT_STEP_ONE.DELETE_MODAL_TITLE')}
          isOpen={isOpenDeleteConfirmModal}
          onClose={closeDeleteConfirmationModal}
          cancelButton={{
            onClick: closeDeleteConfirmationModal,
            label: t('AFFIDAVIT_STEP_ONE.CONFIRMATION_DELETE_BUTTON_TEXT'),
            fill: 'outline',
            type: 'light',
          }}
          confirmButton={{
            onClick: confirmDeleteOfficer,
            label: t('ELECTION_SETTINGS.REMOVE'),
            fill: 'fill',
            type: 'danger',
            loading: isLoading,
          }}
        />
      ) : null}
    </>
  );
}

export default Actions;
