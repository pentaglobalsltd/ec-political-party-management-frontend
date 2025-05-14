import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { IconChevronDown } from '@pentabd/icons';
import Select from '@components/inputs/Select';
import { ResultTypes } from '@components/application-search/constants';
import { useTranslation } from 'react-i18next';

export const ResultTypeSearch = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Select
        title="SEARCH.RESULT_TYPE"
        name={APPLICATION_SEARCH.RESULT_TYPE}
        options={ResultTypes(t)}
        suffix={<IconChevronDown size="20" fill="subtitle2" />}
        isSearchable
      />
    </div>
  );
};
