import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header, Table, Text } from '@pentabd/ui';

import {
  tableCCols,
  tableClassACols,
  tableClassBCols,
  tableClassCCols,
} from './constants';
import { useAssetIncomeExpenditure } from '@hooks/candidate-info-management/controller-list/candidate-confirmation/useAssetIncomeExpenditure';

const AssetIncomeDetails = () => {
  const { t } = useTranslation();
  const { electionSettingsId, candidateElectionDetailsId } = useParams();

  const { electionExpense } = useAssetIncomeExpenditure({
    electionSettingsId,
    candidateElectionDetailsId,
  });

  return (
    <div className="container-95">
      <Header
        headerText={{
          header: t(
            'CANDIDATE_CONFIRMATION.ASSET_INCOME_DETAILS_TABLE_SECTION_HEADER',
          ),
        }}
        noBorder
        size="sm"
      />

      {/* table A - class A - গৃহ সম্পত্তি ব্যাতিত অন্যান্য স্থাবর সম্পত্তি */}
      <div className="py-10 border-top">
        <Text
          size="sm"
          weight="semibold"
          color="title"
          className="pt-5 pb-10"
          component="p"
        >
          {t('CANDIDATE_CONFIRMATION.ASSET_INCOME_DETAILS_TABLE_HEADER_A')}
        </Text>

        <Text size="xs" weight="semibold" color="title" className="py-10">
          {t(
            'CANDIDATE_CONFIRMATION.ASSET_INCOME_DETAILS_TABLE_HEADER_A_CLASS_A',
          )}
        </Text>

        <Table
          columns={tableClassACols(t)}
          rows={electionExpense?.assets?.immovableTableRows || []}
        />
      </div>

      {/* table A - class B - গৃহ সম্পত্তি*/}
      <div className="py-10 border-bottom">
        <Text size="xs" weight="semibold" color="title" className="py-10">
          {t(
            'CANDIDATE_CONFIRMATION.ASSET_INCOME_DETAILS_TABLE_HEADER_A_CLASS_B',
          )}
        </Text>

        <Table
          columns={tableClassBCols(t)}
          rows={electionExpense?.assets?.homeTableRows || []}
        />
      </div>

      {/* table A - class C - অন্যান্য সম্পদ*/}
      <div className="py-10 border-bottom">
        <Text size="xs" weight="semibold" color="title" className="py-10">
          {t(
            'CANDIDATE_CONFIRMATION.ASSET_INCOME_DETAILS_TABLE_HEADER_A_CLASS_C',
          )}
        </Text>

        <Table
          columns={tableClassCCols(t)}
          rows={electionExpense?.assets?.othersTableRows || []}
        />
      </div>

      {/* table C - বাৎসরিক আয় ও ব্যয়*/}
      <div className="py-10 border-bottom">
        <Text size="sm" weight="semibold" color="title" className="py-10">
          {t('CANDIDATE_CONFIRMATION.ASSET_INCOME_DETAILS_TABLE_HEADER_C')}
        </Text>

        <Table
          columns={tableCCols(t)}
          rows={electionExpense?.yearlyIncomeExpenditure || []}
        />
      </div>
    </div>
  );
};

export default AssetIncomeDetails;
