import { Text, Select } from '@pentabd/ui';
import { useTranslation } from 'react-i18next';
import { Controller, useFormContext } from 'react-hook-form';
import { SelectOptionArray } from '@type/selection-option-type';
import { SelectionType } from '@pentabd/ui/build/atoms/select/types';

interface Props {
  title: string;
  registerName: string;
  options: SelectOptionArray[];
  className?: string;
  disabled?: boolean;
}

const MultiSelect = ({
  title,
  registerName,
  options,
  className,
  disabled = false,
}: Props) => {
  const { t } = useTranslation();

  const { control } = useFormContext();

  return (
    <div className={`d-flex gap-4 flex-column ${className}`}>
      <Text weight="semibold" size="sm" color="title">
        {t(title)}
      </Text>

      <Controller
        control={control}
        name={registerName}
        render={({ field }) => {
          return (
            <Select
              name={registerName}
              onSelectItem={(data: SelectionType) => {
                field.onChange(data);
              }}
              options={options}
              isMulti
              placeholder={t('PLACEHOLDER.SELECT')}
              disabled={disabled}
              defaultValues={[
                // Number(searchDefaultValues?.unionOrWardId),
                ...(Array.isArray(field.value)
                  ? field.value
                  : [Number(field.value)]),
              ]}
            />
          );
        }}
      />
    </div>
  );
};

export default MultiSelect;
