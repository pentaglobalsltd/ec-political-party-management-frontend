import { useTranslation } from 'react-i18next';
import { ReactNode, useEffect, useState } from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';

import { IconCheck } from '@pentabd/icons';
import { SelectionType } from '@pentabd/ui/build/atoms/select/types';
import { Button, InputSelect, TableData, TableRow } from '@pentabd/ui';

import FileComponent from '@components/inputs/FileComponent';
import FormChildInput from '@components/inputs/FormChildInput';

import { FORM_FIELDS } from '@constants/forms';
import { FILE_CATEGORY } from '@constants/file';
import { STEPS, STEPS_TYPE } from '@constants/steps';

import { useNominationStepsSelect } from '@hooks/miscellaneous/custom-hook/useNominationStepSelect';
import { useElectionApplicantUpdate } from '@hooks/candidate-info-management/controller-list/useElectionApplicantUpdate';
import { AppealValidationDataType } from '@validations/candidate-info-management/controller-list/appeal/appealValidation';
import { getDigitBanglaFromEnglish } from '@utils';
import { dynamicSecondaryRowElection } from '@helpers/dynamicColumnForElectionConstituency';

import { ElectionApplicantUpdateTypes } from '@type/candidate-info-management/election-applicant-types';
import { dynamicSecondaryRowForCandidateType } from '@containers/candidate-info-management/helper/dynamicColumnForCandidateType';

interface PropsSecondaryTableRow {
  index: number;
  item: any;
  values: any;
  register: UseFormRegister<AppealValidationDataType>;
  control: Control<AppealValidationDataType, any>;
  errors: FieldErrors<AppealValidationDataType>;
  callbackRowSubmit: () => void;
  isAdmin?: boolean;
}

const APPEAL_TABLE =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.APPEAL.APPEAL_TABLE;

const SecondaryTableRow = ({
  index,
  item,
  values,
  control,
  errors,
  callbackRowSubmit,
  isAdmin,
}: PropsSecondaryTableRow) => {
  const { t } = useTranslation();
  const [disableRowSubmit, setDisableRowSubmit] = useState<boolean>(true);

  const stepId = STEPS.APPEAL;
  const statusType = STEPS_TYPE.AVAILABLE_STATUSES;
  const { options } = useNominationStepsSelect({ stepId, statusType });

  const { electionApplicantUpdate, success, loading } =
    useElectionApplicantUpdate();

  const handleButtonDisable = (value: boolean) => {
    setDisableRowSubmit(value);
  };

  const submitRow = (id: number) => {
    const data = values.appealValidation[id];

    const { appealType, details, file } = data;

    const {
      electionSettingsId,
      candidateElectionDetailsId,
      electionApplicantId,
    } = item;

    const inputDataReq = {
      ...(details && details.toString().length !== 0 && { details }),
      ...(file &&
        Object.keys(file)?.length !== 0 && {
          file,
        }),
    };

    const postData = {
      id: parseInt(electionApplicantId as string),
      nominationStatusId: appealType
        ? parseInt(appealType?.toString())
        : item?.nominationStatusId,
      candidateElectionDetailsId: parseInt(
        candidateElectionDetailsId as string,
      ),
      ...inputDataReq,
    };

    electionApplicantUpdate({
      data: postData,
      candidateElectionDetailsId,
      electionSettingsId,
    } as ElectionApplicantUpdateTypes);
  };

  useEffect(() => {
    if (success) {
      callbackRowSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  return (
    <TableRow>
      <TableData>{item?.idx as ReactNode}</TableData>
      <TableData>{item?.candidateName as ReactNode}</TableData>
      <TableData>{item?.nid as ReactNode}</TableData>
      {dynamicSecondaryRowForCandidateType({ item, isAdmin })}
      {dynamicSecondaryRowElection({ item, isAdmin })}
      <TableData>{item?.nominationStatus}</TableData>

      {/* আপিলের প্রকার */}
      <TableData>
        <Controller
          control={control}
          name={`appealValidation.${index}.${APPEAL_TABLE.APPEAL_TYPE}`}
          render={({ field }) => {
            return (
              <InputSelect
                portal
                minWidth
                placeholder={t('PLACEHOLDER.SELECT')}
                name={`appealValidation.${index}.${APPEAL_TABLE.APPEAL_TYPE}`}
                onSelectItem={(data: SelectionType) => {
                  field.onChange(data);
                  handleButtonDisable(false);
                }}
                error={errors as any}
                value={field.value as string}
                defaultValue={item?.nominationStatusId}
                options={options}
              />
            );
          }}
        />
      </TableData>

      {/* বিস্তারিত বিবরণী */}
      <TableData>
        <FormChildInput
          registerName={`appealValidation.${index}.${APPEAL_TABLE.DETAILS}`}
          isMinWidth
          placeholder={t('PLACEHOLDER.ENTER')}
          defaultValue={item?.statusComment}
        />
      </TableData>

      {/* সংযুক্তি */}
      <TableData>
        <FileComponent
          registerName={`appealValidation.${index}.${APPEAL_TABLE.FILE}`}
          minWidth
          tableFileComponent
          pathId={item?.electionScheduleId}
          category={FILE_CATEGORY.CIMS}
        />
      </TableData>

      <TableData>
        {item?.statusFile?.filename ? (
          <FileComponent
            registerName={`appealValidation.${index}.${APPEAL_TABLE.FILE}`}
            downloadData={item?.statusFile}
            minWidth
            tableFileComponent
            onlyFileInfoCard
          />
        ) : (
          t('APPEAL.NO_DATA')
        )}
      </TableData>

      {/* button */}
      <TableData>
        <Button
          fill="fill"
          className="border-success"
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
