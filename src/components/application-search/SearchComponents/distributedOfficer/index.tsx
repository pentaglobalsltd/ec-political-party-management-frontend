import { useTranslation } from 'react-i18next';
import { IconChevronDown } from '@pentabd/icons';

import Select from '@components/inputs/Select';

import { APPLICATION_SEARCH } from '..';
import { distributedOfficerOptions } from '@components/application-search/constants';

export const DistributedOfficerSearch = () => {
  const { t } = useTranslation();

  return (
    <Select
      title="CENTER_OFFICER_MANAGEMENT_SEARCH.DISTRIBUTED_OFFICER"
      name={APPLICATION_SEARCH.DISTRIBUTED_OFFICER}
      placeholder={t('PLACEHOLDER.SELECT')}
      options={distributedOfficerOptions}
      suffix={<IconChevronDown size="20" fill="subtitle2" />}
    />
  );
};
