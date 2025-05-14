import { ErrorMessage } from '@hookform/error-message';
import { IconCalendar } from '@pentabd/icons';
import { InputDate, Text } from '@pentabd/ui';
import { DateInputProps } from '@pentabd/ui/build/atoms/date-picker/types';
import classNames from 'classnames';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Props extends DateInputProps {
  title: string;
  subtitle?: string;
  registerName: string;
  inputSubtitle?: string;
  colOneClassName?: string;
  colTwoClassName?: string;
  required?: boolean;
}
const FormDate = ({
  title,
  subtitle,
  registerName,
  placeholder,
  inputSubtitle,
  colOneClassName,
  colTwoClassName,
  isTimePicker,
  required,
  ...props
}: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { t } = useTranslation();
  return (
    <div className="d-grid grid-cols-12 mb-12">
      <div className={classNames('col-span-12 col-span-lg-3', colOneClassName)}>
        <Text weight="semibold" size="sm" color="title">
          {t(title)} {required ? <span className="text-danger">*</span> : null}
        </Text>
        <br />
        {subtitle && (
          <Text weight="medium" size="xs" color="subtitle2">
            {t(subtitle)}
          </Text>
        )}
      </div>
      <div className={classNames('col-span-12 col-span-lg-6', colTwoClassName)}>
        <Controller
          control={control}
          name={registerName}
          render={({ field }) => (
            <InputDate
              placeholder={placeholder && t(placeholder)}
              defaultValue={field.value}
              onSelectDate={(date) => field.onChange(date)}
              prefix={<IconCalendar size="20" fill="subtitle2" />}
              isTimePicker={isTimePicker}
              {...props}
            />
          )}
        />
        {inputSubtitle && (
          <Text weight="normal" size="xs" color="subtitle1">
            {t(inputSubtitle)}
          </Text>
        )}
        <div className="py-3">
          <ErrorMessage
            errors={errors}
            name={registerName}
            render={({ message }) => <Text color="danger">{t(message)}</Text>}
          />
        </div>
      </div>
    </div>
  );
};
export default FormDate;
