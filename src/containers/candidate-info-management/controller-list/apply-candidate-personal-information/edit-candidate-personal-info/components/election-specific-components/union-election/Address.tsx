import { useTranslation } from 'react-i18next';
import FormInput from '@components/inputs/FormInput';
import { ADDRESS } from '@validations/candidate-info-management/operator/personalInfoValidation';

const Address = () => {
  const { t } = useTranslation();
  return (
    <>
      <FormInput
        title="CANDIDATE_PERSONAL_INFO.PERMANENT_ADDRESS"
        registerName={ADDRESS.PERMANENT_ADDRESS}
        placeholder={t('CANDIDATE_PERSONAL_INFO.PERMANENT_ADDRESS')}
      />
      <FormInput
        title="CANDIDATE_PERSONAL_INFO.PRESENT_ADDRESS"
        registerName={ADDRESS.PRESENT_ADDRESS}
        placeholder={t('CANDIDATE_PERSONAL_INFO.PRESENT_ADDRESS')}
      />
    </>
  );
};

export default Address;
