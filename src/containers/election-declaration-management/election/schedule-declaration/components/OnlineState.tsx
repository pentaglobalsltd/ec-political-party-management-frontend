import { Text } from '@pentabd/ui';
import { useTranslation } from 'react-i18next';

function OnlineState({ data }: { data: any }) {
  const { t } = useTranslation();
  return (
    <div>
      {data === true ? (
        <Text className="text-success">{t('SCHEDULE_DECLARATION.ACTIVE')}</Text>
      ) : (
        <Text className="text-subtitle1">
          {t(
            'SCHEDULE_DECLARATION.SCHEDULE_INFORMATION_FORM.ONLINE_NOMINATION_OPTIONS.INACTIVE',
          )}
        </Text>
      )}
    </div>
  );
}

export default OnlineState;
