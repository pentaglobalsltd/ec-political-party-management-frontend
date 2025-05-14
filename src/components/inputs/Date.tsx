import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ErrorMessage } from '@hookform/error-message';
import { InputDate, Text } from '@pentabd/ui';
import { DateInputProps } from '@pentabd/ui/build/atoms/date-picker/types';

interface Props extends DateInputProps {
  title: string;
  subtitle?: string;
  registerName: string;
  disabled?: boolean;
  required?: boolean;
}
const Date = ({
  title,
  subtitle,
  registerName,
  placeholder,
  name,
  required,
  ...props
}: Props) => {
  const { t } = useTranslation();

  const {
    formState: { errors },
    control,
  } = useFormContext();

  return (
    <>
      {title ? (
        <div className="pb-4">
          <Text color="title" weight="semibold" size="sm">
            {t(title)}
            {required ? <span className="text-danger">*</span> : null}
          </Text>
        </div>
      ) : null}
      <Controller
        control={control}
        name={registerName}
        render={({ field }) => (
          <InputDate
            name={registerName}
            placeholder={placeholder && t(placeholder)}
            value={field.value}
            onSelectDate={(date) => field.onChange(date)}
            subtitle={subtitle && t(subtitle)}
            {...props}
          />
        )}
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
export default Date;
