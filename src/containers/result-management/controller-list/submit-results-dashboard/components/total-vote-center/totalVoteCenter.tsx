import { Text } from '@pentabd/ui';
import { getDigitBanglaFromEnglish } from '@utils';
import { useTranslation } from 'react-i18next';
import PieChart from './pieChart';

export const TotalVoteCenter = ({ data }: any) => {
  const { t } = useTranslation();
  return (
    <div className="p-12 border rounded shadow-xl col-span-4 d-flex justify-content-between align-items-center">
      <div>
        <Text weight="semibold" className="lh-xl">
          {data.candidateTypeNameBn}
        </Text>
        <br />
        <Text size="xs" sizeType="display" weight="semibold">
          {getDigitBanglaFromEnglish(data.totalCenterCount)}
        </Text>
        <br />
        <Text weight="normal" size="xs">
          {t('SUBMIT_RESULTS.TOTAL_VOTE_CENTER')}
        </Text>
      </div>
      <PieChart data={data} />
    </div>
  );
};
