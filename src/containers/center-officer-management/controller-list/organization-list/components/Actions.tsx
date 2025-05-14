import { IconPencil02, IconTrash01 } from '@pentabd/icons';

import { CENTER_OFFICER_MANAGEMENT } from '@constants/permissions/center-officer-management';
import { ConfirmationModal } from '@pentabd/ui';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { useEffect, useState } from 'react';
import { getParams } from '@utils';
import { useDeleteAgencyById } from '@hooks/center-officer-management/controller-list/organization-list/useDeleteAgency';
import { GetAgencyProps } from '@type/center-officer-management/organization-list';
import { ROUTES } from '@constants/routes';
import { isPermitted } from '@helpers/permission';

function Actions({
  raw,
  getAgencyListData,
}: {
  raw: any;
  getAgencyListData: any;
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { keycloak } = useAuthWrapper();
  const permissionsArray = keycloak.realmAccess?.roles;
  const [searchParams] = useSearchParams();

  const [isOpenDeleteConfirmModal, setIsOpenDeleteConfirmModal] =
    useState(false);
  const [deleteRow, setDeleteRow] = useState<any>();

  const params = getParams(searchParams);

  const { deleteAgencyById, isLoading, isDeleteSuccess, setIsDeleteSuccess } =
    useDeleteAgencyById();

  const closeDeleteConfirmationModal = () => {
    setIsOpenDeleteConfirmModal(false);
  };

  const confirmDeleteAgency = (id: number) => {
    deleteAgencyById(id);
  };
  const handleButton = (data: GetAgencyProps) => {
    const { id } = data;

    navigate(
      `${ROUTES.CENTER_OFFICER_MANAGEMENT}/${
        ROUTES.ORGANIZATION_LIST
      }/${ROUTES.EDIT_ORGANIZATION(id)}`,
    );
  };

  function organizationListPermission(name: string) {
    if (
      permissionsArray?.includes(
        CENTER_OFFICER_MANAGEMENT.AGENCY_FULL_PERMISSION,
      )
    ) {
      return true;
    }
    return isPermitted(permissionsArray, name);
  }

  useEffect(() => {
    if (isDeleteSuccess) {
      const { regionId, ...filteredSearchItems } = params;
      getAgencyListData({ searchItems: filteredSearchItems });
      setIsOpenDeleteConfirmModal(false);
      setIsDeleteSuccess(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleteSuccess]);

  return (
    <>
      <div className="d-flex gap-6 align-items-center">
        {organizationListPermission(
          CENTER_OFFICER_MANAGEMENT.AGENCY_CREATE_EDIT_PERMISSION,
        ) ? (
          <div className="pointer" onClick={() => handleButton(raw)}>
            <IconPencil02 size="20" fill="primary" />
          </div>
        ) : null}
        {organizationListPermission(
          CENTER_OFFICER_MANAGEMENT.AGENCY_DELETE_PERMISSION,
        ) ? (
          <div
            className="pointer"
            onClick={() => {
              setDeleteRow(raw.id);
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
            onClick: () => confirmDeleteAgency(deleteRow),
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
