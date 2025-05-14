import { Text } from '@pentabd/ui';
import { useTranslation } from 'react-i18next';
import { VoterCount } from '../types';

const ADD_VOTER_AREA = 'UPDATE_VOTE_CENTER.ADD_VOTER_AREA';

interface Props {
  voterCount: VoterCount;
}

const VoterAreaFooter = ({ voterCount }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="d-grid grid-cols-12">
      {/* Total Male Vote */}
      <Text
        size="sm"
        weight="medium"
        className="col-span-3 text-primary-semi-middark"
      >
        {t(`${ADD_VOTER_AREA}.FOOTER.TOTAL_MALE_VOTE`)} : {voterCount?.male}
      </Text>

      {/* Total Female Vote */}
      <Text
        size="sm"
        weight="medium"
        className="col-span-3 text-primary-semi-middark"
      >
        {t(`${ADD_VOTER_AREA}.FOOTER.TOTAL_FEMALE_VOTE`)} : {voterCount?.female}
      </Text>

      {/* Total Third Gender Vote */}
      <Text
        size="sm"
        weight="medium"
        className="col-span-3 text-primary-semi-middark"
      >
        {t(`${ADD_VOTER_AREA}.FOOTER.TOTAL_THIRD_GENDER_VOTE`)} :{' '}
        {voterCount?.thirdGender}
      </Text>

      {/* Total Vote */}
      <Text
        size="sm"
        weight="medium"
        className="col-span-3 text-primary-semi-middark"
      >
        {t(`${ADD_VOTER_AREA}.FOOTER.TOTAL_VOTE`)} : {voterCount?.total}
      </Text>
    </div>
  );
};

export default VoterAreaFooter;
