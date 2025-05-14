import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FieldErrors, UseFormRegister, useFormContext } from 'react-hook-form';

import { Button, InputText, TableData, TableRow, Text } from '@pentabd/ui';

import ImageViewer from '@components/ImageViewer';
import AllocatedSymbolInputSelected from './AllocatedSymbolInputSelected';

import { useElectionApplicantUpdateCandidateSymbol } from '@hooks/candidate-info-management/controller-list/candidate-symbol-allocation/useElectionApplicantUpdateAllocatedSymbol';
import { useAllocatedSymbolList } from '@hooks/candidate-info-management/controller-list/candidate-symbol-allocation/useAllocatedSymbolList';

import { FORM_FIELDS } from '@constants/forms';
import { CANDIDATE_INFO } from '@constants/candidate-info';
import { ElectionApplicantTypes } from '@type/candidate-info-management/election-applicant-types';

import { dynamicSecondaryRowElection } from '@helpers/dynamicColumnForElectionConstituency';

import { SymbolAllocationValidationDataType } from '@validations/candidate-info-management/controller-list/symbol-allocation/symbolAllocationValidation';
import { dynamicSecondaryRowForCandidateType } from '@containers/candidate-info-management/helper/dynamicColumnForCandidateType';

interface PropsSecondaryTableRow {
  index: number;
  item: any;
  values: any;
  register: UseFormRegister<SymbolAllocationValidationDataType>;
  errors: FieldErrors<SymbolAllocationValidationDataType>;
  availableStatuses: number;
  callbackRowSubmit: () => void;
  setValue: any;
  candidateTypeId?: string;
  isAdmin: boolean;
}

export const ALLOCATION_TABLE =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.SYMBOL_ALLOCATION
    .ALLOCATION_TABLE;

const SecondaryTableRow = ({
  index,
  item,
  register,
  errors,
  values,
  availableStatuses,
  callbackRowSubmit,
  setValue,
  candidateTypeId,
  isAdmin,
}: PropsSecondaryTableRow) => {
  const { t } = useTranslation();

  const { watch, trigger } = useFormContext();

  const { electionApplicantUpdateAllocatedSymbol, success, loading } =
    useElectionApplicantUpdateCandidateSymbol();

  const submitRow = async (id: number) => {
    await trigger([
      `symbolAllocationValidation.${index}.${ALLOCATION_TABLE.CANDIDATE_NAME_SERIAL}`,
      `symbolAllocationValidation.${index}.${ALLOCATION_TABLE.ALLOCATED_SYMBOL}`,
    ]);
    if (Object.keys(errors).length === 0) {
      const { candidateSerial, symbolId } =
        values.symbolAllocationValidation[id];

      const {
        electionSettingsId,
        candidateElectionDetailsId,
        electionApplicantId,
      } = item;

      const data: ElectionApplicantTypes = {};
      data.candidateElectionDetailsId = candidateElectionDetailsId as number;
      data.id = electionApplicantId as number;
      data.candidateSerial = parseInt(candidateSerial as string);
      data.nominationStatusId = availableStatuses;
      data.symbolId = symbolId
        ? symbolId
        : item.symbolId || item.politicalPartySymbolId;

      electionApplicantUpdateAllocatedSymbol({
        data,
        candidateElectionDetailsId: candidateElectionDetailsId,
        electionSettingsId: electionSettingsId,
      });
    }
  };

  useEffect(() => {
    if (item?.candidateSerialNo) {
      setValue(
        `symbolAllocationValidation.${index}.${ALLOCATION_TABLE.CANDIDATE_NAME_SERIAL}`,
        item?.candidateSerialNo,
      );
    } else {
      setValue(
        `symbolAllocationValidation.${index}.${ALLOCATION_TABLE.CANDIDATE_NAME_SERIAL}`,
        null,
      );
    }

    if (item?.symbolId || item?.politicalPartySymbolId) {
      setValue(
        `symbolAllocationValidation.${index}.${ALLOCATION_TABLE.ALLOCATED_SYMBOL}`,
        item?.symbolId ? item?.symbolId : item?.politicalPartySymbolId,
      );
    } else {
      setValue(
        `symbolAllocationValidation.${index}.${ALLOCATION_TABLE.ALLOCATED_SYMBOL}`,
        null,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (success) {
      callbackRowSubmit();
    }
  }, [callbackRowSubmit, success]);

  const { allocatedSymbol } = useAllocatedSymbolList({
    candidateTypeId: item?.candidateTypeId,
  });

  const data = watch('symbolAllocationValidation');
  const filePath: any = allocatedSymbol?.find((item: any) => {
    return item?.value === data?.[index]?.symbolId;
  });

  const findPoliticalPartySymbolPath = () => {
    const foundSymbolItem = allocatedSymbol.find((loopItem) => {
      return item?.politicalPartySymbolId === loopItem?.value;
    });
    return foundSymbolItem?.filePath;
  };

  const dynamicRowForSymbolAllocation = (item: any) => {
    switch (Number(candidateTypeId)) {
      case CANDIDATE_INFO.CITY_CORPORATION_WOMAN_COUNCILLOR.ID:
        return;
      case CANDIDATE_INFO.CITY_CORPORATION_COUNCILLOR.ID:
        return;
      case CANDIDATE_INFO.UNION_PARISHAD_GENERAL_MEMBER.ID:
        return;
      case CANDIDATE_INFO.UNION_PARISHAD_RESERVED_MEMBER.ID:
        return;

      default:
        return <TableData>{item?.politicalParty}</TableData>;
    }
  };

  return (
    <TableRow>
      <TableData>{item?.idx}</TableData>
      <TableData>{item?.candidateName}</TableData>
      <TableData>{item?.nid}</TableData>
      {dynamicSecondaryRowForCandidateType({ item, isAdmin })}
      {dynamicSecondaryRowElection({ item, t })}
      <TableData>{item?.nominationStatus}</TableData>
      {dynamicRowForSymbolAllocation(item)}

      <TableData>{item?.preferredSymbolName}</TableData>

      <TableData>
        {item?.candidateTypeId && (
          <AllocatedSymbolInputSelected
            index={index}
            options={allocatedSymbol}
            symbolId={item?.symbolId || item?.politicalPartySymbolId}
          />
        )}
      </TableData>
      <TableData>
        {(filePath?.filePath ||
          item.symbolFilePath ||
          item.politicalPartySymbolId) && (
          <ImageViewer
            imagePath={
              filePath?.filePath
                ? filePath?.filePath
                : item?.symbolFilePath
                ? item?.symbolFilePath
                : findPoliticalPartySymbolPath()
            }
            usePublicPath={true}
          />
        )}
      </TableData>
      <TableData>
        <InputText
          {...register(
            `symbolAllocationValidation.${index}.${ALLOCATION_TABLE.CANDIDATE_NAME_SERIAL}`,
          )}
          defaultValue={item?.candidateSerialNo}
          placeholder={t('PLACEHOLDER.ENTER')}
          error={errors as any}
          minWidth
        />
      </TableData>

      <TableData>
        <Button
          fill="fill"
          className="border-primary"
          type="primary"
          htmlType="button"
          onClick={() => submitRow(index)}
          loading={loading}
        >
          <Text size="sm" weight="semibold" color="white">
            {t('SYMBOL_ALLOCATION.ALLOCATION')}
          </Text>
        </Button>
      </TableData>
    </TableRow>
  );
};

export default SecondaryTableRow;
