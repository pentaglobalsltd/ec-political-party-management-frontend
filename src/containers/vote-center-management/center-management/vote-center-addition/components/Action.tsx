import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import { Modal, ConfirmationModal, Button } from '@pentabd/ui';
import { IconEdit02, IconTrash01 } from '@pentabd/icons';

import { ROUTES } from '@constants/routes';
import { VOTE_CENTER_MANAGEMENT } from '@constants/permissions/vote-center-management';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import useDeletePollingCenter from '@hooks/vote-center-management/center-management/polling-center/useDeletePollingCenter';
import { getParams } from '@utils';

import { USER_TYPES } from '@constants/user-types';
import { switchDynamicParamsInRoute } from '../helpers';
import SuspendCenterModal from './SuspendCenterModal';
import { isPermitted } from '@helpers/permission';

function Action({
  row,
  getPollingCenterAggregatedData,
  userType,
}: {
  row: any;
  getPollingCenterAggregatedData: any;
  userType?: string;
}) {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenCancelModal, setIsOpenCancelModal] = useState(false);

  const { t } = useTranslation();
  const { keycloak } = useAuthWrapper();
  const permissionsArray = keycloak.realmAccess?.roles;

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const {
    deletePollingCenter,
    loading: loadingDeletePollingCenter,
    success: successDelete,
  } = useDeletePollingCenter();

  const handleRowEdit = () => {
    const electionTypeId = row?.electionTypeId;
    const electionSettingsId = row?.electionSettingsId;
    const unionOrWardId = row?.unionOrWardId;
    const pollingCenterId = row?.id;
    const constituencyId = row?.constituencyId;
    const municipalityId = row?.municipalityId;
    const upazilaId = row?.upazilaId;

    const navigateObj = {
      pathname:
        ROUTES.VOTE_CENTER_ADDITION_EDIT +
        ROUTES.NEW_CENTER_EDIT_FROM_VOTER_TALIKA({
          electionSettingsId,
          unionOrWardId,
          pollingCenterId,
        }),
    };

    switchDynamicParamsInRoute({
      electionTypeId,
      navigateObj,
      queryParams: {
        constituencyId,
        municipalityId,
        upazilaId,
      },
      navigate,
      createSearchParams,
    });
  };

  const openDeleteModal = () => {
    setIsOpenDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setIsOpenDeleteModal(false);
  };

  // cancel modal ========================
  const openCancelModal = () => {
    setIsOpenCancelModal(true);
  };

  const closeCancelModal = () => {
    setIsOpenCancelModal(false);
  };

  const confirmDelete = () => {
    const { electionSettingsId, unionOrWardId, id } = row;
    deletePollingCenter({
      electionSettingsId,
      unionOrWardId,
      pollingCenterId: id,
    });
    setIsOpenDeleteModal(false);
  };

  useEffect(() => {
    if (successDelete) {
      getPollingCenterAggregatedData({
        page: params?.page,
        queryParams: params,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successDelete]);

  const pollingCenterPermissionList = (permission: string) => {
    if (
      permissionsArray?.includes(
        VOTE_CENTER_MANAGEMENT.CENTER_MANAGEMENT_POLLING_CENTER_FULL,
      )
    ) {
      return true;
    }
    return isPermitted(permissionsArray, permission);
  };

  return (
    <>
      <div className="d-flex justify-content-around gap-12">
        <div className="pointer ">
          {pollingCenterPermissionList(
            VOTE_CENTER_MANAGEMENT.CENTER_MANAGEMENT_POLLING_CENTER_SUSPEND,
          ) ? (
            row?.isActive ? (
              //  Cancel polling center
              <Button
                fill="outline"
                onClick={openCancelModal}
                type="danger"
                size="xs"
              >
                {t('VOTE_CENTER_ADDITION.SUSPEND_VOTE_CENTER')}
              </Button>
            ) : (
              // Activate polling center
              <Button
                fill="outline"
                onClick={openCancelModal}
                type="success"
                size="xs"
              >
                {t('VOTE_CENTER_ADDITION.ACTIVATE_VOTE_CENTER')}
              </Button>
            )
          ) : null}
        </div>

        {/* edit */}
        {pollingCenterPermissionList(
          VOTE_CENTER_MANAGEMENT.CENTER_MANAGEMENT_POLLING_CENTER_EDIT,
        ) && userType !== USER_TYPES.RETURNING_OFFICER ? (
          <div className="pointer  " onClick={handleRowEdit}>
            <IconEdit02 fill="primary" size="24" />
          </div>
        ) : null}

        {/* delete */}
        {pollingCenterPermissionList(
          VOTE_CENTER_MANAGEMENT.CENTER_MANAGEMENT_POLLING_CENTER_DELETE,
        ) ? (
          <div className="pointer " onClick={openDeleteModal}>
            <IconTrash01 fill="danger" size="24" />
          </div>
        ) : null}
      </div>

      {/* row delete confirmation */}
      {isOpenDeleteModal ? (
        <ConfirmationModal
          title={t('CENTER_BASED_OFFICER_ALLOCATION.DELETE_MODAL_TITLE')}
          isOpen={isOpenDeleteModal}
          onClose={closeDeleteModal}
          portal
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
            type: 'danger',
            loading: loadingDeletePollingCenter,
          }}
        />
      ) : null}

      {/* row cancel modal */}
      {isOpenCancelModal ? (
        <Modal isOpen={isOpenCancelModal} onClose={closeCancelModal} portal>
          <SuspendCenterModal
            row={row}
            closeCancelModal={closeCancelModal}
            getPollingCenterAggregatedData={getPollingCenterAggregatedData}
            searchItems={{ page: params?.page, queryParams: params }}
          />
        </Modal>
      ) : null}
    </>
  );
}

export default Action;
