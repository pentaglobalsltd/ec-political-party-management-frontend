import { useTranslation, Trans } from 'react-i18next';
import { Text } from '@pentabd/ui';

import { useConstituencies } from '@hooks/miscellaneous/master-hook/constituency/useConstituencies';
import FormSelect from '@components/inputs/FormSelect';
import { FORM_FIELDS } from '@constants/forms';

const FOURTH_PART =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.FOURTH_PART;

const SelectedNo = ({ candidateName }: { candidateName?: string }) => {
  const { t } = useTranslation();
  const { constituencies } = useConstituencies({ size: 300 });
  return (
    <div className="mb-9">
      <div className="rounded-4 p-9 bg-info-50 mb-9">
        <Text weight="medium" size="sm" color="title">
          {t('FOURTH_PART.SELECTED_NO_TITLE')}
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
            {t('FOURTH_PART.SELECTED_NO_ANNOUNCEMENT_FIRST_PART', {
              CANDIDATE_NAME: candidateName,
            })}
          </Text>
        </div>
        <FormSelect
          title="FOURTH_PART.ELECTION_AREA"
          name={FOURTH_PART.CANDIDATE_PRESENT_ELECTION_INFO.CONSTITUENCY_ID}
          options={constituencies}
          placeholder={t('PLACEHOLDER.SELECT')}
        />
        <Text weight="medium" size="sm" color="title">
          <Trans i18nKey="FOURTH_PART.SELECTED_NO_ANNOUNCEMENT_LAST_PART"></Trans>
        </Text>
      </div>
    </div>
  );
};

export default SelectedNo;
