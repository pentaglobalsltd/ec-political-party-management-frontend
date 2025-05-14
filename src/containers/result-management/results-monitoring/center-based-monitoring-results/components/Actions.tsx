import { useEffect, useState } from 'react';
import { IconRefreshCcw01 } from '@pentabd/icons';
import { useTranslation } from 'react-i18next';
import { Button, ConfirmationModal } from '@pentabd/ui';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { RESULT_STATUS } from '@containers/result-management/electoral-process/results/constants';
import { RESULT_MANAGEMENT } from '@constants/permissions/result-management';
import { getParams } from '@utils';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { ROUTES } from '@constants/routes';
import { ACTION_VIEW_MODE } from '@containers/result-management/electoral-process/results/components/constants';
import { USER_TYPES } from '@constants/user-types';
import { useUpdatePollingCenterResultStatus } from '@hooks/result-management/electoral-process/results/useUpdatepollingCenterResultStatus';

function Actions({
  row,
  getPollingCenterList,
}: {
  row: any;
  getPollingCenterList: any;
}) {
  const [isOpenRequestModal, setIsOpenRequestModal] = useState(false);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const { keycloak } = useAuthWrapper();
  const userType = keycloak.tokenParsed?.userType;
  const permissionsArray = keycloak.realmAccess?.roles;

  const {
    updatePollingCenterResultStatus,
    loading: requestLoading,
    isSuccess,
    setIsSuccess,
  } = useUpdatePollingCenterResultStatus();

  const handleNavigate = (data: any) => {
    if (userType === USER_TYPES.ADMIN)
      navigate({
        pathname: ROUTES.CENTER_BASED_RESULT_PUBLISH_ADMIN(
          data?.pollingCenter?.id,
          data?.pollingCenter?.electionScheduleId,
          data?.pollingCenter?.candidateTypeId,
        ),
        search: `viewMode=${ACTION_VIEW_MODE.CENTER_BASED}`,
      });
    else {
      navigate({
        pathname: ROUTES.CENTER_BASED_RESULT_PUBLISH_ADMIN(
          data?.pollingCenter?.id,
          data?.pollingCenter?.electionScheduleId,
          data?.pollingCenter?.candidateTypeId,
        ),
        search: `viewMode=${ACTION_VIEW_MODE.CENTER_BASED}`,
      });
    }
  };

  const handleResend = (resultId: number, centerId: number, status: string) => {
    updatePollingCenterResultStatus({ data: { status }, centerId, resultId });
  };

  const closeRequestModal = () => {
    setIsOpenRequestModal(false);
  };

  const confirmRequest = () => {
    if (userType && userType === USER_TYPES.ADMIN) {
      updatePollingCenterResultStatus({
        resultId: row?.id,
        centerId: row?.pollingCenter?.id,
        data: { status: RESULT_STATUS.RETURNED_BY_ADMIN },
      });
    } else if (userType && userType !== USER_TYPES.ADMIN) {
      updatePollingCenterResultStatus({
        resultId: row?.id,
        centerId: row?.pollingCenter?.id,
        data: { status: RESULT_STATUS.REQUESTED_BY_RO },
      });
    }
    setIsOpenRequestModal(false);
  };

  useEffect(() => {
    if (isSuccess && Object.keys(params).length > 0) {
      getPollingCenterList({
        ...params,
        page: Number(params.page),
        scheduleId: params.electionScheduleId,
        electionSettings: params.electionSettingsId,
      });
      setIsSuccess(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <>
      <div className="d-flex align-items-center gap-5">
        <Button fill="outline" type="info" onClick={() => handleNavigate(row)}>
          {t('CENTER_BASED_MONITORING_RESULTS.VIEW')}
        </Button>

        {/* button for ADMIN with permission */}
        {(params?.status === RESULT_STATUS.APPROVED_BY_ARO ||
          params?.status === RESULT_STATUS.FORWARDED_BY_OP ||
          params?.status === RESULT_STATUS.REQUESTED_BY_RO) &&
        permissionsArray?.includes(
          RESULT_MANAGEMENT.RESULT_MONITORING_TABLE_ACTION_ADMIN,
        ) ? (
          <Button
            fill="outline"
            type="primary"
            onClick={() => {
              handleResend(
                row?.id,
                row?.pollingCenter?.id,
                RESULT_STATUS.RETURNED_BY_ADMIN,
              );
            }}
          >
            {t('CENTER_BASED_MONITORING_RESULTS.RESEND')}
            <IconRefreshCcw01 size="20" fill="primary" />
          </Button>
        ) : null}

        {/* button for RO with permission */}
        {(params?.status === RESULT_STATUS.APPROVED_BY_ARO ||
          params?.status === RESULT_STATUS.FORWARDED_BY_OP) &&
        permissionsArray?.includes(
          RESULT_MANAGEMENT.RESULT_MONITORING_TABLE_ACTION_RO,
        ) ? (
          <Button
            fill="outline"
            type="primary"
            onClick={() => {
              handleResend(
                row?.id,
                row?.pollingCenter?.id,
                RESULT_STATUS.REQUESTED_BY_RO,
              );
            }}
          >
            {t('CENTER_BASED_MONITORING_RESULTS.REQUEST_TO_RESEND')}
            <IconRefreshCcw01 size="20" fill="primary" />
          </Button>
        ) : null}
      </div>

      {isOpenRequestModal ? (
        <ConfirmationModal
          title={t('CENTER_BASED_MONITORING_RESULTS.RESUBMIT_CENTER')}
          isOpen={isOpenRequestModal}
          onClose={closeRequestModal}
          portal
          cancelButton={{
            onClick: closeRequestModal,
            label: t('AFFIDAVIT_STEP_ONE.CONFIRMATION_DELETE_BUTTON_TEXT'),
            fill: 'outline',
            type: 'light',
          }}
          confirmButton={{
            onClick: confirmRequest,
            label: t('AFFIDAVIT_STEP_ONE.CONFIRMATION_BUTTON_TEXT'),
            fill: 'fill',
            type: 'info',
            loading: requestLoading,
          }}
        />
      ) : null}
    </>
  );
}

export default Actions;
