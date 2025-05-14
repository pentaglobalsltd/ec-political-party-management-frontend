import { useState } from 'react';
import {
  useLanguage,
  LANGUAGE,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import NotificationItem from './NotificationCard';
import { ResubmittedPollingCenters } from '@type/result-management/electoral-process/submit-results/submitResults';
import { useTranslation } from 'react-i18next';

const NotificationComponent = ({
  data,
}: {
  data?: ResubmittedPollingCenters[];
}) => {
  const [notificationItems, setNotificationItems] = useState<any>(data);

  const { language } = useLanguage();
  const { t } = useTranslation();
  const handleNotificationIconClick = (notificationItemId: number) => {
    setNotificationItems((prevItems: any) =>
      prevItems.map((item: any) =>
        item.pollingCenterId === notificationItemId
          ? { ...item, isVisible: false }
          : item,
      ),
    );
  };

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
