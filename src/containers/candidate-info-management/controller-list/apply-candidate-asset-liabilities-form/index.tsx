import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import CompleteTable from '@components/operator-view-home/CompleteTable';
import IncompleteTable from '@components/operator-view-home/IncompleteTable';

import { ROUTES } from '@constants/routes';
import {
  assetLiabilitiesBreadcrumbs,
  assetLiabilitiesTableColumns,
} from './constants';
import {
  allSelectedData,
  searchStructAdmin,
  searchStructElectionUser,
} from './searchConstants';

import { getParams } from '@utils';
import { HeaderComponentCMS } from '@containers/candidate-info-management/components/header';
import { CMSOpSearch } from '@containers/candidate-info-management/components/CMSOpSearch';

const AssetLiabilitiesForm = () => {
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
      ROUTES.EDIT_ASSET_LIABILITIES({
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
        breadcrumbs={assetLiabilitiesBreadcrumbs(t)}
        headerText="ASSET_LIABILITIES.ASSET_LIABILITIES"
      />
      <CMSOpSearch
        allSelectedDataForSearch={allSelectedData}
        searchStructAdmin={searchStructAdmin}
        searchStructElectionUser={searchStructElectionUser}
        setSearchParams={setSearchParams}
      />

      {/* সম্পূর্ণ TABLE */}
      <CompleteTable
        tableName={t('ASSET_LIABILITIES.COMPLETE')}
        tableColumnsFn={({ isDownload }) =>
          assetLiabilitiesTableColumns({ t, editHandler, params, isDownload })
        }
        queryParamsObj={{ isAssetIncomeExpenditureComplete: true }}
        downloadFileName="asset liability table (complete)"
      />

      {/* অসম্পূর্ণ TABLE */}
      <IncompleteTable
        tableName={t('ASSET_LIABILITIES.INCOMPLETE')}
        tableColumnsFn={({ isDownload }) =>
          assetLiabilitiesTableColumns({ t, editHandler, params, isDownload })
        }
        queryParamsObj={{ isAssetIncomeExpenditureComplete: false }}
        downloadFileName="asset liability table (incomplete)"
      />
    </div>
  );
};

export default AssetLiabilitiesForm;
