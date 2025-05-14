import { useEffect, useState } from 'react';
import { Button, ConfirmationModal } from '@pentabd/ui';
import { useTranslation } from 'react-i18next';
import { RESULT_MANAGEMENT } from '@constants/permissions/result-management';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { useSearchParams } from 'react-router-dom';
import { getParams } from '@utils';
import usePublishToDashboard from '@hooks/result-management/electoral-process/publish-to-rms/usePublishToRms';

function PublishToDashboard() {
  const [isOpenPublishToDashboardModal, setIsOpenPublishToDashboardModal] =
    useState(false);

  const { t } = useTranslation();
  const { keycloak } = useAuthWrapper();

  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const permissionsArray = keycloak.realmAccess?.roles;

  const {
    publishDashboardLoading,
    publishDashboardSuccess,
    createPublishToDashboardData,
  } = usePublishToDashboard();

  const closePublishToDashboardModal = () => {
    setIsOpenPublishToDashboardModal(false);
  };

  const onPublishToDashboardClick = () => {
    if (params?.electionSettingsId && params?.electionScheduleId) {
      createPublishToDashboardData({
        electionScheduleId: params?.electionScheduleId,
        electionSettingsId: params?.electionSettingsId,
        data: {},
      });
    }
  };

  useEffect(() => {
    if (publishDashboardSuccess) {
      setIsOpenPublishToDashboardModal(false);
    }
  }, [publishDashboardSuccess]);

  return params?.electionSettingsId &&
    permissionsArray?.includes(
      RESULT_MANAGEMENT.ELECTION_PROCESS_PUBLISH_TO_RMS_DASHBOARD,
    ) ? (
    <>
      <div className="mb-10">
        <Button
          fill="outline"
          size="md"
          type="info"
          onClick={() => setIsOpenPublishToDashboardModal(true)}
        >
          {t(
            'ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.PUBLISH_TO_RMS_DASHBOARD',
          )}
        </Button>
      </div>

      {isOpenPublishToDashboardModal &&
      params?.electionSettingsId &&
      params?.electionScheduleId ? (
        <ConfirmationModal
          title={t(
            'ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.PUBLISH_TO_RMS_DASHBOARD_TITLE',
          )}
          isOpen={isOpenPublishToDashboardModal}
          onClose={closePublishToDashboardModal}
          cancelButton={{
            onClick: closePublishToDashboardModal,
            label: t('CENTER_BASED_OFFICER_ALLOCATION.GO_BACK'),
            fill: 'outline',
            type: 'light',
          }}
          confirmButton={{
            onClick: onPublishToDashboardClick,
            label: t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.SUBMIT'),
            fill: 'fill',
            type: 'info',
            loading: publishDashboardLoading,
          }}
        />
      ) : null}
    </>
  ) : null;
}

export default PublishToDashboard;
