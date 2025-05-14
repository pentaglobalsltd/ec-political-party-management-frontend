import { useEffect, useState } from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IconCheck, IconChevronDown, IconX } from '@pentabd/icons';
import {
  Button,
  InputSelect,
  TextArea,
  TableData,
  TableRow,
} from '@pentabd/ui';
import { FORM_FIELDS } from '@constants/forms';
import { SelectionType } from '@pentabd/ui/build/atoms/select/types';
import { STEPS, STEPS_TYPE } from '@constants/steps';
import { useNominationStepsSelect } from '@hooks/miscellaneous/custom-hook/useNominationStepSelect';
import FileComponent from '@components/inputs/FileComponent';
import { useElectionApplicantUpdate } from '@hooks/candidate-info-management/controller-list/useElectionApplicantUpdate';
import { SelectionValidationDataType } from '@validations/candidate-info-management/controller-list/selection/selectionValidation';
import { dynamicSecondaryRowElection } from '@helpers/dynamicColumnForElectionConstituency';
import { FILE_CATEGORY } from '@constants/file';

interface PropsSecondaryTableRow {
  index: number;
  item: any;
  values: any;
  register: UseFormRegister<SelectionValidationDataType>;
  control: Control<SelectionValidationDataType, any>;
  errors: FieldErrors<SelectionValidationDataType>;
  callbackRowSubmit: () => void;
}

const SELECTION_TABLE =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.SELECTION.TABLE;

const SecondaryTableRow = ({
  index,
  item,
  control,
  errors,
  register,
  values,
  callbackRowSubmit,
}: PropsSecondaryTableRow) => {
  const { t } = useTranslation();

  const [disableRowSubmit, setDisableRowSubmit] = useState<boolean>(true);
  const { electionApplicantUpdate, success, loading } =
    useElectionApplicantUpdate();

  const stepId = STEPS.PICK_UP;
  const statusType = STEPS_TYPE.AVAILABLE_STATUSES;
  const { options } = useNominationStepsSelect({ stepId, statusType });

  const handleButtonDisable = (value: boolean) => {
    setDisableRowSubmit(value);
  };

  const submitRow = (id: number) => {
    const data = values?.selectionValidation?.[id];

    const { selectionTableInfo, comments, file } = data;

    const {
      electionSettingsId,
      candidateElectionDetailsId,
      electionApplicantId,
    } = item;

    const inputDataReq = {
      ...(comments?.length !== 0 && { comments }),

      ...(file &&
        Object.keys(file)?.length !== 0 && {
          file,
        }),
    };

    const postData = {
      id: parseInt(electionApplicantId as string),
      nominationStatusId: parseInt(selectionTableInfo),
      candidateElectionDetailsId: parseInt(
        candidateElectionDetailsId as string,
      ),
      ...inputDataReq,
    };

    electionApplicantUpdate({
      data: postData,
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
    <TableRow>
      <TableData>{item.idx}</TableData>
      <TableData>{item.candidateName}</TableData>
      <TableData>{item.candidateType}</TableData>

      {dynamicSecondaryRowElection({ item, t })}

      {/* IS_AGE_CORRECT */}
      <TableData>
        {item.isCandidateAgeCorrect ? (
          <IconCheck size="26" fill="success" />
        ) : (
          <IconX size="26" fill="danger" />
        )}
      </TableData>

      {/* IS_CANDIDATE_NID_CORRECT */}
      <TableData>
        {item.candidateVoterNoCorrect ? (
          <IconCheck size="26" fill="success" />
        ) : (
          <IconX size="26" fill="danger" />
        )}
      </TableData>

      <TableData>{item.voterNo}</TableData>

      {/* IS_PROPOSER_NID_CORRECT */}
      <TableData>
        {item.proposerVoterNoCorrect ? (
          <IconCheck size="26" fill="success" />
        ) : (
          <IconX size="26" fill="danger" />
        )}
      </TableData>

      <TableData>{item.proposerVoterNo}</TableData>

      {/* IS_SUPPORTER_NID_CORRECT */}
      <TableData>
        {item.supporterVoterNoCorrect ? (
          <IconCheck size="26" fill="success" />
        ) : (
          <IconX size="26" fill="danger" />
        )}
      </TableData>

      <TableData>{item.supporterVoterNo}</TableData>

      {/* INFO */}
      <TableData>
        <Controller
          control={control}
          name={`selectionValidation.${index}.${SELECTION_TABLE.INFO}`}
          render={({ field }) => {
            return (
              <InputSelect
                portal
                name={`selectionValidation.${index}.${SELECTION_TABLE.INFO}`}
                onSelectItem={(data: SelectionType) => {
                  field.onChange(data);
                  handleButtonDisable(false);
                }}
                error={errors as any}
                defaultValue={field.value as string}
                options={options}
                minWidth
                placeholder={t('SELECTION.TABLE_ROW_TYPE_SELECT')}
                suffix={<IconChevronDown size="20" fill="subtitle2" />}
              />
            );
          }}
        />
      </TableData>

      {/* REASON_FOR_ACCEPTANCE_OR_CANCELLATION */}
      <TableData>
        <TextArea
          {...register(
            `selectionValidation.${index}.${SELECTION_TABLE.REASON}`,
          )}
          placeholder={t('SELECTION.TABLE_ROW_TYPE_TEXTAREA')}
          minWidth
          rows={1}
        />
      </TableData>

      {/* ATTACHMENT */}
      <TableData>
        <FileComponent
          registerName={`selectionValidation.${index}.${SELECTION_TABLE.FILE}`}
          minWidth
          handleButtonDisable={handleButtonDisable}
          tableFileComponent
          pathId={item?.electionScheduleId}
          category={FILE_CATEGORY.CIMS}
        />
      </TableData>

      <TableData>
        {item?.statusFile?.filename ? (
          <FileComponent
            registerName={`selectionValidation.${index}.${SELECTION_TABLE.FILE}`}
            downloadData={item?.statusFile}
            minWidth
            tableFileComponent
            onlyFileInfoCard
          />
        ) : (
          t('APPEAL.NO_DATA')
        )}
      </TableData>

      {/* step button */}
      <TableData>
        <Button
          fill="fill"
          className="border-primary"
          type="success"
          htmlType="button"
          onClick={() => submitRow(index)}
          disabled={disableRowSubmit || !stepId}
          loading={loading}
        >
          <IconCheck size="20" fill="white" />
        </Button>
      </TableData>
    </TableRow>
  );
};

export default SecondaryTableRow;
