import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { IconCalendar } from '@pentabd/icons';
import { useTranslation } from 'react-i18next';
import { Controller, useFormContext } from 'react-hook-form';
import { InputDate } from '@pentabd/ui';
import { useEffect } from 'react';

export const DateToSearch = ({ defaultToDate }: { defaultToDate?: string }) => {
  const { t } = useTranslation();
  const methods = useFormContext();
  const { control, setValue } = methods;

  useEffect(() => {
    if (defaultToDate) {
      setValue(APPLICATION_SEARCH.DATE_TO, defaultToDate);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultToDate]);

  return (
    <div>
      <Controller
        control={control}
        name={APPLICATION_SEARCH.DATE_TO}
        render={({ field }) => (
          <InputDate
            name={APPLICATION_SEARCH.DATE_TO}
            value={field.value}
            title={t('SEARCH.DATE_TO')}
            onSelectDate={(date) => field.onChange(date)}
            defaultValue={defaultToDate}
            prefix={<IconCalendar size="20" fill="subtitle2" />}
          />
        )}
      />
    </div>
  );
};
