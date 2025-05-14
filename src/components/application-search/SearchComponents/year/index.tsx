import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { IconCalendar } from '@pentabd/icons';
import { useTranslation } from 'react-i18next';
import { Controller, useFormContext } from 'react-hook-form';
import { InputDate } from '@pentabd/ui';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { useSearchParams } from 'react-router-dom';
import { getParams } from '@utils';

export const YearSearch = ({ defaultYear }: { defaultYear?: string }) => {
  const { t } = useTranslation();
  const methods = useFormContext();
  const { control, setValue } = methods;
  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  useEffect(() => {
    setValue(APPLICATION_SEARCH.YEAR, defaultYear);
  }, [defaultYear]);

  return (
    <div>
      <Controller
        control={control}
        name={APPLICATION_SEARCH.YEAR}
        render={({ field }) => (
          <InputDate
            name={APPLICATION_SEARCH.YEAR}
            value={field.value}
            defaultValue={defaultYear?.toString()}
            title={t('SEARCH.YEAR')}
            onSelectDate={(date) => field.onChange(date)}
            prefix={<IconCalendar size="20" fill="subtitle2" />}
            isYearPicker
          />
        )}
      />
    </div>
  );
};
