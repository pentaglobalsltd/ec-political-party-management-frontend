import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ErrorMessage } from '@hookform/error-message';
import { InputText, Text } from '@pentabd/ui';

interface InputProps {
  title?: string;
  subtitle?: string;
  disabled?: boolean;
  registerName: string;
  placeholder?: string;
  defaultValue?: string;
  colOneClassName?: string;
  colTwoClassName?: string;
  select?: boolean;
  selectOption?: { label: string; value: string }[];
  onSelectionChange?: (e: any) => void;
  selectValue?: string;
  readOnly?: boolean;
  onchange?: (data: any) => void;
  prefix?: string | JSX.Element | JSX.Element[];
  clearValue?: boolean;
  type?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  required?: boolean;
}
const Input = ({
  title,
  subtitle,
  registerName,
  disabled,
  placeholder,
  defaultValue,
  select,
  selectOption,
  selectValue,
  onSelectionChange,
  readOnly,
  onchange,
  prefix,
  clearValue,
  type,
  required,
  size,
}: InputProps) => {
  const {
    formState: { errors },
    setValue,
    control,
  } = useFormContext();
  const { t } = useTranslation();
  useEffect(() => {
    if (clearValue) setValue(registerName, '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearValue, registerName]);

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
        name={registerName}
        control={control}
        render={({ field }) => {
          return (
            <InputText
              {...(subtitle && { subtitle: t(subtitle) })}
              name={registerName}
              placeholder={placeholder && t(placeholder)}
              disabled={disabled}
              value={field.value || ''}
              onChange={(data) => {
                field.onChange(data);
                if (onchange) onchange(data);
              }}
              defaultValue={defaultValue}
              select={select}
              selectOption={selectOption}
              selectValue={selectValue}
              onSelectionChange={onSelectionChange}
              readOnly={readOnly}
              prefix={prefix}
              controlling
              type={type}
              size={size}
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
export default Input;
