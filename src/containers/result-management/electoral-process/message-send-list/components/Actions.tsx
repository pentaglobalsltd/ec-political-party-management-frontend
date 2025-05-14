import { useEffect, useState } from 'react';
import { Button, ConfirmationModal } from '@pentabd/ui';
import { useTranslation } from 'react-i18next';
import { FINAL_SHEET_STATUS } from '../constants';
import { RESULT_MANAGEMENT } from '@constants/permissions/result-management';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import useCancelFinalBartaSheet from '@hooks/result-management/electoral-process/cancel-final-barta-sheet/useCancelFinalBartaSheet';
import { MESSAGE_SEND_STATUS } from '@constants/polling-center-results';
import { useSearchParams } from 'react-router-dom';
import { getParams } from '@utils';
import usePublishToUserApp from '@hooks/result-management/electoral-process/publish-to-userapp/usePublishToUserApp';

function Actions({
  data,
  row,
  getMessageSendList,
}: {
  data: any;
  row: any;
  getMessageSendList: any;
}) {
  const { t } = useTranslation();
  const { keycloak } = useAuthWrapper();
  const [isOpenCancelModal, setIsOpenCancelModal] = useState(false);
  const [isOpenPublishToUserAppModal, setIsOpenPublishToUserAppModal] =
    useState(false);

  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const permissionsArray = keycloak.realmAccess?.roles;

  const { updateCancelFinalBartaSheetData, updateLoading, updateSuccess } =
    useCancelFinalBartaSheet();
  const { addPublishToUserApp, publishLoading, publishSuccess } =
    usePublishToUserApp();

  const closeCancelModal = () => {
    setIsOpenCancelModal(false);
  };

  const closePublishToUserAppModal = () => {
    setIsOpenPublishToUserAppModal(false);
  };

  const confirmCancel = () => {
    if (row?.electionScheduleId && row?.id) {
      const data = {
        sheetStatus: MESSAGE_SEND_STATUS.PUBLISHED,
      };
      updateCancelFinalBartaSheetData({
        scheduleId: row.electionScheduleId,
        id: row.id,
        data,
      });
    }
  };

  const handlePublishToApp = () => {
    if (row?.electionScheduleId && row?.electionTypeId) {
      addPublishToUserApp({
        electionScheduleId: row?.electionScheduleId,
        electionSettingsId: row?.electionSettingsId,
        data: {},
      });
    }
  };

  useEffect(() => {
    if (
      updateSuccess &&
      params?.electionScheduleId &&
      params?.electionSettingsId
    ) {
      setIsOpenCancelModal(false);
      getMessageSendList({
        ...(params?.page && { page: Number(params?.page) }),
        electionScheduleId: Number(params?.electionScheduleId),
        electionSettingsId: Number(params?.electionSettingsId),
        ...(params?.messageSendStatus && {
          sheetStatus: params?.messageSendStatus,
        }),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateSuccess]);

  useEffect(() => {
    if (
      publishSuccess &&
      params?.electionScheduleId &&
      params?.electionSettingsId
    ) {
      getMessageSendList({
        ...(params?.page && { page: Number(params?.page) }),
        electionScheduleId: Number(params?.electionScheduleId),
        electionSettingsId: Number(params?.electionSettingsId),
        ...(params?.messageSendStatus && {
          sheetStatus: params?.messageSendStatus,
        }),
      });
      closePublishToUserAppModal();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publishSuccess]);

  return (
    <>
      <div className="d-flex gap-6">
        {/* Cancel Button */}
        {permissionsArray?.includes(
          RESULT_MANAGEMENT.RESULT_MONITORING_CANCEL_FINAL_BARTA_SHEET,
        ) && data === FINAL_SHEET_STATUS ? (
          <Button
            key={3}
            type="danger"
            fill="outline"
            onClick={() => setIsOpenCancelModal(true)}
          >
            {t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.CANCEL_FINAL')}
          </Button>
        ) : null}

        {/* Publish Button */}
        {permissionsArray?.includes(
          RESULT_MANAGEMENT.RESULT_MONITORING_PUBLISH_TO_APP,
        ) && data === FINAL_SHEET_STATUS ? (
          <Button
            key={4}
            type="success"
            fill="outline"
            onClick={() => {
              setIsOpenPublishToUserAppModal(true);
            }}
          >
            {row?.isPublishedToUserApp === true
              ? t(
                  'ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.PUBLISH_TO_APP_AGAIN',
                )
              : t(
                  'ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.PUBLISH_TO_APP',
                )}
          </Button>
        ) : null}
      </div>

      {isOpenCancelModal ? (
        <ConfirmationModal
          title={t(
            'ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.CANCEL_FINAL_MODAL_TITLE',
          )}
          isOpen={isOpenCancelModal}
          onClose={closeCancelModal}
          cancelButton={{
            onClick: closeCancelModal,
            label: t('CENTER_BASED_OFFICER_ALLOCATION.GO_BACK'),
            fill: 'outline',
            type: 'light',
          }}
          confirmButton={{
            onClick: confirmCancel,
            label: t('CENTER_BASED_OFFICER_ALLOCATION.REMOVE'),
            fill: 'fill',
            type: 'danger',
            loading: updateLoading,
          }}
          portal
        />
      ) : null}

      {isOpenPublishToUserAppModal ? (
        <ConfirmationModal
          title={t(
            'ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.PUBLISH_TO_RMS_DASHBOARD_TITLE',
          )}
          isOpen={isOpenPublishToUserAppModal}
          onClose={closePublishToUserAppModal}
          cancelButton={{
            onClick: closePublishToUserAppModal,
            label: t('CENTER_BASED_OFFICER_ALLOCATION.GO_BACK'),
            fill: 'outline',
            type: 'light',
          }}
          confirmButton={{
            onClick: handlePublishToApp,
            label: t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.SUBMIT'),
            fill: 'fill',
            type: 'info',
            loading: publishLoading,
          }}
          portal
        />
      ) : null}
    </>
  );
}

export default Actions;
