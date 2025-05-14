import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { IconCalendar } from '@pentabd/icons';
import { useTranslation } from 'react-i18next';
import { Controller, useFormContext } from 'react-hook-form';
import { InputDate } from '@pentabd/ui';
import { useEffect } from 'react';

export const DateFromSearch = ({
  defaultFromDate,
}: {
  defaultFromDate?: string;
}) => {
  const { t } = useTranslation();
  const methods = useFormContext();
  const { control, setValue } = methods;

  useEffect(() => {
    if (defaultFromDate) {
      setValue(APPLICATION_SEARCH.DATE_FROM, defaultFromDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultFromDate]);

  return (
    <div>
      <Controller
        control={control}
        name={APPLICATION_SEARCH.DATE_FROM}
        render={({ field }) => (
          <InputDate
            name={APPLICATION_SEARCH.DATE_FROM}
            value={field.value}
            title={t('SEARCH.DATE_FROM')}
            onSelectDate={(date) => field.onChange(date)}
            defaultValue={defaultFromDate}
            prefix={<IconCalendar size="20" fill="subtitle2" />}
          />
        )}
      />
    </div>
  );
};
