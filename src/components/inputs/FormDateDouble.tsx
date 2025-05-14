import classNames from 'classnames';
import { Dayjs } from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ErrorMessage } from '@hookform/error-message';
import { InputDate, Text } from '@pentabd/ui';
import { DateInputProps } from '@pentabd/ui/build/atoms/date-picker/types';

interface Props extends DateInputProps {
  title: string;
  subtitle?: string;
  registerName: {
    type1: string;
    type2: string;
  };
  inputSubtitle?: string;
  colOneClassName?: string;
  colTwoClassName?: string;
  inputLabel1: string;
  inputLabel2: string;
  minimumDate1?: Dayjs;
  minimumDate2?: Dayjs;
  disabled1?: boolean;
  disabled2?: boolean;
}
const FormDateDouble = ({
  title,
  subtitle,
  registerName,
  placeholder,
  inputSubtitle,
  colOneClassName,
  colTwoClassName,
  inputLabel1,
  inputLabel2,
  minimumDate1,
  minimumDate2,
  disabled1,
  disabled2,
  ...props
}: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { t } = useTranslation();
  return (
    <div className="d-grid grid-cols-12 mb-12">
      {/* title */}
      <div className={classNames('col-span-12 col-span-lg-3', colOneClassName)}>
        <Text weight="semibold" size="sm" color="title">
          {t(title)}
        </Text>
        <br />
        {subtitle && (
          <Text weight="medium" size="xs" color="subtitle2">
            {t(subtitle)}
          </Text>
        )}
      </div>

      {/* double date fields */}
      <div className="d-flex justify-content-between col-span-12 col-span-lg-6 gap-6">
        {/* 1st date */}
        <div className={classNames('flex-fill', colTwoClassName)}>
          <Controller
            control={control}
            name={registerName.type1}
            render={({ field }) => (
              <InputDate
                placeholder={placeholder && t(placeholder)}
                defaultValue={field.value}
                onSelectDate={(date) => field.onChange(date)}
                disabled={disabled1}
                title={t(inputLabel1)}
                minimumDate={minimumDate1}
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
              name={registerName.type1}
              render={({ message }) => <Text color="danger">{t(message)}</Text>}
            />
          </div>
        </div>

        {/* 2nd date */}
        <div className={classNames('flex-fill', colTwoClassName)}>
          <Controller
            control={control}
            name={registerName.type2}
            render={({ field }) => (
              <InputDate
                placeholder={placeholder && t(placeholder)}
                defaultValue={field.value}
                onSelectDate={(date) => field.onChange(date)}
                disabled={disabled2}
                title={t(inputLabel2)}
                minimumDate={minimumDate2}
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
              name={registerName.type2}
              render={({ message }) => <Text color="danger">{t(message)}</Text>}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormDateDouble;
