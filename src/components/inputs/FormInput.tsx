import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ErrorMessage } from '@hookform/error-message';
import classNames from 'classnames';
import { InputText, Text } from '@pentabd/ui';

interface InputProps {
  title: string;
  subtitle?: string;
  additionalText?: string;
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
  selectDefaultValue?: string;
  readOnly?: boolean;
  suffix?: string | JSX.Element | JSX.Element[];
  type?: string;
  required?: boolean;
  formattedValue?: any;
  onchange?: (data: any) => void;
}
const FormInput = ({
  title,
  subtitle,
  additionalText,
  registerName,
  disabled,
  placeholder,
  defaultValue,
  colOneClassName,
  colTwoClassName,
  select,
  selectOption,
  selectValue,
  selectDefaultValue,
  onSelectionChange,
  readOnly,
  suffix,
  type,
  required,
  formattedValue,
  onchange,
}: InputProps) => {
  const {
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
          name={registerName}
          render={({ field }) => {
            return (
              <div className="d-flex flex-column gap-8">
                <InputText
                  name={registerName}
                  placeholder={
                    placeholder ? t(placeholder) : t('PLACEHOLDER.ENTER')
                  }
                  disabled={disabled}
                  value={field.value || ''}
                  onChange={(data) => {
                    onchange && onchange(data);
                    if (formattedValue) {
                      if (formattedValue.test(data.target.value)) {
                        field.onChange(data);
                      } else {
                        field.onChange(field.value || '');
                      }
                    } else field.onChange(data);
                  }}
                  defaultValue={defaultValue}
                  select={select}
                  selectOption={selectOption}
                  selectDefaultValue={selectDefaultValue}
                  onSelectionChange={onSelectionChange}
                  selectValue={selectValue}
                  readOnly={readOnly}
                  suffix={suffix}
                  type={type}
                  controlling
                />
                {additionalText && (
                  <div>
                    <Text weight="medium" size="xs" color="subtitle2">
                      {t(additionalText)}
                    </Text>
                  </div>
                )}
              </div>
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
      </div>
    </div>
  );
};
export default FormInput;
