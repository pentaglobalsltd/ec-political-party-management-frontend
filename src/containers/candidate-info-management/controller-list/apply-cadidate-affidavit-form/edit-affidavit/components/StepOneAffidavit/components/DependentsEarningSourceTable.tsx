import { Text, Table } from '@pentabd/ui';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';

import { dependentsEarningSourceTableColumns } from '../formOptions';
import { IncomeSourceType } from '@type/candidate-info-management/operator-view/affidavit-form/affidavit-step-one';
import { useParams } from 'react-router-dom';
import { electionNameMapping } from '@helpers/election-type';

function DependentsEarningSourceTable({ rowsArrayData }: any) {
  const { t } = useTranslation();
  const { register } = useFormContext();

  const { electionTypeId } = useParams();

  const electionTypeKey = electionNameMapping(Number(electionTypeId));

  return (
    <div>
      <Text weight="medium" size="sm" color="title">
        {t('AFFIDAVIT_STEP_ONE.DEPENDENTS_EARNING_SOURCE')}
      </Text>
      <div className="pt-8">
        <Table
          columns={dependentsEarningSourceTableColumns(
            t,
            register,
            electionTypeKey,
          )}
          rows={
            rowsArrayData?.incomeSources?.map(
              (item: IncomeSourceType, idx: string | number) => ({
                id: idx,
                ...item,
              }),
            ) || []
          }
        />
      </div>
    </div>
  );
}

export default DependentsEarningSourceTable;
