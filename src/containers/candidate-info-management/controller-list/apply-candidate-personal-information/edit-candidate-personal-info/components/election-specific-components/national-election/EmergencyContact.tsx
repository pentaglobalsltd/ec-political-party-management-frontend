import { useTranslation } from 'react-i18next';
import FormInput from '@components/inputs/FormInput';
import { EMERGENCY_CONTACT } from '@validations/candidate-info-management/operator/personalInfoValidation';

const EmergencyContact = () => {
  const { t } = useTranslation();
  return (
    <>
      <FormInput
        title="CANDIDATE_PERSONAL_INFO.TELEPHONE_NUMBER"
        placeholder={t('PLACEHOLDER.ENTER')}
        registerName={EMERGENCY_CONTACT.TELEPHONE_NUMBER}
      />
      <FormInput
        title="CANDIDATE_PERSONAL_INFO.MOBILE_NUMBER"
        placeholder={t('PLACEHOLDER.ENTER')}
        registerName={EMERGENCY_CONTACT.MOBILE_NUMBER}
      />
      <FormInput
        title="CANDIDATE_PERSONAL_INFO.EMAIL_ADDRESS"
        placeholder={t('PLACEHOLDER.ENTER')}
        registerName={EMERGENCY_CONTACT.EMAIL_ADDRESS}
      />
    </>
  );
};

export default EmergencyContact;
