import { Text } from '@pentabd/ui';
import { useTranslation } from 'react-i18next';

import FormInput from '@components/inputs/FormInput';
import { FORM_FIELDS } from '@constants/forms';

const FOURTH_PART =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.FOURTH_PART;

const SelectedYes = ({ candidateName }: { candidateName?: string }) => {
  const { t } = useTranslation();
  return (
    <div className="mb-9">
      <div className="rounded-4 p-9 bg-info-50 mb-9">
        <Text weight="medium" size="sm" color="title">
          {t('FOURTH_PART.SELECTED_YES_TITLE')}
        </Text>
      </div>
      <div className="p-7 bg-info-50 rounded-4">
        <div className="pb-9">
          <Text size="lg" color="title" weight="semibold">
            {t('THIRD_PART.ANNOUNCEMENT')}
          </Text>
        </div>
        <div className="pb-9">
          <Text weight="medium" size="sm" color="title">
            {t('FOURTH_PART.SELECTED_YES_ANNOUNCEMENT_FIRST_PART', {
              CANDIDATE_NAME: candidateName,
            })}
          </Text>
        </div>
        <FormInput
          title="FOURTH_PART.ELECTION_NAME"
          placeholder={t('PLACEHOLDER.ENTER')}
          registerName={
            FOURTH_PART.CANDIDATE_PAST_ELECTION_INFO.PAST_ELECTION_NAME
          }
        />
        <FormInput
          title="FOURTH_PART.ELECTION_AREA_NAME_NUMBER"
          placeholder={t('PLACEHOLDER.ENTER')}
          registerName={
            FOURTH_PART.CANDIDATE_PAST_ELECTION_INFO.PAST_ELECTION_INFO
          }
        />
        <Text weight="medium" size="sm" color="title">
          {t('FOURTH_PART.SELECTED_YES_ANNOUNCEMENT_LAST_PART')}
        </Text>
      </div>
    </div>
  );
};

export default SelectedYes;
