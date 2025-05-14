import { useTranslation } from 'react-i18next';
import { IconCheckCircle } from '@pentabd/icons';
import { Button, Text } from '@pentabd/ui';

function PublishModal({
  closePublishModal,
}: {
  closePublishModal: () => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="container p-9">
      <div className="my-8">
        <IconCheckCircle fill="success" size="40" />
      </div>
      <div className="mb-16">
        <Text weight="bold" size="lg" color="title">
          {t('RESULTS_PUBLISHED_ON_WEBSITE.WEBSITE_PUBLISHED')}
        </Text>
      </div>
      <div className="d-flex justify-content-center">
        <Button
          fill="fill"
          type="primary"
          className="flex-fill"
          htmlType="button"
          onClick={closePublishModal}
        >
          {t('RESULTS_PUBLISHED_ON_WEBSITE.OKAY')}
        </Button>
      </div>
    </div>
  );
}

export default PublishModal;
