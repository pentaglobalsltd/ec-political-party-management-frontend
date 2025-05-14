import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { InputText } from '@pentabd/ui';

interface InputProps {
  title?: string;
  registerName: string;
  type?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  readonly?: boolean;
  formattedValue?: any;
  placeholder?: string;
  control?: any;
  disabled?: boolean;
  isMinWidth?: boolean;
  defaultValue?: string;
  onchange?: (data: any) => void;
  autoFocus?: boolean;
  textAlign?: string;
  onFocus?: (e: any) => void;
}

const FormChildInput = ({
  title,
  registerName,
  type,
  size,
  readonly,
  formattedValue,
  placeholder,
  control,
  disabled,
  isMinWidth,
  defaultValue,
  onchange,
  autoFocus,
  textAlign = '',
  onFocus,
}: InputProps) => {
  const {
    formState: { errors },
  } = useFormContext();
  const { t } = useTranslation();
  return (
    <Controller
      control={control}
      name={registerName}
      render={({ field }) => {
        return (
          <InputText
            className={textAlign}
            name={registerName}
            title={title}
            type={type}
            size={size}
            readOnly={readonly}
            placeholder={placeholder && t(placeholder)}
            error={errors as any}
            disabled={disabled}
            minWidth={isMinWidth}
            getTranslation={t}
            value={field.value || ''}
            defaultValue={defaultValue}
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
            controlling
            autoFocus={autoFocus}
            onFocus={(e) => onFocus && onFocus(e)}
          />
        );
      }}
    />
  );
};
export default FormChildInput;
