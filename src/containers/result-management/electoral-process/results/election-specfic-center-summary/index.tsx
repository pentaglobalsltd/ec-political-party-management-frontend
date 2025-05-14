import { TFunction } from 'i18next';
import { Text } from '@pentabd/ui';
import { SelectOptionArray } from '@type/selection-option-type';
import DefaultElection from './default-election';
import { ELECTION_INFO } from '@constants/election-info';
import UnionParishadElection from './union-parishad';

export default function ElectionSpecificCenterSummary({
  t,
  scheduleId,
  electionType,
}: {
  t: TFunction<'translation', undefined>;
  scheduleId?: string | number;
  electionType?: SelectOptionArray[];
}) {
  const electionSpecificRender = () => {
    switch (electionType?.[0]?.value) {
      case ELECTION_INFO.UNION_PARISHAD.ID:
        return <UnionParishadElection scheduleId={scheduleId} />;
      default:
        return <DefaultElection scheduleId={scheduleId} />;
    }
  };
  return (
    <div className="pb-16">
      <div className="pb-10">
        <Text size="lg" weight="bold">
          {t('RESULTS.CENTER_SUMMARY')}
        </Text>
      </div>
      {electionSpecificRender()}
    </div>
  );
}
