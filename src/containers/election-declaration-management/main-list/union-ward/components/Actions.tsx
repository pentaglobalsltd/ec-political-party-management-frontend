import { useNavigate, useSearchParams } from 'react-router-dom';
import { IconPencil02, IconTrash01 } from '@pentabd/icons';
import { ROUTES } from '@constants/routes';
import { useEffect, useState } from 'react';
import { useDeleteUnionWardById } from '@hooks/election-schedule-management/main-list/union-ward/useDeleteUnionWard';
import { ConfirmationModal } from '@pentabd/ui';
import { t } from 'i18next';
import { getParams } from '@utils';
import { UnionWardQueryParams } from '@type/election-declaration-management/main-list/union-ward/union-ward-type';

export const Actions = ({
  id,
  getUnionsWardsList
}: {
  id: number;
  getUnionsWardsList:(data:UnionWardQueryParams)=>void
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const [isOpenDeleteConfirmModal, setIsOpenDeleteConfirmModal] =
  useState(false);
  
  const { deleteUnionWardById, isDeleteLoading, isDeleteSuccess } =
  useDeleteUnionWardById();

  const closeDeleteConfirmationModal = () => {
    setIsOpenDeleteConfirmModal(false);
  };

  useEffect(() => {
    if (isDeleteSuccess) {
      getUnionsWardsList({ ...params, page: 0 });
      setIsOpenDeleteConfirmModal(false);
    }
  }, [isDeleteSuccess]);

  return (
    <>
      <div className="d-flex gap-10">
        <div
          className="pointer"
          onClick={() => navigate(ROUTES.EDIT_UNION_WARD(id))}
        >
          <IconPencil02 size="20" fill="primary" />
        </div>
        <div className="pointer" onClick={() => setIsOpenDeleteConfirmModal(true)}>
          <IconTrash01 size="20" fill="danger" />
        </div>
      </div>
      {isOpenDeleteConfirmModal?(
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
            onClick: () => deleteUnionWardById(id ),
            label: t('ELECTION_SETTINGS.REMOVE'),
            fill: 'fill',
            type: 'danger',
            loading: isDeleteLoading,
          }}
        /> 
      ) : null}
    </>
  );
};
