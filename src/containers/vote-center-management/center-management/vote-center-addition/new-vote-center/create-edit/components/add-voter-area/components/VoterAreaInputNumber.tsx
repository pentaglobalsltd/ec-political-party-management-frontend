import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { InputText, Text } from '@pentabd/ui';

interface Props {
  registerName: string;
  onChangeVoterNumbers?: (value: any) => void;
  errors: any;
}

const VoterAreaInputNumber = ({
  registerName,
  onChangeVoterNumbers,
  errors,
}: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <Controller
        name={registerName}
        render={({ field }) => {
          return (
            <InputText
              name={registerName}
              value={field.value || ''}
              minWidth
              onChange={(e) => {
                field.onChange(e);
                if (onChangeVoterNumbers) onChangeVoterNumbers(e.target.value);
              }}
              // type="number"
              controlling
            />
          );
        }}
      />
      {Object.keys(errors).length !== 0 && (
        <div className="py-3">
          <ErrorMessage
            errors={errors}
            name={registerName}
            render={({ message }) => <Text color="danger">{t(message)}</Text>}
          />
        </div>
      )}
    </>
  );
};

export default VoterAreaInputNumber;
