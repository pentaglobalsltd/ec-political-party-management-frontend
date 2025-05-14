import { logTypeOptions } from '@components/application-search/constants';
import Select from '@components/inputs/Select';
import { IconChevronDown } from '@pentabd/icons';
import { APPLICATION_SEARCH } from '..';
import { useTranslation } from 'react-i18next';

export const LogTypeSearch = () => {
  const { t } = useTranslation();
  return (
    <Select
      title="SEARCH.LOG_TYPE"
      name={APPLICATION_SEARCH.LOG_TYPE}
      placeholder={t('PLACEHOLDER.SELECT')}
      options={logTypeOptions(t)}
      suffix={<IconChevronDown size="20" fill="subtitle2" />}
    />
  );
};
