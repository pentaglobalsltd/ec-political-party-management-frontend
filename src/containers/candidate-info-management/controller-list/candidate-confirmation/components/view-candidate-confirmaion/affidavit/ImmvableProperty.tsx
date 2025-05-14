import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { SectionHeader, Table, Text } from '@pentabd/ui';
import { immovablePropertyTableColumns } from '../constants';
import { useAffidavitImmovableProperty } from '@hooks/candidate-info-management/controller-list/candidate-confirmation/affidavit-form/useImmovablePropert';

const ImmovableProperty = () => {
  const { t } = useTranslation();
  const { electionSettingsId, candidateElectionDetailsId } = useParams();

  const { affidavitImmovablePropertyData } = useAffidavitImmovableProperty({
    electionSettingsId,
    candidateElectionDetailsId,
  });
  return (
    <div className="py-10 border-top">
      <SectionHeader title={t('CANDIDATE_CONFIRMATION.IMMOVABLE_PROPERTY')} />
      <div className="d-flex flex-column gap-9 py-10">
        <Text size="sm" weight="medium" color="title">
          {t('CANDIDATE_CONFIRMATION.IMMOVABLE_PROPERTY_DESCRIPTION')}
        </Text>
        <Table
          columns={immovablePropertyTableColumns(t)}
          rows={
            affidavitImmovablePropertyData?.immovableAssets?.map(
              (item, idx) => ({
                id: idx,
                ...item,
              }),
            ) || []
          }
        />
      </div>
    </div>
  );
};
export default ImmovableProperty;
