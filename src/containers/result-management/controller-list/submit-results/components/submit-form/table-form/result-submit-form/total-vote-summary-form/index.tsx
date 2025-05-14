import { useTranslation } from 'react-i18next';
import { TableSecondary } from '@pentabd/ui';
import { SUBMIT_RESULTS } from '@validations/result-management/submit-results/submitResultsOpFormValidation';
import RowVoteSummary from './RowVoteSummary';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { electionNameMapping } from '@helpers/election-type';
import { shouldDisplayExtraRows } from '../../../helper/should-display-extra-rows';

const TotalVoteSummaryForm = ({ loading, isReadOnly }: any) => {
  const { t } = useTranslation();

  const { electionTypes } = useFiltersRedux();

  const electionTypeLabel = electionNameMapping(
    electionTypes?.[0]?.value as number,
  );

  return (
    <div className="pb-8 result-submission-table">
      <TableSecondary
        columns={[]}
        loading={loading}
        loadingItemCount={
          shouldDisplayExtraRows(electionTypes?.[0]?.value) ? 5 : 3
        }
        loadingHeight="1.8rem"
      >
        {/* (১) প্রতিদ্বন্দ্বী প্রার্থীগণ কর্তৃক প্রাপ্ত ভোটের মোট সংখ্যা (আপত্তিকৃত ভোটসহ) */}
        <RowVoteSummary
          label={t(`SUBMIT_RESULTS.CANDIDATE_TOTAL_VOTE.${electionTypeLabel}`)}
          registerName={SUBMIT_RESULTS.TOTAL_LEGAL_VOTE_COUNT}
          disabled={true}
        />

        {/* (২) গণনা হইতে বাদ যাওয়া ভোটের মোট সংখ্যা */}
        <RowVoteSummary
          label={t(
            `SUBMIT_RESULTS.TOTAL_ILLEGAL_VOTER_NO.${electionTypeLabel}`,
          )}
          registerName={SUBMIT_RESULTS.TOTAL_ILLEGAL_VOTE_COUNT}
          disabled={false}
          isReadOnly={isReadOnly}
        />

        {/* (৩) [(১) ও (২) এর সমষ্টি] */}
        <RowVoteSummary
          label={t(`SUBMIT_RESULTS.TOTAL_VOTE.${electionTypeLabel}`)}
          registerName={SUBMIT_RESULTS.NET_TOTAL}
          disabled={true}
        />

        {shouldDisplayExtraRows(electionTypes?.[0]?.value) ? (
          <>
            {/* (৪) উপস্থিত ভোটার সংখ্যা */}
            <RowVoteSummary
              label={t(`SUBMIT_RESULTS.PRESENT_VOTER.${electionTypeLabel}`)}
              registerName={SUBMIT_RESULTS.NET_TOTAL}
              disabled={true}
            />

            {/* (৫) অনুপস্থিত ভোটার সংখ্যা */}
            <RowVoteSummary
              label={t(`SUBMIT_RESULTS.ABSENT_VOTER.${electionTypeLabel}`)}
              registerName={SUBMIT_RESULTS.TOTAL_ABSENT_VOTE_COUNT}
              disabled={true}
            />
          </>
        ) : null}
      </TableSecondary>
    </div>
  );
};

export default TotalVoteSummaryForm;
