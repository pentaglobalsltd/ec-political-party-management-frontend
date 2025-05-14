import { ErrorMessage } from '@hookform/error-message';
import { Switch, Text } from '@pentabd/ui';
import { SwitchProps } from '@pentabd/ui/build/atoms/switch/Switch';
import classNames from 'classnames';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Props extends SwitchProps {
  title?: string;
  subtitle?: string;
  disabled?: boolean;
  colOneClassName?: string;
  colTwoClassName?: string;
  required?: boolean;
  handler?: (data: any) => void;
}
const FormSwitch = ({
  title,
  subtitle,
  colOneClassName,
  colTwoClassName,
  name,
  required,
  handler,
  ...props
}: Props) => {
  const { t } = useTranslation();

  const {
    formState: { errors },
    control,
  } = useFormContext();
  return (
    <div className="d-grid grid-cols-12 mb-12">
      <div className={classNames('col-span-12 col-span-lg-3', colOneClassName)}>
        {title ? (
          <Text weight="semibold" size="sm" color="title">
            {t(title)}{' '}
            {required ? <span className="text-danger">*</span> : null}
          </Text>
        ) : null}
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
            // if (props.isMulti)
            return (
              <Switch
                name={name}
                onChange={(data) => {
                  field.onChange(data.target.checked);
                  handler && handler(data);
                }}
                {...props}
              />
            );
          }}
        />

        {Object.keys(errors).length !== 0 && (
          <div className="py-3">
            <ErrorMessage
              name={name}
              render={({ message }) => <Text color="danger">{t(message)}</Text>}
              errors={errors}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default FormSwitch;
