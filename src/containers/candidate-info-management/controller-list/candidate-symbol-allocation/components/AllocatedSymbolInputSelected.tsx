import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { InputSelect } from '@pentabd/ui';
import { SelectionType } from '@pentabd/ui/build/atoms/select/types';

import { ALLOCATION_TABLE } from '..';

interface AllocatedSymbolInputSelectedPropType {
  index?: number;
  options: any;
  disabled?: boolean;
  symbolId?: number | string;
}

export default function AllocatedSymbolInputSelected({
  index,
  options,
  disabled,
  symbolId,
}: AllocatedSymbolInputSelectedPropType) {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <Controller
        control={control}
        name={`symbolAllocationValidation.${index}.${ALLOCATION_TABLE.ALLOCATED_SYMBOL}`}
        render={({ field }) => {
          return (
            <InputSelect
              portal
              name={`symbolAllocationValidation.${index}.${ALLOCATION_TABLE.ALLOCATED_SYMBOL}`}
              onSelectItem={(data: SelectionType) => field.onChange(data)}
              error={errors as any}
              defaultValue={symbolId}
              options={options}
              disabled={disabled}
              placeholder={t('PLACEHOLDER.SELECT')}
              minWidth
            />
          );
        }}
      />
    </div>
  );
}
