import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { IconChevronDown, IconSave01 } from '@pentabd/icons';
import { Button, Select } from '@pentabd/ui';

import { useUpdateCandidateType } from '@hooks/candidate-info-management/controller-list/candidate-management-dashboard/useUpdateCandidateType';
import { getParams } from '@utils';
import { CandidateElectionFullDetailsListAdminProps } from '@hooks/candidate-info-management/nomination-list/useCandidateInformation';
import { AllCandidateType } from '@hooks/election-schedule-management/other/candidate-type/useGetAllCandidateType';

const UpdateCandidateType = ({
  row,
  getCandidateInformation,
  allCandidateTypes = [],
}: {
  row: any;
  getCandidateInformation: ({
    page,
    size,
    searchItems,
  }: CandidateElectionFullDetailsListAdminProps) => void;
  allCandidateTypes?: AllCandidateType[];
}) => {
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const [candidateTypeId, setCandidateTypeId] = useState<number>();

  const { updateCandidateType, isUpdateLoading, isUpdateSuccess } =
    useUpdateCandidateType();

  const candidateTypeHandler = () => {
    const { electionSettingsId, candidateElectionDetailsId } = row;
    if (electionSettingsId && candidateElectionDetailsId && candidateTypeId) {
      updateCandidateType({
        electionSettingsId: row?.electionSettingsId,
        candidateElectionDetailsId: row?.candidateElectionDetailsId,
        candidateTypeId,
      });
    }
  };

  useEffect(() => {
    if (isUpdateSuccess) {
      const { page, ...rest } = params;

      getCandidateInformation({
        page: params?.page ? parseInt(params.page, 10) : 0,
        searchItems: rest,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdateSuccess]);

  return (
    <div className="d-flex align-items-center text-nowrap">
      <Select
        name="name"
        placeholder={t('PLACEHOLDER.SELECT')}
        options={allCandidateTypes?.filter(
          (item: { electionTypeId: number }) =>
            item.electionTypeId === row?.electionTypeId,
        )}
        size="xs"
        portal
        minWidth
        defaultValue={candidateTypeId || row.candidateTypeId}
        onSelectItem={(data: any) => {
          if (data) {
            setCandidateTypeId(data);
          }
        }}
        suffix={<IconChevronDown size="18" fill="subtitle2" />}
        disabled={isUpdateLoading}
      />
      <Button
        size="md"
        className="border ms-3 px-6"
        onClick={candidateTypeHandler}
        loading={isUpdateLoading}
      >
        <IconSave01 size="17" />
      </Button>
    </div>
  );
};

export default UpdateCandidateType;
