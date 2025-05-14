import { useTranslation } from 'react-i18next';

import FormInput from '@components/inputs/FormInput';
import { BASIC_INFO } from '@validations/candidate-info-management/operator/income-source-details/incomeSourceDetailsValidation';

export const BasicInfo = () => {
  const { t } = useTranslation();
  return (
    <>
      <FormInput
        title="INCOME_SOURCE_DETAILS.VOTER_AREA_NAME_AND_NUMBER"
        registerName={BASIC_INFO.CONSTITUENCY_NAME_AND_NUMBER}
        placeholder={t('INCOME_SOURCE_DETAILS.VOTER_AREA_NAME_AND_NUMBER')}
        disabled
      />
      <FormInput
        title="INCOME_SOURCE_DETAILS.CANDIDATE_NAME"
        registerName={BASIC_INFO.CANDIDATE_NAME}
        placeholder={t('INCOME_SOURCE_DETAILS.CANDIDATE_NAME')}
        disabled
      />
      <FormInput
        title="INCOME_SOURCE_DETAILS.CANDIDATE_ADDRESS"
        registerName={BASIC_INFO.CANDIDATE_ADDRESS}
        placeholder={t('INCOME_SOURCE_DETAILS.CANDIDATE_ADDRESS')}
        disabled
      />
    </>
  );
};
