import { IconCheckCircleBroken, IconRefreshCcw01 } from '@pentabd/icons';
import { Button } from '@pentabd/ui';
import { useTranslation } from 'react-i18next';

interface Props {
  reset: () => void;
  isCreateRequested: boolean;
}

const ThirdPartButtons = ({ reset, isCreateRequested }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="border-top pt-8">
      <div className="col-12 d-flex justify-content-end gap-6">
        <Button
          fill="outline"
          className="border-info"
          type="info"
          onClick={() => reset()}
        >
          {t('NOMINATION_FORM_FIRST_PART.RESET_BUTTON')}
          <IconRefreshCcw01 size="20" fill="info" />
        </Button>
        <Button
          fill="fill"
          className="border-primary"
          type="success"
          loading={isCreateRequested}
          htmlType="submit"
        >
          {t('NOMINATION_FORM_FIRST_PART.SUBMIT_BUTTON')}
          <IconCheckCircleBroken size="20" fill="white" />
        </Button>
      </div>
    </div>
  );
};

export default ThirdPartButtons;
