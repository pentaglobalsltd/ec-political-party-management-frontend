import { useTranslation } from 'react-i18next';

import { IconTrash01 } from '@pentabd/icons';
import { Button, Text } from '@pentabd/ui';

function DeleteModal({ closeDeleteModal }: any) {
  const { t } = useTranslation();

  return (
    <div className="container p-9">
      <div className="my-8">
        <IconTrash01 fill="danger" size="20" />
      </div>
      <div className="mb-16">
        <Text weight="bold" size="lg" color="title">
          {t('NOMINATION_OF_CANDIDATES.NOMINATION_CANCELLATION')}
        </Text>
        <br />
        <Text weight="medium" size="sm" color="subtitle2">
          {t('NOMINATION_OF_CANDIDATES.NOMINATION_CANCELLATION_CONFIRM_MSG')}
        </Text>
      </div>
      <div className="d-flex justify-content-center gap-7">
        <Button
          fill="outline"
          type="light"
          className="flex-fill"
          htmlType="button"
          onClick={closeDeleteModal}
        >
          {t('NOMINATION_OF_CANDIDATES.BACK')}
        </Button>
        <Button
          fill="fill"
          type="danger"
          className="flex-fill"
          htmlType="button"
          onClick={closeDeleteModal}
        >
          {t('NOMINATION_OF_CANDIDATES.CONFIRM')}
        </Button>
      </div>
    </div>
  );
}

export default DeleteModal;
