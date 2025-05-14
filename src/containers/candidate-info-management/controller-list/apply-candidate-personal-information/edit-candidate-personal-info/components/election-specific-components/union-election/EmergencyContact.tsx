import { useTranslation } from 'react-i18next';
import FormInput from '@components/inputs/FormInput';
import { EMERGENCY_CONTACT } from '@validations/candidate-info-management/operator/personalInfoValidation';

const EmergencyContact = () => {
  const { t } = useTranslation();
  return (
    <>
      <FormInput
        title="CANDIDATE_PERSONAL_INFO.TELEPHONE_NUMBER"
        registerName={EMERGENCY_CONTACT.TELEPHONE_NUMBER}
        placeholder={t('PLACEHOLDER.ENTER')}
      />
      <FormInput
        title="CANDIDATE_PERSONAL_INFO.MOBILE_NUMBER"
        registerName={EMERGENCY_CONTACT.MOBILE_NUMBER}
        placeholder={t('CANDIDATE_PERSONAL_INFO.MOBILE_NUMBER')}
        required
      />
      <FormInput
        title="CANDIDATE_PERSONAL_INFO.EMAIL_ADDRESS"
        registerName={EMERGENCY_CONTACT.EMAIL_ADDRESS}
        placeholder={t('CANDIDATE_PERSONAL_INFO.EMAIL_ADDRESS')}
      />
    </>
  );
};

export default EmergencyContact;
