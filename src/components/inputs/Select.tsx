import { useEffect } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { InputSelect, Text } from '@pentabd/ui';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  OptionType,
  SelectProps,
  SelectionType,
} from '@pentabd/ui/build/atoms/select/types';

interface Props extends SelectProps {
  title?: string;
  subtitle?: string;
  options: OptionType[];
  disabled?: boolean;
  placeholder?: string;
  clearValue?: boolean;
  resetData?: (data: SelectionType | null) => void;
  clearOptions?: boolean;
  defaultValue?: string | number;
  value?: string | number;
  titleElement?: string | React.ReactNode;
  isMultiValue?: boolean;
}
const Select = ({
  title,
  subtitle,
  options,
  name,
  clearValue,
  resetData,
  clearOptions,
  defaultValue,
  value,
  titleElement,
  isMultiValue,
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
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <InputSelect
              {...(title && {
                title: titleElement
                  ? (titleElement as React.ReactNode | string)
                  : t(title),
              })}
              {...(subtitle && { subtitle: t(subtitle) })}
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
              name={name}
              placeholder={t(placeholder ? placeholder : 'PLACEHOLDER.SELECT')}
              onSelectItem={(data: SelectionType) => {
                field.onChange(data);
                if (resetData) resetData(data);
              }}
              defaultValue={defaultValue || (field.value as string)}
              value={value}
              options={clearOptions ? [] : options}
              {...props}
              getTranslation={t}
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
    </>
  );
};
export default Select;
