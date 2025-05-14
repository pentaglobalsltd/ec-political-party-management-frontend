import { useTranslation } from 'react-i18next';

import { SummaryInfoCard } from '@pentabd/ui';
import {
  IconFemale,
  IconMale,
  IconThirdGender,
  IconTotalVoters,
} from '@images/icons';

interface VoterInfoProps {
  totalVoter: number;
  totalMaleVoter: number;
  totalFemaleVoter: number;
  totalThirdGenderVoter: number;
}

const VoterInfo = ({
  totalVoter,
  totalMaleVoter,
  totalFemaleVoter,
  totalThirdGenderVoter,
}: VoterInfoProps) => {
  const { t } = useTranslation();

  return (
    <div className="mt-6 mb-20 d-grid grid-cols-1 gap-6 align-items-end grid-cols-lg-6 grid-cols-xl-12">
      <div className="col-span-3">
        <SummaryInfoCard
          prefixIcon={<IconTotalVoters />}
          label={t('RESULT_AND_SITUATION_REVIEW.TOTAL_VOTERS')}
          styles={{
            border: 'border-dark',
            color: 'text-white',
            borderWidth: 'border-1',
            background: 'bg-dark',
            labelColor: 'text-white',
          }}
          value={totalVoter}
        />
      </div>
      <div className="col-span-3">
        <SummaryInfoCard
          prefixIcon={<IconMale />}
          label={t('RESULT_AND_SITUATION_REVIEW.GENDER.MALE')}
          styles={{
            border: 'border-success',
            color: 'text-white',
            borderWidth: 'border-1',
            background: 'bg-success',
            labelColor: 'text-white',
          }}
          value={totalMaleVoter}
        />
      </div>
      <div className="col-span-3">
        <SummaryInfoCard
          prefixIcon={<IconFemale />}
          label={t('RESULT_AND_SITUATION_REVIEW.GENDER.FEMALE')}
          styles={{
            border: 'border-info',
            color: 'text-white',
            borderWidth: 'border-1',
            background: 'bg-info',
            labelColor: 'text-white',
          }}
          value={totalFemaleVoter}
        />
      </div>
      <div className="col-span-3">
        <SummaryInfoCard
          prefixIcon={<IconThirdGender />}
          label={t('RESULT_AND_SITUATION_REVIEW.GENDER.THIRD_GENDER')}
          styles={{
            border: 'border-purple-semi-middark',
            color: 'text-white',
            borderWidth: 'border-1',
            background: 'bg-purple-semi-middark',
            labelColor: 'text-white',
          }}
          value={totalThirdGenderVoter}
        />
      </div>
    </div>
  );
};

export default VoterInfo;
