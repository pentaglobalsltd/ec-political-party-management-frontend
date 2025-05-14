import { useContext, useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import CandidatesVoteDetailForm from './candidates-vote-detail-form';
import { SUBMIT_RESULTS } from '@validations/result-management/submit-results/submitResultsOpFormValidation';
import { SubmitResultContext } from '../../../../context/submitResultContext';
import TotalVoteSummaryForm from './total-vote-summary-form';

interface Props {
  loading: boolean;
  isErrorModalOpen: boolean;
}

const ResultSubmitForm = ({ loading, isErrorModalOpen }: Props) => {
  const { watch } = useFormContext();
  const centerIdWatch = watch(SUBMIT_RESULTS.POLLING_CENTERS);

  const resultRef = useRef<HTMLDivElement>(null);

  const { contextData } = useContext(SubmitResultContext)!;

  useEffect(() => {
    // for scrolling into dynamic list
    if (centerIdWatch && contextData?.isSuccessResult) {
      if (resultRef && resultRef.current) {
        resultRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [centerIdWatch, contextData?.isSuccessResult]);

  return (
    // <div ref={resultRef} className="vh-100">
    <div ref={resultRef}>
      {/* Dynamic Candidate Vote details Form */}
      <CandidatesVoteDetailForm
        loading={loading}
        isReadOnly={isErrorModalOpen}
      />

      {/* Static Total Vote Form */}
      <TotalVoteSummaryForm loading={loading} isReadOnly={isErrorModalOpen} />
    </div>
  );
};

export default ResultSubmitForm;
