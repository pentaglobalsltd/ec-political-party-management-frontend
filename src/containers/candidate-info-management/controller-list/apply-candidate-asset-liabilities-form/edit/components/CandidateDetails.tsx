import { useTranslation } from 'react-i18next';

import FormInput from '@components/inputs/FormInput';

import { FORM_FIELDS } from '@constants/forms';

const ASSET_LIABILITIES =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.ASSET_LIABILITIES;

export const CandidateDetails = () => {
  const { t } = useTranslation();
  return (
    <div className="d-flex flex-column pt-9 border-bottom">
      <FormInput
        title="ASSET_LIABILITIES.ELECTION_AREA_NAME_NUMBER"
        registerName={ASSET_LIABILITIES.ELECTION_AREA_NAME_NUMBER}
        placeholder={t('PLACEHOLDER.ENTER')}
        disabled
      />

      <FormInput
        title="ASSET_LIABILITIES.CANDIDATE_NAME"
        registerName={ASSET_LIABILITIES.CANDIDATE_NAME}
        placeholder={t('PLACEHOLDER.ENTER')}
        disabled
      />

      <FormInput
        title="ASSET_LIABILITIES.CANDIDATE_ADDRESS"
        registerName={ASSET_LIABILITIES.CANDIDATE_ADDRESS}
        placeholder={t('PLACEHOLDER.ENTER')}
        disabled
      />
    </div>
  );
};
