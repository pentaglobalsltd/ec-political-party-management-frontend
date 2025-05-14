import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IconPencil02, IconTrash01 } from '@pentabd/icons';
import { VOTE_CENTER_MANAGEMENT } from '@constants/permissions/vote-center-management';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { ROUTES } from '@constants/routes';
import { VoterAreaType } from '@type/vote-center-management/voter-area-type';
import { ConfirmationModal } from '@pentabd/ui';
import { useDeleteVoterArea } from '@hooks/vote-center-management/main-list/voter-areas/useDeleteVoterArea';
import { getParams } from '@utils';
import { ElectionDetailsListProps } from '@hooks/vote-center-management/main-list/voter-areas/useVoterAreaGetList';
import { voterAreaPermissionList } from '../constants';

function Actions({
  raw,
  getVoterAreaListData,
}: {
  raw: VoterAreaType;
  getVoterAreaListData?: (data: ElectionDetailsListProps) => void;
}) {
  const [isOpenDeleteConfirmModal, setIsOpenDeleteConfirmModal] =
    useState(false);

  const { keycloak } = useAuthWrapper();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const permissionsArray = keycloak.realmAccess?.roles;

  const { deleteVoterArea, isDeleteLoading, isDeleteSuccess } =
    useDeleteVoterArea();

  const handleEdit = () => {
    if (raw.id) navigate(ROUTES.EDIT_VOTER_AREA(raw.id));
  };

  const closeDeleteConfirmationModal = () => {
    setIsOpenDeleteConfirmModal(false);
  };

  const confirmDeleteCase = () => {
    deleteVoterArea(raw.id as number);
  };

  useEffect(() => {
    if (isDeleteSuccess) {
      getVoterAreaListData &&
        getVoterAreaListData({
          searchItems: params,
        });
      setIsOpenDeleteConfirmModal(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleteSuccess]);

  return (
    <>
      <div className="d-flex gap-6">
        {voterAreaPermissionList(
          VOTE_CENTER_MANAGEMENT.MAIN_LIST_VOTER_AREA_EDIT_PERMISSION,
          permissionsArray,
        ) ? (
          <div className="pointer" onClick={handleEdit}>
            <IconPencil02 size="20" fill="primary" />
          </div>
        ) : null}
        {voterAreaPermissionList(
          VOTE_CENTER_MANAGEMENT.MAIN_LIST_VOTER_AREA_DELETE_PERMISSION,
          permissionsArray,
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
            onClick: confirmDeleteCase,
            label: t('ELECTION_SETTINGS.REMOVE'),
            fill: 'fill',
            type: 'danger',
            loading: isDeleteLoading,
          }}
        />
      ) : null}
    </>
  );
}

export default Actions;
