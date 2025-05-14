import { useState } from 'react';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { IconEye } from '@pentabd/icons';
import { Button } from '@pentabd/ui';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RESULT_MANAGEMENT } from '@constants/permissions/result-management';
import { ROUTES } from '@constants/routes';
import { getParams } from '@utils';
import PublishModal from './publish-modal';
import { MESSAGE_SEND_STATUS } from '@constants/polling-center-results';

function Actions({
  row,
  getMessageSendingListWaiting,
  getMessageSendingListTested,
}: {
  row: any;
  getMessageSendingListWaiting: any;
  getMessageSendingListTested: any;
}) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { t } = useTranslation();
  const { keycloak } = useAuthWrapper();
  const permissionsArray = keycloak.realmAccess?.roles;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const handleView = () => {
    if (row?.id && params.electionScheduleId)
      navigate(
        ROUTES.MESSAGE_SEND_PUBLISH(row?.id, params?.electionScheduleId),
      );
  };

  const handlePublish = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div className="d-flex flex-row gap-12 align-items-center">
        <div className="pointer" onClick={handleView}>
          <IconEye size="22" fill="primary" />
        </div>
        {permissionsArray?.includes(
          RESULT_MANAGEMENT.ELECTION_PROCESS_PUBLISH_BARTA_SHEET,
        ) ? (
          <Button type="primary" fill="outline" onClick={handlePublish}>
            {t('MESSAGE_SEND_LIST_PUBLISH.PUBLISH')}
          </Button>
        ) : null}
      </div>

      {openModal && (
        <PublishModal
          isOpen={openModal}
          rowData={row}
          fromView={false}
          portal
          scheduleId={params?.electionScheduleId}
          handleCloseModal={handleCloseModal}
          onSuccess={() => {
            if (params?.electionScheduleId) {
              getMessageSendingListWaiting({
                scheduleId: params?.electionScheduleId,
                electionSettingsId: params?.electionSettingsId,
                sheetStatus: MESSAGE_SEND_STATUS.FORWARDED,
              });
              getMessageSendingListTested({
                scheduleId: params?.electionScheduleId,
                electionSettingsId: params?.electionSettingsId,
                sheetStatus: MESSAGE_SEND_STATUS.PUBLISHED,
              });
            }
          }}
        />
      )}
    </>
  );
}

export default Actions;
