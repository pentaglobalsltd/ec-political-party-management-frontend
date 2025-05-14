import { useEffect } from 'react';
import classNames from 'classnames';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ErrorMessage } from '@hookform/error-message';
import { Select, Text } from '@pentabd/ui';
import {
  SelectProps,
  SelectionType,
} from '@pentabd/ui/build/atoms/select/types';

interface OptionType {
  label: string;
  value: string | number;
  customComponent?: JSX.Element | JSX.Element[];
}

interface Props extends SelectProps {
  title: string;
  subtitle?: string;
  options: OptionType[];
  disabled?: boolean;
  colOneClassName?: string;
  colTwoClassName?: string;
  isMultiValue?: boolean;
  required?: boolean;
  clearValue?: boolean;
  resetData?: (data: SelectionType | null) => void;
  clearOptions?: boolean;
}

const FormSelect = ({
  title,
  subtitle,
  options,
  name,
  colOneClassName,
  colTwoClassName,
  isMultiValue = false,
  required,
  clearValue,
  resetData,
  clearOptions,
  defaultValues,
  placeholder,
  ...props
}: Props) => {
  const { t } = useTranslation();
  const {
    formState: { errors },
    control,
    setValue,
  } = useFormContext();

  useEffect(() => {
    if (clearValue) setValue(name, null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearValue, name]);

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
          name={name}
          render={({ field }) => {
            return (
              <Select
                name={name}
                onSelectItem={(data: SelectionType) => {
                  field.onChange(data);
                  resetData && resetData(data);
                }}
                {...(!props.isMulti
                  ? {
                      defaultValue: isMultiValue
                        ? field?.value?.[0]
                        : (field.value as string),
                    }
                  : {
                      defaultValues: defaultValues || field.value,
                      numberOfSelection: props.numberOfSelection
                        ? props.numberOfSelection
                        : 0,
                        
                    })}
                options={clearOptions ? [] : options}
                placeholder={t(
                  placeholder ? placeholder : 'PLACEHOLDER.SELECT',
                )}
                {...props}
              />
            );
          }}
        />

        {Object.keys(errors).length !== 0 && (
          <div className="py-3">
            <ErrorMessage
              errors={errors}
              name={name}
              render={({ message }) => <Text color="danger">{t(message)}</Text>}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FormSelect;
