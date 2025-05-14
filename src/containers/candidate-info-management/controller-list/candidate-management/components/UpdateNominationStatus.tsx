import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconChevronDown, IconSave01 } from '@pentabd/icons';
import { Button, Select } from '@pentabd/ui';
import { useSearchParams } from 'react-router-dom';
import { useUpdateNominationStatus } from '@hooks/candidate-info-management/controller-list/candidate-management-dashboard/useUpdateNominationStatus';

import { getParams } from '@utils';
import { NominationStatusUpdateValueType } from '../constants';
import { SelectOptionArray } from '@type/selection-option-type';
import { NominationListSearchProps } from '@type/nomination-list-advance-search-types';
import { NominationType } from '@type/candidate-info-management/nomination-list-type';

function UpdateNominationStatus({
  row,
  getCandidateInformation,
  searchItems,
  nominationStatuses = [],
}: {
  row: NominationType;
  getCandidateInformation: any;
  searchItems: NominationListSearchProps;
  nominationStatuses?: SelectOptionArray[];
}) {
  const [nominationStatusUpdate, setNominationStatusUpdate] =
    useState<NominationStatusUpdateValueType | null>(null);
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const { updateNominationStatus, loading: isNominationStatusUpdateLoading } =
    useUpdateNominationStatus();

  const nominationStatusHandler = () =>
    updateNominationStatus({
      nominationStatusUpdate,
      getCandidateInformation,
      params,
      searchItems,
    });

  return (
    <div className="d-flex align-items-center text-nowrap">
      <Select
        name={'name'}
        placeholder={t('PLACEHOLDER.SELECT')}
        options={nominationStatuses || []}
        size="xs"
        portal
        minWidth
        defaultValue={row.nominationStatusId}
        onSelectItem={(data: any) => {
          if (data) {
            setNominationStatusUpdate({
              electionSettingsId: row?.electionSettingsId,
              candidateElectionDetailsId: row?.candidateElectionDetailsId,
              statusId: data,
            });
          }
        }}
        suffix={<IconChevronDown size="18" fill="subtitle2" />}
        disabled={isNominationStatusUpdateLoading}
      />
      <Button
        size="md"
        className="border ms-3 px-6"
        onClick={nominationStatusHandler}
        loading={isNominationStatusUpdateLoading}
      >
        <IconSave01 size="17" />
      </Button>
    </div>
  );
}

export default UpdateNominationStatus;
