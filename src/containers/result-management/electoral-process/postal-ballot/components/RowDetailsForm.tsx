/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';

import { TableData, TableRow, Text } from '@pentabd/ui';

import FormChildInput from '@components/inputs/FormChildInput';
import { FORM_FIELDS } from '@constants/forms';
import { CHECK_ONLY_NUMBER_AND_EMPTY } from '@constants/validation-string';
import { SUBMIT_RESULTS } from '@validations/result-management/submit-results/submitResultsOpFormValidation';
import { getDigitBanglaFromEnglish } from '@utils';

const SUBMIT_RESULTS_CONSTANT = FORM_FIELDS.RESULT_MANAGEMENT.SUBMIT_RESULTS;

const RowDetailsForm = ({ index, row, setValue }: any) => {
  const { t } = useTranslation();
  const { watch } = useFormContext();

  const rowDataWatch = watch('candidateVoteDetails');

  useEffect(() => {
    let rowSum = 0;
    let legalVoteCount =
      rowDataWatch?.[index]?.[SUBMIT_RESULTS_CONSTANT.LEGAL_VOTE_COUNT] || 0;
    let challengedLegalVoteCount =
      rowDataWatch?.[index]?.[
        SUBMIT_RESULTS_CONSTANT.CHALLENGED_LEGAL_VOTE_COUNT
      ] || 0;

    rowSum = parseInt(legalVoteCount) + parseInt(challengedLegalVoteCount);

    setValue(
      `${SUBMIT_RESULTS.CANDIDATE_VOTE_DETAILS}.${index}.${SUBMIT_RESULTS.TOTAL_ROW_VOTE_COUNT}`,
      rowSum,
    );
  }, [
    rowDataWatch?.[index]?.[SUBMIT_RESULTS_CONSTANT.LEGAL_VOTE_COUNT],
    rowDataWatch?.[index]?.[
      SUBMIT_RESULTS_CONSTANT.CHALLENGED_LEGAL_VOTE_COUNT
    ],
  ]);

  return (
    <TableRow key={index} className="bg-primary-25">
      <TableData className="text-center">
        {row?.candidateSerialNo
          ? getDigitBanglaFromEnglish(row?.candidateSerialNo)
          : getDigitBanglaFromEnglish(0)}
      </TableData>
      <TableData className="text-nowrap w-50">
        <Text size="md">{row?.candidateName}</Text>
      </TableData>
      <TableData>{row?.symbolName}</TableData>

      {/* মোট বৈধ ভোটের সংখ্যা */}
      <TableData>
        <FormChildInput
          textAlign={'text-end'}
          registerName={`candidateVoteDetails.${index}.${SUBMIT_RESULTS.TOTAL_ROW_POSTAL_VOTE_COUNT}`}
          isMinWidth
          placeholder={t('PLACEHOLDER.ENTER_NUMBER')}
          formattedValue={CHECK_ONLY_NUMBER_AND_EMPTY}
          size="xs"
          // disabled
          autoFocus={index === 0}
          onFocus={(e) => e.target.select()}
        />
      </TableData>
    </TableRow>
  );
};

export default RowDetailsForm;
