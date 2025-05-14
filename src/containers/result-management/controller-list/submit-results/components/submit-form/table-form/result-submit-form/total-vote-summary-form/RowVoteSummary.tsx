import { useTranslation } from 'react-i18next';
import { TableData, TableRow } from '@pentabd/ui';
import FormChildInput from '@components/inputs/FormChildInput';
import { CHECK_ONLY_NUMBER_AND_EMPTY } from '@constants/validation-string';

interface Props {
  label: string;
  registerName: string;
  disabled: boolean;
  isReadOnly?: boolean;
}

const RowVoteSummary = ({
  label,
  registerName,
  disabled,
  isReadOnly = false,
}: Props) => {
  const { t } = useTranslation();

  return (
    <TableRow className="bg-primary-50">
      <TableData>{label}</TableData>

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
        <FormChildInput
          textAlign={'text-end'}
          registerName={registerName}
          disabled={disabled}
          readonly={isReadOnly}
          isMinWidth
          placeholder={t('PLACEHOLDER.ENTER_NUMBER')}
          formattedValue={CHECK_ONLY_NUMBER_AND_EMPTY}
          size="xs"
        />
      </TableData>
    </TableRow>
  );
};

export default RowVoteSummary;
