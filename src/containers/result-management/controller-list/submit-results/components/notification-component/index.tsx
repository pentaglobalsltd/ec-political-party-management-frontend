import { useTranslation } from 'react-i18next';

import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import NotificationItem from './NotificationCard';
import { useContext, useEffect, useState } from 'react';
import { GetPollingCenterResultSummaryForOp } from '@hooks/result-management/submit-results/usePollingCenterResultSummaryForOp';
import { useFormContext } from 'react-hook-form';
import { FORM_FIELDS } from '@constants/forms';
import { SubmitResultContext } from '../../context/submitResultContext';

const SUBMIT_RESULTS = FORM_FIELDS.RESULT_MANAGEMENT.SUBMIT_RESULTS;

interface Props {
  getPollingCenterResultSummaryForOp: (
    obj: GetPollingCenterResultSummaryForOp,
  ) => void;
}

const NotificationComponent = ({
  getPollingCenterResultSummaryForOp,
}: Props) => {
  const [notificationItems, setNotificationItems] = useState<any>([]);

  const { t } = useTranslation();
  const { language } = useLanguage();
  const { watch } = useFormContext();
  const scheduleIdWatch = watch(SUBMIT_RESULTS.SCHEDULE);

  const { contextData } = useContext(SubmitResultContext)!;

  const handleNotificationIconClick = (notificationItemId: number) => {
    setNotificationItems((prevItems: any) =>
      prevItems.map((item: any) =>
        item.pollingCenterId === notificationItemId
          ? { ...item, isVisible: false }
          : item,
      ),
    );
  };

  useEffect(() => {
    if (contextData?.contextResultSummaryOp) {
      setNotificationItems(
        contextData?.contextResultSummaryOp?.resubmittedPollingCenters,
      );
    }
  }, [contextData?.contextResultSummaryOp]);

  useEffect(() => {
    if (scheduleIdWatch) {
      getPollingCenterResultSummaryForOp({
        scheduleId: scheduleIdWatch,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleIdWatch]);

  return (
    <>
      {notificationItems &&
        notificationItems?.map((item: any, index: number) => {
          return (
            <div key={index}>
              <NotificationItem
                key={index}
                id={item.pollingCenterId}
                title={
                  item?.pollingCenterResultStatus === 'RETURNED_BY_ARO'
                    ? t('SUBMIT_RESULTS.NOTIFICATION_ERROR_BY_ARO')
                    : t('SUBMIT_RESULTS.NOTIFICATION_ERROR_BY_ADMIN')
                }
                text={
                  language === LANGUAGE.BANGLA
                    ? `${item?.pollingCenterSerial} - ${item?.pollingInstituteNameBn} ${item?.pollingCenterNameBn} (${item?.candidateTypeNameBn})`
                    : `${item?.pollingCenterSerial} - ${item?.pollingInstituteNameEn} ${item?.pollingCenterNameEn} (${item?.candidateTypeNameEn})`
                }
                isVisible={item.isVisible !== undefined ? item.isVisible : true}
                onIconClick={handleNotificationIconClick}
              />
            </div>
          );
        })}
    </>
  );
};

export default NotificationComponent;
