import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Table, Text } from '@pentabd/ui';

import {
  TableACols,
  TableBCols,
  TableCCols,
  TableDCols,
  TableECols,
  TableFCols,
  renderComponents,
} from './constants';
import { useElectionExpenseFunding } from '@hooks/candidate-info-management/controller-list/candidate-confirmation/useElectionExpenseFunding';

const ElectionExpenseFirstPart = ({
  electionTypeId,
}: {
  electionTypeId?: string | number;
}) => {
  const { t } = useTranslation();
  const { electionSettingsId, candidateElectionDetailsId } = useParams();

  const { electionExpense } = useElectionExpenseFunding({
    electionSettingsId,
    candidateElectionDetailsId,
  });

  return (
    <div>
      {electionTypeId && renderComponents(electionTypeId) ? (
        <div className="py-10 border-bottom">
          <Text size="lg" weight="semibold" color="title">
            {t('CANDIDATE_CONFIRMATION.PROGRESS_STEPS_FIRST_PART')}
          </Text>
        </div>
      ) : (
        <></>
      )}
      {/* table A - নিজ আয় হইতে প্রাপ্ত সম্ভাব্য অর্থ - selfFundings*/}
      <div className="py-10 border-top border-bottom">
        <Text size="sm" weight="semibold" color="title" className="py-10">
          {t('CANDIDATE_CONFIRMATION.ELECTION_EXPENSES_TABLE_HEADER_A')}
        </Text>

        <Table
          columns={TableACols(t)}
          rows={electionExpense?.selfFundingTableRows || []}
        />
      </div>
      {/* table B - আত্মীয়-স্বজন হইতে ধার বা কর্জ বাবদ প্রাপ্ত সম্ভাব্য অর্থ - relativeFundings (LOAN) */}
      <div className="py-10 border-bottom">
        <Text size="sm" weight="semibold" color="title" className="py-10">
          {t('CANDIDATE_CONFIRMATION.ELECTION_EXPENSES_TABLE_HEADER_B')}
        </Text>

        <Table
          columns={TableBCols(t)}
          rows={electionExpense?.relativeLoanTableRows || []}
        />
      </div>
      {/* table C - আত্মীয়-স্বজনের নিকট হইতে স্বেচ্ছাপ্রণোদিত প্রদত্ত দান হিসাবে প্রাপ্ত সম্ভাব্য অর্থ - relativeFundings (DONATION) */}
      <div className="py-10 border-bottom">
        <Text size="sm" weight="semibold" color="title" className="py-10">
          {t('CANDIDATE_CONFIRMATION.ELECTION_EXPENSES_TABLE_HEADER_C')}
        </Text>

        <Table
          columns={TableCCols(t)}
          rows={electionExpense?.relativeDonationTableRows || []}
        />
      </div>
      {/* table D - আত্মীয়-স্বজন ব্যতীত অন্য কোন ব্যক্তির নিকট হইতে ধার বা কর্জ বাবদ প্রাপ্ত সম্ভাব্য অর্থ - otherFundings (LOAN) */}
      <div className="py-10 border-bottom">
        <Text size="sm" weight="semibold" color="title" className="py-10">
          {t('CANDIDATE_CONFIRMATION.ELECTION_EXPENSES_TABLE_HEADER_D')}
        </Text>

        <Table
          columns={TableDCols(t)}
          rows={electionExpense?.otherLoanTableRows || []}
        />
      </div>
      {/* table E - আত্মীয়-স্বজন ব্যতীত অন্য কোন ব্যাক্তির নিকট হইতে স্বেচ্ছাপ্রণোদিত প্রদত্ত দান হিসাবে প্রাপ্ত সম্ভাব্য অর্থ - otherFundings (DONATION) */}
      <div className="py-10 border-bottom">
        <Text size="sm" weight="semibold" color="title" className="py-10">
          {t('CANDIDATE_CONFIRMATION.ELECTION_EXPENSES_TABLE_HEADER_E')}
        </Text>

        <Table
          columns={TableECols(t)}
          rows={electionExpense?.otherDonationTableRows || []}
        />
      </div>
      {/* table F -  ক,খ,গ,ঘ এবং ঙ অংশে উল্লিখিত উৎস ব্যাতিত অন্য কোন উৎস হইতে প্রাপ্ত সম্ভাব্য অর্থ - otherFundings (LOAN, OTHER) */}
      <div className="py-10">
        <Text size="sm" weight="semibold" color="title" className="py-10">
          {t('CANDIDATE_CONFIRMATION.ELECTION_EXPENSES_TABLE_HEADER_F')}
        </Text>

        <Table
          columns={TableFCols(t)}
          rows={electionExpense?.otherFundingTableRows || []}
        />
      </div>
    </div>
  );
};

export default ElectionExpenseFirstPart;
