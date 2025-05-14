import { useTranslation } from 'react-i18next';

import { Dropdown, Header, Table } from '@pentabd/ui';

import {
  numericalReporting1TableBreadcrumbs,
  numericalReporting1TableHeader,
  numericalReporting1TableRows,
  numericalReporting1TableColumns,
  options,
} from './constants';
import { allSelectedData, searchStruct } from './searchConstants';
import { SearchComponents } from '@components/application-search/SearchComponents';

function NumericalReporting1() {
  const { t } = useTranslation();

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{
          header: t('NUMERICAL_REPORTING_1.PARTIES_FILLING_NOMINATION'),
        }}
        breadcrumbs={numericalReporting1TableBreadcrumbs(t)}
      />
      <div className="d-flex align-items-center gap-6 pb-8">
        <Dropdown
          buttonLabelName={t('NUMERICAL_REPORTING_1.DATA_NO_SUBMITTED')}
          buttonType="button"
          listItem={options(t)}
        />
        <Dropdown
          buttonLabelName={t('NUMERICAL_REPORTING_1.SAVE_BY_GROUP')}
          buttonType="button"
          listItem={options(t)}
        />
        <Dropdown
          buttonLabelName={t('NUMERICAL_REPORTING_1.SAVE_BY_SELECTION')}
          buttonType="button"
          listItem={options(t)}
        />
        <Dropdown
          buttonLabelName={t('NUMERICAL_REPORTING_1.SAVE_SELECTION_GROUP_WISE')}
          buttonType="button"
          listItem={options(t)}
        />
      </div>

      <div className="border-top py-8">
        <SearchComponents
          struct={searchStruct}
          selectAny
          allSelectedData={allSelectedData}
          onSubmitHandler={() => {}}
        />
      </div>

      <Table
        headerExtension={numericalReporting1TableHeader}
        rows={numericalReporting1TableRows}
        columns={numericalReporting1TableColumns(t)}
        pagination={{ language: 'bn', totalPage: 1 }}
      />
    </div>
  );
}

export default NumericalReporting1;
