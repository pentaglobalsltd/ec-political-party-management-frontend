import { useEffect, useState } from 'react';
import { IconEdit02, IconTrash01 } from '@pentabd/icons';
import { ConfirmationModal } from '@pentabd/ui';
import { getParams } from '@utils';
import { useTranslation } from 'react-i18next';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import useDeletePollingCenter from '@hooks/vote-center-management/center-management/polling-center/useDeletePollingCenter';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { ROUTES } from '@constants/routes';
import { switchDynamicParamsInRoute } from '../create-edit/helper/switch-dynamic-params-in-route';
import { VOTE_CENTER_MANAGEMENT } from '@constants/permissions/vote-center-management';
import { isPermitted } from '@helpers/permission';

function Actions({
  row,
  getPollingInstitutesList,
  getPollingCenterAggregatedData,
}: {
  row: any;
  getPollingInstitutesList: any;
  getPollingCenterAggregatedData: any;
}) {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const { keycloak } = useAuthWrapper();
  const permissionsArray = keycloak.realmAccess?.roles;

  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);
  const navigate = useNavigate();

  const {
    deletePollingCenter,
    loading: loadingDeletePollingCenter,
    success: successDelete,
  } = useDeletePollingCenter();

  const handleRowEdit = () => {
    const electionTypeId = Number(params?.electionTypeId);
    const electionSettingsId = params?.electionSettingsIds;
    const unionOrWardId = row?.unionOrWardId;
    const pollingCenterId = row?.id;
    const constituencyId = row?.constituencyId;
    const municipalityId = row?.municipalityId;
    const upazilaId = row?.upazilaId;
    // const candidateTypeId = params?.candidateTypeId;
    const unionWardId = row?.unionWardId;

    const navigateObj = {
      pathname: ROUTES.NEW_CENTER_EDIT({
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
        unionWardId,
      },
      navigate,
      createSearchParams,
    });
  };

  // delete modal ========================
  const openDeleteModal = () => {
    setIsOpenDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setIsOpenDeleteModal(false);
  };

  const handleRowDelete = () => {
    openDeleteModal();
  };

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
      getPollingInstitutesList({
        page: params?.institutePage,
        queryParams: { ...params },
      });
      getPollingCenterAggregatedData({
        page: params?.centerPage,
        queryParams: { ...params },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successDelete]);

  return (
    <>
      <div className="d-flex justify-content-around gap-10">
        {/* edit */}
        <div className="pointer  " onClick={handleRowEdit}>
          <IconEdit02 fill="primary" size="24" />
        </div>

        {/* delete */}
        {pollingCenterPermissionList(
          VOTE_CENTER_MANAGEMENT.CENTER_MANAGEMENT_POLLING_CENTER_DELETE,
        ) ? (
          <div className="pointer" onClick={handleRowDelete}>
            <IconTrash01 fill="danger" size="24" />
          </div>
        ) : null}
      </div>

      {/* row delete confirmation */}
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
            type: 'danger',
            loading: loadingDeletePollingCenter,
          }}
        />
      ) : null}
    </>
  );
}

export default Actions;
