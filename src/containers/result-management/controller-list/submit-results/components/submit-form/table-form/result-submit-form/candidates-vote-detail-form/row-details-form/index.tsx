import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { TableData, TableRow, Text } from '@pentabd/ui';
import FormChildInput from '@components/inputs/FormChildInput';
import { CHECK_ONLY_NUMBER_AND_EMPTY } from '@constants/validation-string';
import { FORM_FIELDS } from '@constants/forms';
import { SUBMIT_RESULTS } from '@validations/result-management/submit-results/submitResultsOpFormValidation';
import { getDigitBanglaFromEnglish } from '@utils';
import { SubmitResultContext } from '../../../../../../context/submitResultContext';
import ElectionSpecificRows from './election-specific-rows';
import { PropsElectionSpecificRows } from './election-specific-rows/interface';

const SUBMIT_RESULTS_CONSTANT = FORM_FIELDS.RESULT_MANAGEMENT.SUBMIT_RESULTS;

interface Props extends PropsElectionSpecificRows {
  row: any;
}

const RowDetailsForm = ({ index, row, isReadOnly }: Props) => {
  const { t } = useTranslation();
  const { watch, setValue } = useFormContext();

  const { contextData, setContextData } = useContext(SubmitResultContext)!;

  const rowDataWatch = watch(SUBMIT_RESULTS.CANDIDATE_VOTE_DETAILS);

  useEffect(
    () => {
      let rowSum = 0;
      let legalVoteCount =
        rowDataWatch?.[index]?.[SUBMIT_RESULTS_CONSTANT.LEGAL_VOTE_COUNT] || 0;
      let challengedLegalVoteCount =
        rowDataWatch?.[index]?.[
          SUBMIT_RESULTS_CONSTANT.CHALLENGED_LEGAL_VOTE_COUNT
        ] || 0;

      rowSum = parseInt(legalVoteCount) + parseInt(challengedLegalVoteCount);

      const updatedCountArray =
        contextData?.contextResultByCandidates?.candidateVoteCounts?.map(
          (item, itemIndx) => {
            if (itemIndx === index) {
              return {
                ...item,
                legalVoteCount: parseInt(legalVoteCount),
                challengedLegalVoteCount: parseInt(challengedLegalVoteCount),
                totalLegalVoteCount: rowSum,
              };
            }

            return item;
          },
        );

      setContextData((prev: any) => ({
        ...prev,
        contextResultByCandidates: {
          ...prev?.contextResultByCandidates,
          candidateVoteCounts: updatedCountArray,
        },
      }));

      setValue(
        `${SUBMIT_RESULTS.CANDIDATE_VOTE_DETAILS}.${index}.${SUBMIT_RESULTS.TOTAL_ROW_VOTE_COUNT}`,
        rowSum,
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      // eslint-disable-next-line react-hooks/exhaustive-deps
      rowDataWatch?.[index]?.[SUBMIT_RESULTS_CONSTANT.LEGAL_VOTE_COUNT],
      // eslint-disable-next-line react-hooks/exhaustive-deps
      rowDataWatch?.[index]?.[
        SUBMIT_RESULTS_CONSTANT.CHALLENGED_LEGAL_VOTE_COUNT
      ],
    ],
  );

  return (
    <TableRow key={index} className="bg-primary-50">
      <TableData className="text-center">
        {row?.candidateSerialNo
          ? getDigitBanglaFromEnglish(row?.candidateSerialNo)
          : getDigitBanglaFromEnglish(0)}
      </TableData>
      <TableData className="text-nowrap w-50">
        <Text size="md">{row?.candidateName}</Text>
      </TableData>
      <TableData>{row?.symbolName}</TableData>

      {/* বৈধ ভোটের সংখ্যা */}
      <TableData>
        <FormChildInput
          textAlign={'text-end'}
          registerName={`candidateVoteDetails.${index}.${SUBMIT_RESULTS.LEGAL_VOTE_COUNT}`}
          isMinWidth
          placeholder={t('PLACEHOLDER.ENTER_NUMBER')}
          formattedValue={CHECK_ONLY_NUMBER_AND_EMPTY}
          autoFocus={index === 0}
          onFocus={(e) => e.target.select()}
          size="xs"
          readonly={isReadOnly}
        />
      </TableData>

      <ElectionSpecificRows index={index} isReadOnly={isReadOnly} />
    </TableRow>
  );
};

export default RowDetailsForm;
