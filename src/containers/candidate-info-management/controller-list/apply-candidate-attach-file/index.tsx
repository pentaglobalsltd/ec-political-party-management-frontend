import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ROUTES } from '@constants/routes';

import CompleteTable from '@components/operator-view-home/CompleteTable';
import IncompleteTable from '@components/operator-view-home/IncompleteTable';
import {
  allSelectedData,
  searchStructAdmin,
  searchStructElectionUser,
} from './searchConstants';
import { attachmentBreadcrumbs, attachmentTableColumns } from './constants';

import { getParams } from '@utils';
import { HeaderComponentCMS } from '@containers/candidate-info-management/components/header';
import { CMSOpSearch } from '@containers/candidate-info-management/components/CMSOpSearch';

const Attachment = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const editAttachmentHandler = (data: any) => {
    const {
      electionSettingsId,
      candidateElectionDetailsId,
      electionTypeId,
      candidateTypeId,
      electionScheduleId,
    } = data;

    navigate(
      ROUTES.EDIT_NOMINATION_ATTACHMENT({
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
        breadcrumbs={attachmentBreadcrumbs(t)}
        headerText="ATTACH_FILE.PAGE_TITLE"
      />
      <CMSOpSearch
        allSelectedDataForSearch={allSelectedData}
        searchStructAdmin={searchStructAdmin}
        searchStructElectionUser={searchStructElectionUser}
        setSearchParams={setSearchParams}
      />

      {/* সম্পূর্ণ TABLE */}
      <CompleteTable
        tableName={t('ATTACH_FILE.COMPLETE')}
        tableColumnsFn={({ isDownload }) =>
          attachmentTableColumns({
            t,
            editAttachmentHandler,
            params,
            isDownload,
          })
        }
        queryParamsObj={{ isAttachmentComplete: true }}
        downloadFileName="attach file table (complete)"
      />

      {/* অসম্পূর্ণ TABLE */}
      <IncompleteTable
        tableName={t('ATTACH_FILE.INCOMPLETE')}
        tableColumnsFn={({ isDownload }) =>
          attachmentTableColumns({
            t,
            editAttachmentHandler,
            params,
            isDownload,
          })
        }
        queryParamsObj={{ isAttachmentComplete: false }}
        downloadFileName="attach file table (incomplete)"
      />
    </div>
  );
};

export default Attachment;
