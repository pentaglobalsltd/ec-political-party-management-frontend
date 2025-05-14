import { useTranslation } from 'react-i18next';
import { TableSecondary } from '@pentabd/ui';

import { getDigitBanglaFromEnglish } from '@utils';
import RowDetailsForm from './RowDetailsForm';

const CandidatesVoteDetailForm = ({
  loading,
  candidateVoteDetailsFields,
  setValue,
}: any) => {
  const { t } = useTranslation();
  const candidatesNumber = candidateVoteDetailsFields?.length
    ? getDigitBanglaFromEnglish(candidateVoteDetailsFields?.length)
    : getDigitBanglaFromEnglish(0);

  return (
    <div className="pb-8 mt-10 result-submission-table">
      <TableSecondary
        columns={[
          {
            id: 6,
            name: t('SUBMIT_RESULTS.CANDIDATE_SERIAL_NO'),
          },
          {
            id: 1,
            name: `${t('SUBMIT_RESULTS.CANDIDATE_NAME')} (${t(
              'SUBMIT_RESULTS.ELECTION_CANDIDATES',
            )} ${candidatesNumber})`,
          },
          {
            id: 2,
            name: t('SUBMIT_RESULTS.CANDIDATE_SYMBOL'),
          },

          {
            id: 3,
            name: t('SUBMIT_RESULTS.TOTAL_GET_POSTAL'),
          },
        ]}
        loading={loading}
        loadingItemCount={5}
      >
        {candidateVoteDetailsFields?.map((item: any, index: number) => (
          <RowDetailsForm
            index={index}
            row={item}
            key={index}
            setValue={setValue}
          />
        ))}
      </TableSecondary>
    </div>
  );
};

export default CandidatesVoteDetailForm;
