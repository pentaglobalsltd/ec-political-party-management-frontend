import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ErrorMessage } from '@hookform/error-message';
import classNames from 'classnames';

import { Text } from '@pentabd/ui';

interface Props {
  title: string;
  subtitle?: string;
  registerName: string;
  disabled?: boolean;
  colOneClassName?: string;
  colTwoClassName?: string;
}

const FormCheckbox = ({
  title,
  subtitle,
  registerName,
  colOneClassName,
  colTwoClassName,
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
          {t(title)}
        </Text>
        <br />
        {subtitle && (
          <Text weight="medium" size="xs" color="subtitle2">
            {t(subtitle)}
          </Text>
        )}
      </div>
      <div className={classNames('col-span-12 col-span-lg-6', colTwoClassName)}>
        <input type="checkbox" id={registerName} {...register(registerName)} />
        {Object.keys(errors).length !== 0 && (
          <div className="py-3">
            <ErrorMessage
              errors={errors}
              name={registerName}
              render={({ message }) => <Text color="danger">{message}</Text>}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default FormCheckbox;
