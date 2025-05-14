import { useTranslation } from 'react-i18next';
import { TableData } from '@pentabd/ui';
import FormChildInput from '@components/inputs/FormChildInput';
import { CHECK_ONLY_NUMBER_AND_EMPTY } from '@constants/validation-string';
import { FORM_FIELDS } from '@constants/forms';
import { PropsElectionSpecificRows } from './interface';

const SUBMIT_RESULTS = FORM_FIELDS.RESULT_MANAGEMENT.SUBMIT_RESULTS;

const NationalElection = ({ index, isReadOnly }: PropsElectionSpecificRows) => {
  const { t } = useTranslation();

  return (
    <>
      {/*আপত্তিকর বৈধ ভোটের সংখ্যা */}
      <TableData>
        <FormChildInput
          textAlign={'text-end'}
          registerName={`candidateVoteDetails.${index}.${SUBMIT_RESULTS.CHALLENGED_LEGAL_VOTE_COUNT}`}
          isMinWidth
          placeholder={t('PLACEHOLDER.ENTER_NUMBER')}
          formattedValue={CHECK_ONLY_NUMBER_AND_EMPTY}
          size="xs"
          readonly={isReadOnly}
        />
      </TableData>

      {/* মোট বৈধ ভোটের সংখ্যা */}
      <TableData>
        <FormChildInput
          textAlign={'text-end'}
          registerName={`candidateVoteDetails.${index}.${SUBMIT_RESULTS.TOTAL_ROW_VOTE_COUNT}`}
          isMinWidth
          placeholder={t('PLACEHOLDER.ENTER_NUMBER')}
          formattedValue={CHECK_ONLY_NUMBER_AND_EMPTY}
          size="xs"
          disabled
        />
      </TableData>
    </>
  );
};

export default NationalElection;
