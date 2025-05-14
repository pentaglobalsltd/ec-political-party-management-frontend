import { useTranslation } from 'react-i18next';

import { Header, TableSecondary, TableData, TableRow } from '@pentabd/ui';

import {
  resultsReturnLogTableBreadcrumbs,
  resultsReturnLogTableColumns,
  resultsReturnLogTableHeader,
  resultsReturnLogTableSecondaryColumns,
} from './constants';
import { searchStruct } from './searchConstants';
import { SearchComponents } from '@components/application-search/SearchComponents';

function ResultsReturnLog() {
  const { t } = useTranslation();

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{
          header: t('RESULTS_RETURN_LOG.CENTER_BASED_RETURN_LOG'),
        }}
        breadcrumbs={resultsReturnLogTableBreadcrumbs(t)}
      />

      <SearchComponents
        totalCol="grid-cols-lg-9"
        colSpan="col-span-2"
        struct={searchStruct}
      />

      <TableSecondary
        columnSecondary={resultsReturnLogTableSecondaryColumns(t)}
        columns={resultsReturnLogTableColumns(t)}
        headerExtension={resultsReturnLogTableHeader}
      >
        <TableRow>
          <TableData>ঢাকা</TableData>
          <TableData>ঢাকা-১</TableData>
          <TableData>১০</TableData>
          <TableData>আদাবাড়ি গহের আলি উচ্চ বিদ্যালয়</TableData>
          <TableData>54564</TableData>
          <TableData>45</TableData>
          <TableData>45</TableData>
          <TableData>45</TableData>
          <TableData>45</TableData>
          <TableData>test</TableData>
          <TableData>5454</TableData>
          <TableData>1</TableData>
          <TableData>546</TableData>
          <TableData>aro_31025</TableData>
          <TableData>2023-04-25 17:25:45</TableData>
        </TableRow>
      </TableSecondary>
    </div>
  );
}

export default ResultsReturnLog;
