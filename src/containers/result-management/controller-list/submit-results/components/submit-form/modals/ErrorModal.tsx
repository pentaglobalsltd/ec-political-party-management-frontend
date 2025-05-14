import { useTranslation } from 'react-i18next';
import { Button, Text } from '@pentabd/ui';

import IconAlertCircle from '@images/icons/IconAlertCircle';

const ErrorModal = ({ errorText, closeErrorModal }: any) => {
  const { t } = useTranslation();

  return (
    <div className="p-10">
      <div className="d-flex flex-column gap-8">
        <IconAlertCircle size="56" />
        <Text className="border-bottom pb-8">{errorText}</Text>
        <Button
          size="sm"
          type="secondary"
          className="bg-purple text-white"
          onClick={closeErrorModal}
        >
          {t('SUBMIT_RESULTS.MODAL_RETURN_BUTTON')}
        </Button>
      </div>
    </div>
  );
};

export default ErrorModal;
