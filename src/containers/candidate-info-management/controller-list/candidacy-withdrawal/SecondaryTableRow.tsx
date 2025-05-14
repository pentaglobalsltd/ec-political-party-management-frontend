import { ReactNode } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TableData, TableRow, InputText } from '@pentabd/ui';
import { FORM_FIELDS } from '@constants/forms';
import FileComponent from '@components/inputs/FileComponent';
import { CandidacyWithdrawalValidationDataType } from '@validations/candidate-info-management/controller-list/withdrawal-of-candidature/withdrawalOfCandidatureValidation';
import { dynamicSecondaryRowElection } from '@helpers/dynamicColumnForElectionConstituency';
import { FILE_CATEGORY } from '@constants/file';
import WithdrawalOption from './WithdrawalOption';
import { CANDIDATE_INFO } from '@constants/candidate-info';
import { dynamicSecondaryRowForCandidateType } from '@containers/candidate-info-management/helper/dynamicColumnForCandidateType';
import { dynamicSecondaryRowForZilla } from '@containers/candidate-info-management/helper/dynamicColumnForZilla';

interface PropsSecondaryTableRow {
  index: number;
  item: any;
  register: UseFormRegister<CandidacyWithdrawalValidationDataType>;
  errors: FieldErrors<CandidacyWithdrawalValidationDataType>;
  callbackRowSubmit: () => void;
  getValues: () => void;
  availableStatuses?: number;
  isAdmin: boolean;
}

const WITHDRAWAL_TABLE =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.CANDIDACY_WITHDRAWAL
    .WITHDRAWAL_TABLE;

const SecondaryTableRow = ({
  index,
  item,
  errors,
  register,
  callbackRowSubmit,
  isAdmin,
}: PropsSecondaryTableRow) => {
  const { t } = useTranslation();

  const dynamicRowForPoliticalParty = ({
    candidateTypeId,
  }: {
    candidateTypeId: number;
  }) => {
    switch (candidateTypeId) {
      case CANDIDATE_INFO.CITY_CORPORATION_WOMAN_COUNCILLOR.ID:
        return;
      case CANDIDATE_INFO.CITY_CORPORATION_COUNCILLOR.ID:
        return;
      case CANDIDATE_INFO.UNION_PARISHAD_GENERAL_MEMBER.ID:
        return;
      case CANDIDATE_INFO.UNION_PARISHAD_RESERVED_MEMBER.ID:
        return;

      default:
        return <TableData>{item?.politicalParty as ReactNode}</TableData>;
    }
  };

  return (
    <TableRow>
      <TableData>{item?.idx as ReactNode}</TableData>
      <TableData>{item?.candidateName as ReactNode}</TableData>
      <TableData>{item?.nid as ReactNode}</TableData>
      {dynamicSecondaryRowForCandidateType({ item, isAdmin })}
      {dynamicSecondaryRowForZilla({ item, isAdmin })}
      {dynamicSecondaryRowElection({ item, t })}

      <TableData>{item?.nominationStatus}</TableData>

      {dynamicRowForPoliticalParty({ candidateTypeId: item?.candidateTypeId })}

      <TableData>
        <InputText
          {...register(
            `candidacyWithdrawalValidation.${index}.${WITHDRAWAL_TABLE.DETAILS}`,
          )}
          error={errors as any}
          minWidth
        />
      </TableData>
      <TableData>
        <FileComponent
          registerName={`candidacyWithdrawalValidation.${index}.${WITHDRAWAL_TABLE.ATTACHMENT}`}
          minWidth
          tableFileComponent
          pathId={item?.electionScheduleId}
          category={FILE_CATEGORY.CIMS}
        />
      </TableData>
      <TableData>
        <TableData>
          {item?.statusFile?.filename ? (
            <FileComponent
              registerName={`candidacyWithdrawalValidation.${index}.${WITHDRAWAL_TABLE.ATTACHMENT}`}
              downloadData={item?.statusFile}
              minWidth
              tableFileComponent
              onlyFileInfoCard
            />
          ) : (
            t('APPEAL.NO_DATA')
          )}
        </TableData>
      </TableData>

      <TableData>
        <WithdrawalOption
          row={item}
          index={index}
          callbackRowSubmit={callbackRowSubmit}
        />
      </TableData>
    </TableRow>
  );
};

export default SecondaryTableRow;
