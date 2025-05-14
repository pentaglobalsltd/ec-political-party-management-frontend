import {
  userTypesCodeDesignation,
  userTypesIncludingAll,
} from '@components/application-search/constants';
import Select from '@components/inputs/Select';
import { IconChevronDown } from '@pentabd/icons';
import { APPLICATION_SEARCH } from '..';
import { useTranslation } from 'react-i18next';

export const DesignationSearch = ({
  userTypeCodesIncludingAll = true,
}: {
  userTypeCodesIncludingAll?: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <Select
      title="CENTER_OFFICER_MANAGEMENT_SEARCH.DESIGNATION"
      name={APPLICATION_SEARCH.USER}
      placeholder={t('PLACEHOLDER.SELECT')}
      options={
        userTypeCodesIncludingAll
          ? userTypesIncludingAll
          : userTypesCodeDesignation
      }
      suffix={<IconChevronDown size="20" fill="subtitle2" />}
    />
  );
};
