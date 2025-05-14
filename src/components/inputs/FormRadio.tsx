import { ErrorMessage } from '@hookform/error-message';
import { RadioGroup, Text } from '@pentabd/ui';
import { RadioProps } from '@pentabd/ui/build/atoms/radio/Radio';
import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface OptionType {
  id: string;
  label: string;
  value: string | number;
}

interface Props extends RadioProps {
  title: string;
  subtitle?: string;
  options: OptionType[];
  disabled?: boolean;
  colOneClassName?: string;
  colTwoClassName?: string;
  required?: boolean;
}
const FormRadio = ({
  title,
  subtitle,
  options,
  colOneClassName,
  colTwoClassName,
  name,
  required,
  ...props
}: Props) => {
  const { t } = useTranslation();

  const {
    formState: { errors },
    register,
  } = useFormContext();
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
        <RadioGroup {...register(name)} options={options} {...props} />
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
export default FormRadio;
