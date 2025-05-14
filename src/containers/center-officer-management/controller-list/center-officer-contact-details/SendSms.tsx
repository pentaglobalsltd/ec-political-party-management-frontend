import { usePollingPersonnelCenterSendCredential } from '@hooks/center-officer-management/controller-list/polling-center/useGetPollingPersonnelCenterSendCredential';
import { Button, Text } from '@pentabd/ui';
import { useTranslation } from 'react-i18next';
import { PRESIDING_OFFICER } from './constants';
import { useEffect } from 'react';
import { PollingCenterTypes } from '@type/center-officer-management/center-officer-contact-details-types';

export const SendSmsAction = ({
  raw,
  getDataOnSuccess,
}: {
  raw: PollingCenterTypes;
  getDataOnSuccess?: () => void;
}) => {
  const { t } = useTranslation();
  const {
    pollingPersonnelCenterSendCredentialData,
    success,
    loading,
    setSuccess,
  } = usePollingPersonnelCenterSendCredential();

  const sendSms = (id?: number) => {
    if (id)
      pollingPersonnelCenterSendCredentialData({
        pollingPersonnelCenterId: id,
      });
  };

  useEffect(() => {
    if (success) {
      getDataOnSuccess && getDataOnSuccess();
      setSuccess(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  return (
    <div>
      {raw?.pollingPersonnelType === PRESIDING_OFFICER ? (
        <Button
          type="primary"
          fill="outline"
          loading={loading}
          onClick={() => sendSms(raw?.pollingPersonnelCenterId)}
          key={raw?.pollingPersonnelCenterId}
        >
          <Text component="p" sizeType="fs" size="sm" weight="semibold">
            {raw?.isCredentialSent
              ? t('CENTER_BASED_OFFICER_ALLOCATION.RESEND_SMS')
              : t('CENTER_BASED_OFFICER_ALLOCATION.SEND_SMS')}
          </Text>
        </Button>
      ) : null}
    </div>
  );
};
