import { TableData, TableRow } from '@pentabd/ui';
import { useTranslation } from 'react-i18next';

const tInstitutionReport = 'UPDATE_VOTE_CENTER.INSTITUTION_REPORT';

interface PropsInstitutionReportTableRow {
  leftDataKey: string;
  rightDataKey: string;
  tableData: {
    [key: string]: string;
  };
}

const InstitutionReportTableRow = ({
  leftDataKey,
  rightDataKey,
  tableData,
}: PropsInstitutionReportTableRow) => {
  const { t } = useTranslation();

  return (
    <TableRow>
      {/* leftDataKey */}
      <TableData>{t(`${tInstitutionReport}.${leftDataKey}`)}</TableData>
      <TableData>
        : {tableData[t(`${tInstitutionReport}.${leftDataKey}`)]}
      </TableData>

      {/* rightDataKey */}
      <TableData>{t(`${tInstitutionReport}.${rightDataKey}`)}</TableData>
      <TableData>
        : {tableData[t(`${tInstitutionReport}.${rightDataKey}`)]}
      </TableData>
    </TableRow>
  );
};

export default InstitutionReportTableRow;
