import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import CompleteTable from '../../../../components/operator-view-home/CompleteTable';
import IncompleteTable from '../../../../components/operator-view-home/IncompleteTable';

import { ROUTES } from '@constants/routes';
import {
  candidatePersonalInfoBreadcrumbs,
  candidatePersonalInfoTableColumns,
} from './constants';
import {
  allSelectedData,
  searchStruct,
  searchStructElectionUser,
} from './searchConstants';

import { getParams } from '@utils';
import { HeaderComponentCMS } from '@containers/candidate-info-management/components/header';
import { CMSOpSearch } from '@containers/candidate-info-management/components/CMSOpSearch';

function CandidatePersonalInformation() {
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
      ROUTES.EDIT_CANDIDATES_PERSONAL_INFO({
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
        breadcrumbs={candidatePersonalInfoBreadcrumbs(t)}
        headerText="CANDIDATE_PERSONAL_INFO.CANDIDATE_PERSONAL_INFO"
      />
      <CMSOpSearch
        allSelectedDataForSearch={allSelectedData}
        searchStructAdmin={searchStruct}
        searchStructElectionUser={searchStructElectionUser}
        setSearchParams={setSearchParams}
      />

      {/* সম্পূর্ণ TABLE */}
      <CompleteTable
        tableName={t('CANDIDATE_PERSONAL_INFO.COMPLETE')}
        tableColumnsFn={({ isDownload }) =>
          candidatePersonalInfoTableColumns({
            t,
            editHandler,
            params,
            isDownload,
          })
        }
        queryParamsObj={{ isPersonalInfoComplete: true }}
        downloadFileName="candidate personal info table (complete)"
      />

      {/* অসম্পূর্ণ TABLE */}
      <IncompleteTable
        tableName={t('CANDIDATE_PERSONAL_INFO.INCOMPLETE')}
        tableColumnsFn={({ isDownload }) =>
          candidatePersonalInfoTableColumns({
            t,
            editHandler,
            params,
            isDownload,
          })
        }
        queryParamsObj={{ isPersonalInfoComplete: false }}
        downloadFileName="candidate personal info table (incomplete)"
      />
    </div>
  );
}

export default CandidatePersonalInformation;
