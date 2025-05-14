import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import CompleteTable from '@components/operator-view-home/CompleteTable';
import IncompleteTable from '@components/operator-view-home/IncompleteTable';

import { ROUTES } from '@constants/routes';
import {
  allSelectedData,
  searchStructAdmin,
  searchStructElectionUser,
} from './searchConstants';
import { affidavitBreadcrumbs, affidavitTableColumns } from './constants';
import { getParams } from '@utils';
import { CANDIDATE_INFO } from '@constants/candidate-info';
import { HeaderComponentCMS } from '@containers/candidate-info-management/components/header';
import { CMSOpSearch } from '@containers/candidate-info-management/components/CMSOpSearch';

const Affidavit = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const isRemoveEditButton = [
    CANDIDATE_INFO.UNION_PARISHAD_GENERAL_MEMBER.ID,
    CANDIDATE_INFO.UNION_PARISHAD_RESERVED_MEMBER.ID,
  ]?.includes(Number(params?.candidateTypeId));

  const editAffidavitHandler = (data: any) => {
    const {
      electionSettingsId,
      candidateElectionDetailsId,
      electionTypeId,
      candidateTypeId,
      electionScheduleId,
    } = data;

    navigate(
      ROUTES.EDIT_AFFIDAVIT({
        electionSettingsId,
        candidateElectionDetailsId,
        electionTypeId,
        candidateTypeId,
        electionScheduleId,
      }),
    );
  };

  return (
    <div className="container-96 mb-24">
      <HeaderComponentCMS
        breadcrumbs={affidavitBreadcrumbs(t)}
        headerText="AFFIDAVIT.AFFIDAVIT"
      />

      <CMSOpSearch
        allSelectedDataForSearch={allSelectedData}
        searchStructAdmin={searchStructAdmin}
        searchStructElectionUser={searchStructElectionUser}
        setSearchParams={setSearchParams}
      />

      {/* সম্পূর্ণ TABLE */}
      <CompleteTable
        tableName={t('AFFIDAVIT.COMPLETE')}
        tableColumnsFn={({ isDownload }) =>
          affidavitTableColumns({
            t,
            editAffidavitHandler,
            params,
            isDownload,
            isRemoveEditButton,
          })
        }
        queryParamsObj={{ isHolofnamaComplete: true }}
        downloadFileName="affidavit table (complete)"
      />

      {/* অসম্পূর্ণ TABLE */}
      <IncompleteTable
        tableName={t('AFFIDAVIT.INCOMPLETE')}
        tableColumnsFn={({ isDownload }) =>
          affidavitTableColumns({
            t,
            editAffidavitHandler,
            params,
            isDownload,
            isRemoveEditButton,
          })
        }
        queryParamsObj={{ isHolofnamaComplete: false }}
        downloadFileName="affidavit table (incomplete)"
      />
    </div>
  );
};

export default Affidavit;
