import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';
import { InputDate } from '@pentabd/ui';
import { IconCalendar, IconChevronDown } from '@pentabd/icons';
import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import Select from '@components/inputs/Select';
import { ALL_MONTHS } from '@components/application-search/constants';
import { useSearchParams } from 'react-router-dom';
import { getParams } from '@utils';

export const MonthSearch = ({ defaultMonth }: { defaultMonth?: number }) => {
  const { t } = useTranslation();
  const methods = useFormContext();
  const { setValue } = methods;

  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  useEffect(() => {
    setValue(APPLICATION_SEARCH.MONTH, Number(defaultMonth));
  }, [defaultMonth]);

  return (
    <div>
      <Select
        title="SEARCH.MONTH"
        name={APPLICATION_SEARCH.MONTH}
        options={ALL_MONTHS}
        suffix={<IconChevronDown size="20" fill="subtitle2" />}
        isSearchable
      />
    </div>
  );
};
