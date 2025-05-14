import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '@pentabd/ui';

import { renderComponents } from './constants';
import ElectionExpenseFirstPart from './firstPart';
import { ElectionExpenseSecondPart } from './secondPart';

const ElectionExpenses = () => {
  const { t } = useTranslation();
  const { electionTypeId } = useParams();

  return (
    <div className="py-10">
      <Header
        headerText={{
          header: t(
            'CANDIDATE_CONFIRMATION.ELECTION_EXPENSES_TABLE_SECTION_HEADER',
          ),
        }}
        noBorder
        size="sm"
      />

      <ElectionExpenseFirstPart electionTypeId={electionTypeId} />
      {electionTypeId && renderComponents(electionTypeId) ? (
        <ElectionExpenseSecondPart />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ElectionExpenses;
