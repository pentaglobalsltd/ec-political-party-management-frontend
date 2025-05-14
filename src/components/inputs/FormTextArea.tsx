import { useState, ChangeEvent } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ErrorMessage } from '@hookform/error-message';
import classNames from 'classnames';

import { Text, TextArea } from '@pentabd/ui';
import { getDigitBanglaFromEnglish } from '@utils';

interface InputProps {
  title?: string;
  subtitle?: string;
  disabled?: boolean;
  registerName: string;
  value?: string;
  placeholder?: string;
  defaultValue?: string;
  colOneClassName?: string;
  colTwoClassName?: string;
  maxCharacters?: number;
  required?: boolean;
  isEmbeddedMessage?: boolean;
}
const FormTextArea = ({
  title,
  subtitle,
  registerName,
  colOneClassName,
  colTwoClassName,
  disabled,
  placeholder,
  maxCharacters = 255,
  required,
  isEmbeddedMessage,
}: InputProps) => {
  const [remainingChars, setRemainingChars] = useState<number>(maxCharacters);
  const { t } = useTranslation();

  const {
    formState: { errors },
  } = useFormContext();

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = event.target.value;
    setRemainingChars(maxCharacters - inputText.length);
  };

  return (
    <div className="d-grid grid-cols-12 mb-12">
      <div className={classNames('col-span-12 col-span-lg-3', colOneClassName)}>
        {title && (
          <Text weight="semibold" size="sm" color="title">
            {t(title)}{' '}
            {required ? <span className="text-danger">*</span> : null}
          </Text>
        )}
        <br />
        {subtitle && (
          <Text weight="medium" size="xs" color="subtitle2">
            {t(subtitle)}
          </Text>
        )}
      </div>

      {/* text area */}
      <div className={classNames('col-span-12 col-span-lg-6', colTwoClassName)}>
        <Controller
          name={registerName}
          render={({ field }) => {
            return (
              <TextArea
                name={registerName}
                className={classNames('cursor-text', {
                  'opacity-50': disabled,
                  'embedded-message': isEmbeddedMessage,
                })}
                placeholder={t(
                  placeholder ? placeholder : 'PLACEHOLDER.SELECT',
                )}
                controlling
                maxLength={maxCharacters}
                value={field.value}
                onChange={(data) => {
                  field.onChange(data);
                  handleTextareaChange(data);
                }}
                disabled={disabled}
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

        {/* chars left */}
        <div className="py-3">
          <Text size="sm" color="subtitle2">
            {`${getDigitBanglaFromEnglish(remainingChars)} অক্ষর বাকি`}
          </Text>
        </div>
      </div>
    </div>
  );
};
export default FormTextArea;
