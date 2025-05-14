import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TableSecondary, Text } from '@pentabd/ui';
import InstitutionReportTableRow from './InstitutionReportTableRow';
import { getTableDataInstitutionReport } from '../../../../constants';
import { instituteReportList } from './constant';
import { NewVoteCenterContext } from '../../context/NewVoteCenterContext';

const tInstitutionReport = 'UPDATE_VOTE_CENTER.INSTITUTION_REPORT';

const InstitutionReport = () => {
  const { t } = useTranslation();
  const { contextData } = useContext(NewVoteCenterContext)!;

  const [tableData, setTableData] = useState({});

  useEffect(() => {
    setTableData(
      getTableDataInstitutionReport(
        t,
        tInstitutionReport,
        contextData?.potentialPollingInstitute,
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextData?.potentialPollingInstitute]);

  return (
    <div className="my-10">
      <Text className="text-title" size="xl" weight="semibold">
        {contextData?.potentialPollingInstitute?.instituteName}
      </Text>

      <div className="my-10">
        <TableSecondary columns={[]} border>
          {instituteReportList?.map((item) => (
            <InstitutionReportTableRow
              key={item.id}
              leftDataKey={item.leftDataKey}
              rightDataKey={item.rightDataKey}
              tableData={tableData}
            />
          ))}
        </TableSecondary>
      </div>
    </div>
  );
};

export default InstitutionReport;
