import { Button, Text } from '@pentabd/ui';
import { FormProvider } from 'react-hook-form';
import { IconChevronDown } from '@pentabd/icons';
import { useTranslation } from 'react-i18next';

import Select from '@components/inputs/Select';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
import {
  APPLICATION_SEARCH,
  SearchComponents,
} from '@components/application-search/SearchComponents';
import { searchStructPollingCenter } from '../searchConstantPollingCenter';

function CenterSelect({
  onSubmitCenterSearch,
  onSubmitCenterButtonSearch,
  pollingCenters,
  methods,
  handleSubmit,
  watch,
}: {
  onSubmitCenterSearch: any;
  onSubmitCenterButtonSearch: any;
  pollingCenters: any;
  methods: any;
  handleSubmit: any;
  watch: any;
}) {
  const { t } = useTranslation();

  return (
    <div>
      <div className="p-10">
        <Text size="md" weight="semibold">
          {t('CENTER_BASED_OFFICER_ALLOCATION.SELECT_CENTER')}
        </Text>
      </div>
      <SearchComponents
        totalCol="grid-cols-lg-12 grid-cols-1"
        colSpan="col-span-lg-3 col-span-1"
        struct={searchStructPollingCenter}
        onSubmitHandler={onSubmitCenterSearch}
        requiredField={[
          SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
          SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
          SEARCH_FIELD_REQUIRED.ZILLA_ID,
        ]}
      />

      <FormProvider {...methods}>
        <form
          className="p-10 d-grid grid-cols-1 grid-cols-lg-12 align-items-end gap-5"
          onSubmit={handleSubmit(onSubmitCenterButtonSearch)}
        >
          <div className="col-span-3">
            <Select
              title="CENTER_OFFICER_MANAGEMENT_SEARCH.POLLING_CENTER"
              name={APPLICATION_SEARCH.POLLING_CENTER}
              options={pollingCenters}
              suffix={<IconChevronDown size="20" fill="subtitle2" />}
              isSearchable
            />
          </div>
          <div className="col-span-1">
            <Button
              type="primary"
              htmlType="submit"
              className="w-100"
              size="lg"
              disabled={!watch(APPLICATION_SEARCH.POLLING_CENTER)}
            >
              <Text weight="semibold">{t('SEARCH.SEARCH')}</Text>
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default CenterSelect;
