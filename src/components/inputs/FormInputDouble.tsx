import classNames from 'classnames';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ErrorMessage } from '@hookform/error-message';
import { InputText, Text } from '@pentabd/ui';

interface InputProps {
  title: string;
  subtitle?: string;
  disabled1?: boolean;
  disabled2?: boolean;
  registerName: {
    type1: string;
    type2: string;
  };
  placeholder?: string;
  defaultValue?: string;
  colOneClassName?: string;
  colTwoClassName?: string;
  inputLabel1: string;
  inputLabel2: string;
  required1?: boolean;
  required2?: boolean;
  isEmbeddedMessage?: boolean;
}
const FormInputDouble = ({
  title,
  subtitle,
  registerName,
  disabled1,
  disabled2,
  placeholder,
  defaultValue,
  colOneClassName,
  colTwoClassName,
  inputLabel1,
  inputLabel2,
  required1,
  required2,
  isEmbeddedMessage,
}: InputProps) => {
  const {
    formState: { errors },
  } = useFormContext();
  const { t } = useTranslation();
  return (
    <div className="d-grid grid-cols-12 mb-12">
      {/* label */}
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

      {/* input fields */}
      <div
        className={classNames(
          'd-flex justify-content-between col-span-12 col-span-lg-6 gap-8',
          colTwoClassName,
        )}
      >
        {/* 1  - bangla*/}
        <div className="flex-fill">
          <Controller
            name={registerName.type1}
            render={({ field }) => {
              return (
                <InputText
                  title={required1 ? `${t(inputLabel1)} *` : t(inputLabel1)}
                  placeholder={placeholder && t(placeholder)}
                  className={classNames({
                    'embedded-message': isEmbeddedMessage,
                  })}
                  name={registerName.type1}
                  value={field.value}
                  defaultValue={defaultValue}
                  onChange={(data) => field.onChange(data)}
                  disabled={disabled1}
                  controlling
                />
              );
            }}
          />
          {Object.keys(errors).length !== 0 && (
            <div className="py-3">
              <ErrorMessage
                errors={errors}
                name={registerName.type1}
                render={({ message }) => (
                  <Text color="danger">{t(message)}</Text>
                )}
              />
            </div>
          )}
        </div>

        {/* 2 - english*/}
        <div className="flex-fill">
          <Controller
            name={registerName.type2}
            render={({ field }) => {
              return (
                <InputText
                  title={required2 ? `${t(inputLabel2)} *` : t(inputLabel2)}
                  placeholder={placeholder && t(placeholder)}
                  className={classNames({
                    'embedded-message': isEmbeddedMessage,
                  })}
                  name={registerName.type2}
                  value={field.value}
                  defaultValue={defaultValue}
                  onChange={(data) => field.onChange(data)}
                  disabled={disabled2}
                  controlling
                />
              );
            }}
          />
          {Object.keys(errors).length !== 0 && (
            <div className="py-3">
              <ErrorMessage
                errors={errors}
                name={registerName.type2}
                render={({ message }) => (
                  <Text color="danger">{t(message)}</Text>
                )}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormInputDouble;
