import { useTranslation } from 'react-i18next';
import FormInput from '@components/inputs/FormInput';
import { CURRENT_WORKPLACE } from '@validations/candidate-info-management/operator/personalInfoValidation';

const CurrentWorkplace = () => {
  const { t } = useTranslation();
  return (
    <>
      <FormInput
        title="CANDIDATE_PERSONAL_INFO.WORKPLACE_NAME"
        placeholder={t('PLACEHOLDER.ENTER')}
        registerName={CURRENT_WORKPLACE.WORKPLACE_NAME}
      />
      <FormInput
        title="CANDIDATE_PERSONAL_INFO.WORKPLACE_ADDRESS"
        placeholder={t('PLACEHOLDER.ENTER')}
        registerName={CURRENT_WORKPLACE.WORKPLACE_ADDRESS}
      />
    </>
  );
};

export default CurrentWorkplace;
