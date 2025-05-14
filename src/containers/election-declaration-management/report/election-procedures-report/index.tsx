import { useTranslation } from 'react-i18next';

import { Header, TableRow, TableData, TableSecondary } from '@pentabd/ui';

import {
  electionProceduresReportTableBreadcrumbs,
  electionProceduresReportTableHeader,
  electionProceduresReportTableColumns,
  electionProceduresReportTableColumnSecondary,
} from './constants';
import { searchStruct } from './searchConstants';
import { SearchComponents } from '@components/application-search/SearchComponents';

function ElectionProceduresReport() {
  const { t } = useTranslation();

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{
          header: t('ELECTION_PROCEDURES_REPORT.ELECTION_PROCEDURES_REPORT'),
        }}
        breadcrumbs={electionProceduresReportTableBreadcrumbs(t)}
      />

      <SearchComponents
        title={t('ELECTION_PROCEDURES_REPORT.ADVANCED_SEARCH')}
        struct={searchStruct}
        totalCol="grid-cols-lg-12"
        colSpan="col-span-3"
      />

      <TableSecondary
        border
        headerExtension={electionProceduresReportTableHeader}
        columnSecondary={electionProceduresReportTableColumnSecondary(t)}
        columns={electionProceduresReportTableColumns(t)}
      >
        <TableRow>
          <TableData>test</TableData>
          <TableData>test</TableData>
          <TableData>test</TableData>
          <TableData>test</TableData>
          <TableData>test</TableData>
          <TableData>test</TableData>
          <TableData>test</TableData>
        </TableRow>
      </TableSecondary>
    </div>
  );
}

export default ElectionProceduresReport;
