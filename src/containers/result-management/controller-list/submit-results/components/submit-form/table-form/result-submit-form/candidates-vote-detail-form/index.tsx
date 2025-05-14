import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { TableSecondary } from '@pentabd/ui';
import RowDetailsForm from './row-details-form';
import { getDigitBanglaFromEnglish } from '@utils';
import { SubmitResultContext } from '../../../../../context/submitResultContext';

import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { tableColumns } from './columns';

interface Props {
  loading: boolean;
  isReadOnly: boolean;
}

const CandidatesVoteDetailForm = ({ loading, isReadOnly }: Props) => {
  const { t } = useTranslation();
  const { electionTypes } = useFiltersRedux();
  const { contextData } = useContext(SubmitResultContext)!;

  const candidatesNumber = contextData?.contextResultByCandidates
    ?.candidateVoteCounts?.length
    ? getDigitBanglaFromEnglish(
        contextData?.contextResultByCandidates?.candidateVoteCounts?.length,
      )
    : getDigitBanglaFromEnglish(0);

  return (
    <div className="pb-8 mt-10 result-submission-table">
      <TableSecondary
        columns={tableColumns({
          t,
          candidatesNumber,
          electionTypeId: electionTypes?.[0]?.value as number,
        })}
        loading={loading}
        loadingItemCount={7}
        tableType="primary"
        loadingHeight="1.8rem"
      >
        {contextData?.contextResultByCandidates?.candidateVoteCounts?.map(
          (item: any, index: number) => (
            <RowDetailsForm
              index={index}
              row={item}
              key={index}
              isReadOnly={isReadOnly}
            />
          ),
        )}
      </TableSecondary>
    </div>
  );
};

export default CandidatesVoteDetailForm;
