import { useTranslation } from 'react-i18next';

import { Header, Table } from '@pentabd/ui';

import {
  systemLogTableBreadcrumbs,
  systemLogTableHeader,
  systemLogTableRows,
  systemLogTableColumns,
  searchStruct,
} from './constants';
import { SearchComponents } from '@components/application-search/SearchComponents';

function SystemLog() {
  const { t } = useTranslation();

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{ header: t('SYSTEM_LOG.SYSTEM_LOG') }}
        breadcrumbs={systemLogTableBreadcrumbs(t)}
      />

      <SearchComponents totalCol="grid-cols-lg-10" struct={searchStruct} />

      <Table
        headerExtension={systemLogTableHeader}
        rows={systemLogTableRows}
        columns={systemLogTableColumns(t)}
        pagination={{ language: 'bn', totalPage: 1 }}
      />
    </div>
  );
}

export default SystemLog;
