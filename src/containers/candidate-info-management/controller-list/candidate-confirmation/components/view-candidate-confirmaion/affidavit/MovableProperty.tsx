import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { SectionHeader, Table, Text } from '@pentabd/ui';
import { movablePropertyTableColumns } from '../constants';
import { useAffidavitMovableProperty } from '@hooks/candidate-info-management/controller-list/candidate-confirmation/affidavit-form/useMovableproperty';
import { electionNameMapping } from '@helpers/election-type';

const MovableProperty = () => {
  const { t } = useTranslation();
  const { electionSettingsId, candidateElectionDetailsId, electionTypeId } = useParams();

  const { affidavitMovablePropertyData } = useAffidavitMovableProperty({
    electionSettingsId,
    candidateElectionDetailsId,
  });

  const electionTypeKey = electionNameMapping(Number(electionTypeId));

  return (
    <div className="py-10 border-top">
      <SectionHeader title={t('CANDIDATE_CONFIRMATION.MOVABLE_PROPERTY')} />
      <div className="d-flex flex-column gap-9 py-10">
        <Text size="sm" weight="medium" color="title">
          {t(`CANDIDATE_CONFIRMATION.MOVABLE_PROPERTY_DESCRIPTION.${electionTypeKey}`)}
        </Text>
        <Table
          columns={movablePropertyTableColumns(t)}
          rows={
            affidavitMovablePropertyData?.movableAssets?.map((item, idx) => ({
              id: idx,
              ...item,
            })) || []
          }
        />
      </div>
    </div>
  );
};
export default MovableProperty;
