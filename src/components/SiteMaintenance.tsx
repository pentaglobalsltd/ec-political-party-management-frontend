import { useTranslation } from 'react-i18next';
import { Text } from '@pentabd/ui';

const SiteMaintenance = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column gap-6 align-items-center text-center">
      <Text size="lg" weight="bold" color="dark" sizeType="display">
        {t('SITE_MAINTENANCE.MAINTENANCE_TEXT')}
      </Text>
    </div>
  );
};

export default SiteMaintenance;
