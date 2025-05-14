import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ConfirmationModal } from '@pentabd/ui';
import { IconPencil02, IconTrash01 } from '@pentabd/icons';
import { ROUTES } from '@constants/routes';
import useDeleteUnionReserveSeat from '@hooks/election-schedule-management/main-list/union-reserved-seat/useDeleteUnionReserveSeat';
import { getParams } from '@utils';
import { ReserveUnionWardQueryParams } from '@api/election-schedule-management/main-list/union-reserved-seat/fetch-union-reserved-seat-listing';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';

interface Props {
  row: any;
  getReserveUnionWardList: (queryParams: ReserveUnionWardQueryParams) => void;
}

const TableRowActions = ({ row, getReserveUnionWardList }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const [isOpenDeleteConfirmModal, setIsOpenDeleteConfirmModal] =
    useState(false);

  const {
    loading: loadingDelete,
    success: successDelete,
    deleteReserveUnionWardById,
  } = useDeleteUnionReserveSeat();

  const onRowEdit = () => {
    navigate(ROUTES.EDIT_UNION_RESERVED_SEAT(row?.id));
  };

  const onConfirmDelete = () => {
    if (row.id) deleteReserveUnionWardById(row.id);
  };

  const closeDeleteConfirmationModal = () => {
    setIsOpenDeleteConfirmModal(false);
  };

  useEffect(() => {
    if (successDelete) {
      getReserveUnionWardList({
        ...params,
        page: 0,
        unionId: Number(params?.[SEARCH_FIELD_REQUIRED.UNION_OR_WARD]),
      });
      setIsOpenDeleteConfirmModal(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successDelete]);

  return (
    <>
      <div className="d-flex gap-10">
        {/* edit */}
        <div className="pointer" onClick={onRowEdit}>
          <IconPencil02 size="20" fill="primary" />
        </div>

        {/* delete */}
        <div
          className="pointer"
          onClick={() => setIsOpenDeleteConfirmModal(true)}
        >
          <IconTrash01 size="20" fill="danger" />
        </div>
      </div>

      {/* modal */}
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
            onClick: onConfirmDelete,
            label: t('ELECTION_SETTINGS.REMOVE'),
            fill: 'fill',
            type: 'danger',
            loading: loadingDelete,
          }}
        />
      ) : null}
    </>
  );
};

export default TableRowActions;
