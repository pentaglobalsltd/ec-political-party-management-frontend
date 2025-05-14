import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import CompleteTable from '@components/operator-view-home/CompleteTable';
import IncompleteTable from '@components/operator-view-home/IncompleteTable';

import { ROUTES } from '@constants/routes';
import {
  incomeSourceDetailsBreadcrumbs,
  incomeSourceDetailsTableColumns,
} from './constants';
import {
  allSelectedData,
  searchStructAdmin,
  searchStructElectionUser,
} from './searchConstants';

import { getParams } from '@utils';
import { HeaderComponentCMS } from '@containers/candidate-info-management/components/header';
import { CMSOpSearch } from '@containers/candidate-info-management/components/CMSOpSearch';

const IncomeSourceDetails = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const editHandler = (data: any) => {
    const {
      electionSettingsId,
      candidateElectionDetailsId,
      electionTypeId,
      candidateTypeId,
    } = data;
    navigate(
      ROUTES.EDIT_ELECTION_EXPENSE({
        electionSettingsId,
        candidateElectionDetailsId,
        electionTypeId,
        candidateTypeId,
      }),
    );
  };

  return (
    <div className="container-96 mb-24">
      <HeaderComponentCMS
        breadcrumbs={incomeSourceDetailsBreadcrumbs(t)}
        headerText="INCOME_SOURCE_DETAILS.HEADING"
      />
      <CMSOpSearch
        allSelectedDataForSearch={allSelectedData}
        searchStructAdmin={searchStructAdmin}
        searchStructElectionUser={searchStructElectionUser}
        setSearchParams={setSearchParams}
      />

      {/* সম্পূর্ণ TABLE */}
      <CompleteTable
        tableName={t('INCOME_SOURCE_DETAILS.COMPLETE')}
        tableColumnsFn={({ isDownload }) =>
          incomeSourceDetailsTableColumns({
            t,
            editHandler,
            params,
            isDownload,
          })
        }
        queryParamsObj={{ isCandidateElectionExpenseComplete: true }}
        downloadFileName="probable sources of funds for election expenditure table (complete)"
      />

      {/* অসম্পূর্ণ TABLE */}
      <IncompleteTable
        tableName={t('INCOME_SOURCE_DETAILS.INCOMPLETE')}
        tableColumnsFn={({ isDownload }) =>
          incomeSourceDetailsTableColumns({
            t,
            editHandler,
            params,
            isDownload,
          })
        }
        queryParamsObj={{ isCandidateElectionExpenseComplete: false }}
        downloadFileName="probable sources of funds for election expenditure table (incomplete)"
      />
    </div>
  );
};

export default IncomeSourceDetails;
