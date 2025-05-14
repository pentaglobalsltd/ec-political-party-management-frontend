import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { IconPlus } from '@pentabd/icons';
import { Button, Modal } from '@pentabd/ui';

import DeleteModal from './DeleteModal';
import CompleteTable from '../../../../components/operator-view-home/CompleteTable';
import IncompleteTable from '../../../../components/operator-view-home/IncompleteTable';

import { ROUTES } from '@constants/routes';
import {
  nominationOfCandidatesCompleteTableColumns,
  nominationOfCandidatesTableBreadcrumbs,
  nominationOfCandidatesIncompleteTableColumns,
} from './constants';
import {
  allSelectedDataForSearch,
  searchStruct,
  searchStructElectionUser,
} from './searchConstants';

import { getParams } from '@utils';
import { HeaderComponentCMS } from '@containers/candidate-info-management/components/header';
import { CMSOpSearch } from '@containers/candidate-info-management/components/CMSOpSearch';

function NominationOfCandidates() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const handleDelete = (raw: any) => {
    const {
      electionSettingsId,
      candidateElectionDetailsId,
      electionApplicantId,
    } = raw;

    if (
      electionSettingsId &&
      candidateElectionDetailsId &&
      electionApplicantId
    ) {
      setIsDeleteModalOpen(true);
    }
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleEdit = (raw: any) => {
    const {
      electionSettingsId,
      candidateElectionDetailsId,
      electionTypeId,
      candidateTypeId,
      electionScheduleId,
    } = raw;

    navigate(
      ROUTES.EDIT_NOMINATION_OF_CANDIDATE({
        electionSettingsId,
        candidateElectionDetailsId,
        electionTypeId,
        candidateTypeId,
        scheduleId: electionScheduleId,
        isFromNominationPage: 'false',
      }),
    );
  };

  return (
    <div className="container-96 mb-24">
      <HeaderComponentCMS
        breadcrumbs={nominationOfCandidatesTableBreadcrumbs(t)}
        headerText="NOMINATION_OF_CANDIDATES.NOMINATION_OF_CANDIDATES"
        actions={[
          <Link to={ROUTES.CREATE_NEW_NOMINATION_OF_CANDIDATE} className="pt-6">
            <Button key={2} type="primary" htmlType="button" size="sm">
              <IconPlus size="20" fill="light" />{' '}
              {t('NOMINATION_OF_CANDIDATES.ADD_NEW')}
            </Button>
          </Link>,
        ]}
      />
      <CMSOpSearch
        allSelectedDataForSearch={allSelectedDataForSearch}
        searchStructAdmin={searchStruct}
        searchStructElectionUser={searchStructElectionUser}
        setSearchParams={setSearchParams}
      />

      {/* সম্পূর্ণ TABLE */}
      <CompleteTable
        tableName={t('NOMINATION_OF_CANDIDATES.COMPLETE')}
        tableColumnsFn={({ isDownload }) =>
          nominationOfCandidatesCompleteTableColumns({
            t,
            editHandler: handleEdit,
            params,
            isDownload,
          })
        }
        queryParamsObj={{ isNominationComplete: true }}
        downloadFileName="candidate nomination table (complete)"
      />

      {/* অসম্পূর্ণ TABLE */}
      <IncompleteTable
        tableName={t('NOMINATION_OF_CANDIDATES.INCOMPLETE')}
        tableColumnsFn={({ isDownload }) =>
          nominationOfCandidatesIncompleteTableColumns({
            t,
            editHandler: handleEdit,
            deleteHandler: handleDelete,
            params,
            isDownload,
          })
        }
        queryParamsObj={{ isNominationComplete: false }}
        downloadFileName="candidate nomination table (incomplete)"
      />

      <Modal
        isOpen={isDeleteModalOpen}
        closeAble
        overlay
        onClose={closeDeleteModal}
      >
        <DeleteModal closeDeleteModal={closeDeleteModal} />
      </Modal>
    </div>
  );
}

export default NominationOfCandidates;
