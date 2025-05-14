import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconChevronDown, IconSave01 } from '@pentabd/icons';
import { Button, Select } from '@pentabd/ui';
import { NominationType } from '@type/candidate-info-management/nomination-list-type';
import { withdrawalOptions } from './constants';
import { useFormContext } from 'react-hook-form';
import { ElectionApplicantTypes } from '@type/candidate-info-management/election-applicant-types';
import { DocumentServiceType } from '@type/documents/document-service-type';
import { useElectionApplicantUpdate } from '@hooks/candidate-info-management/controller-list/useElectionApplicantUpdate';

interface PropsSecondaryTableRow {
  index: number;
  row: NominationType;
  callbackRowSubmit: () => void;
}

function WithdrawalOption({
  row,
  index,
  callbackRowSubmit,
}: PropsSecondaryTableRow) {
  const [nominationStatusUpdate, setNominationStatusUpdate] = useState();
  const { t } = useTranslation();
  const { getValues } = useFormContext();
  const { electionApplicantUpdate, success, loading } =
    useElectionApplicantUpdate();

  const nominationStatusHandler = () => {
    const values: any = getValues();
    const { comments, file } = values?.candidacyWithdrawalValidation?.[index];
    const {
      candidateElectionDetailsId,
      electionApplicantId,
      electionSettingsId,
    } = row;
    const data: ElectionApplicantTypes = {};
    data.candidateElectionDetailsId = candidateElectionDetailsId as number;
    data.id = electionApplicantId as number;
    data.comments = comments as string;
    data.nominationStatusId = nominationStatusUpdate;
    data.file = file as DocumentServiceType;

    electionApplicantUpdate({
      data,
      candidateElectionDetailsId,
      electionSettingsId,
    });
  };

  useEffect(() => {
    if (success) {
      callbackRowSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  return (
    <div className="d-flex align-items-center text-nowrap">
      <Select
        name={'name'}
        placeholder={t('PLACEHOLDER.SELECT')}
        options={withdrawalOptions || []}
        size="xs"
        portal
        minWidth
        defaultValue={
          withdrawalOptions.some(
            (item) => item.value === row.nominationStatusId,
          )
            ? row.nominationStatusId
            : undefined
        }
        onSelectItem={(data: any) => {
          if (data) {
            setNominationStatusUpdate(data);
          }
        }}
        suffix={<IconChevronDown size="18" fill="subtitle2" />}
        disabled={loading}
      />
      <Button
        size="md"
        className="border ms-3 px-6"
        onClick={nominationStatusHandler}
        loading={loading}
      >
        <IconSave01 size="17" />
      </Button>
    </div>
  );
}

export default WithdrawalOption;
