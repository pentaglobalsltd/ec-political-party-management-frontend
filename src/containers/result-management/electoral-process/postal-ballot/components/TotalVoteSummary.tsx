import { useTranslation } from 'react-i18next';
import { TableData, TableRow, TableSecondary } from '@pentabd/ui';

import FormChildInput from '@components/inputs/FormChildInput';
import { SUBMIT_RESULTS } from '@validations/result-management/submit-results/submitResultsOpFormValidation';
import { CHECK_ONLY_NUMBER_AND_EMPTY } from '@constants/validation-string';

const TotalVoteSummary = ({ loading }: any) => {
  const { t } = useTranslation();

  return (
    <div className="pb-8 result-submission-table">
      <TableSecondary columns={[]} loading={loading}>
        <TableRow className="bg-primary-25">
          <TableData>{t('SUBMIT_RESULTS.TOTAL_VOTE_POSTAL')}</TableData>
          <TableData></TableData>
          <TableData></TableData>
          <TableData></TableData>
          <TableData></TableData>
          <TableData></TableData>
          <TableData></TableData>
          <TableData></TableData>
          <TableData></TableData>
          <TableData></TableData>
          <TableData></TableData>
          <TableData></TableData>
          <TableData>
            {/* (১) প্রতিদ্বন্দ্বী প্রার্থীগণ কর্তৃক প্রাপ্ত ভোটের মোট সংখ্যা (আপত্তিকৃত ভোটসহ) */}
            <FormChildInput
              textAlign={'text-end'}
              registerName={SUBMIT_RESULTS.TOTAL_POSTAL_VOTE_COUNT}
              disabled
              isMinWidth
              placeholder={t('PLACEHOLDER.ENTER_NUMBER')}
              formattedValue={CHECK_ONLY_NUMBER_AND_EMPTY}
              size="xs"
            />
          </TableData>
        </TableRow>
      </TableSecondary>
    </div>
  );
};

export default TotalVoteSummary;
