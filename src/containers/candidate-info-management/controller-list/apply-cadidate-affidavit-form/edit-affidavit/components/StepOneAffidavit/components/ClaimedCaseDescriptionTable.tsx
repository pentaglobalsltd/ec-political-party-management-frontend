import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useId } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import {
  Button,
  Text,
  TableSecondary,
  TableData,
  TableRow,
  ConfirmationModal,
} from '@pentabd/ui';
import { IconPlus, IconTrash03, IconEdit05 } from '@pentabd/icons';

import FileComponent from '@components/inputs/FileComponent';
import FormChildInput from '@components/inputs/FormChildInput';

import { useAffidavitStepOne } from '@hooks/candidate-info-management/operator-view/candidate-management/affidavit-form/useAffidavitStepOne';
import { FILE_CATEGORY } from '@constants/file';
import { PresentCaseType } from '@type/candidate-info-management/operator-view/affidavit-form/affidavit-step-one';
import { caseDefaultValue } from '../../../defaultValues';
import { FIRST_STEP_AFFIDAVIT } from '@validations/candidate-info-management/operator/affidavit/firstStepAffidavitFormValidation';
import { claimedCaseTableColumns } from '../formOptions';
import { ELECTION_INFO } from '@constants/election-info';

interface ClaimedCaseDescriptionType {
  submitData?: boolean;
  presentCaseChecked?: boolean;
  pastCaseChecked?: boolean;
  tableName: any;
  openCaseEditModal: (caseId?: string | number, caseType?: string) => void;
  handleButtonDisable: (data: boolean) => void;
}

function ClaimedCaseDescriptionTable({
  submitData,
  tableName,
  presentCaseChecked,
  pastCaseChecked,
  openCaseEditModal,
  handleButtonDisable,
}: ClaimedCaseDescriptionType) {
  const [isOpenDeleteConfirmModal, setIsOpenDeleteConfirmModal] =
    useState(false);
  const [caseId, setCaseId] = useState<string | number>();
  const { t } = useTranslation();
  const { electionSettingsId, candidateElectionDetailsId, electionScheduleId, electionTypeId } =
    useParams();
  const createId = useId();

  const currentCaseType = tableName === 'presentCases' ? 'PRESENT' : 'PAST';

  const { control } = useFormContext();
  const { deletePresentCaseHandler } = useAffidavitStepOne({
    electionSettingsId,
    candidateElectionDetailsId,
  });
  const {
    fields: caseValidationFields,
    append: caseValidationAppend,
    remove: caseValidationRemove,
  } = useFieldArray({
    control,
    name: tableName,
  });

  const openDeleteConfirmationModal = (
    caseId?: number | string,
    index?: number,
  ) => {
    if (caseId) {
      setCaseId(caseId);
      setIsOpenDeleteConfirmModal(true);
    } else {
      caseValidationRemove(index);
    }
  };

  const closeDeleteConfirmationModal = () => {
    setIsOpenDeleteConfirmModal(false);
  };

  const confirmDeleteCase = (caseId?: string | number, caseType?: string) => {
    if (caseId) {
      deletePresentCaseHandler({
        electionSettingsId,
        candidateElectionDetailsId,
        caseId,
        caseType,
      });
    }
    setIsOpenDeleteConfirmModal(false);
  };
  return (
    <div>
      {
        Number(electionTypeId) === ELECTION_INFO.UNION_PARISHAD.ID && 
        
        <div className="d-flex align-items-center justify-content-center mb-8">
          <Text weight="medium" size="sm" color="title">
            {
              t('AFFIDAVIT_STEP_ONE.OR')
            }
          </Text>
        </div>
      }
      <Text weight="medium" size="sm" color="title">
        {tableName === 'presentCases'
          ? t('AFFIDAVIT_STEP_ONE.CLAIMED_PRESENT_CASE_DESCRIPTION')
          : t('AFFIDAVIT_STEP_ONE.CLAIMED_PAST_CASE_DESCRIPTION')}
      </Text>
      <div className="pt-8">
        <TableSecondary columns={claimedCaseTableColumns(t)}>
          {caseValidationFields.map((caseInfo: PresentCaseType, index) => (
            <TableRow key={index}>
              <TableData>{index + 1}</TableData>
              <TableData>
                <FormChildInput
                  registerName={`${tableName}.${index}.${FIRST_STEP_AFFIDAVIT.ACCUSED_CASE}`}
                  isMinWidth
                  placeholder={t('PLACEHOLDER.ENTER')}
                  disabled={Boolean(caseInfo.idx)}
                />
              </TableData>
              <TableData>
                <FormChildInput
                  registerName={`${tableName}.${index}.${FIRST_STEP_AFFIDAVIT.COURT_NAME}`}
                  isMinWidth
                  placeholder={t('PLACEHOLDER.ENTER')}
                  disabled={Boolean(caseInfo.idx)}
                />
              </TableData>
              <TableData>
                <FormChildInput
                  registerName={`${tableName}.${index}.${FIRST_STEP_AFFIDAVIT.CASE_NUMBER}`}
                  isMinWidth
                  placeholder={t('PLACEHOLDER.ENTER')}
                  disabled={Boolean(caseInfo.idx)}
                />
              </TableData>
              <TableData>
                <FormChildInput
                  registerName={`${tableName}.${index}.${FIRST_STEP_AFFIDAVIT.CASE_STATUS}`}
                  isMinWidth
                  placeholder={t('PLACEHOLDER.ENTER')}
                  disabled={Boolean(caseInfo.idx)}
                />
              </TableData>
              <TableData>
                <FileComponent
                  registerName={`${tableName}.${index}.${FIRST_STEP_AFFIDAVIT.CASE_FILE}`}
                  disabledOption={Boolean(caseInfo.idx)}
                  handleButtonDisable={handleButtonDisable}
                  minWidth
                  tableFileComponent
                  pathId={electionScheduleId}
                  category={FILE_CATEGORY.CANDIDATES}
                />
              </TableData>
              <TableData>
                <div className="d-flex justify-content-between">
                  <div
                    className="pointer me-7"
                    onClick={() =>
                      openCaseEditModal(caseInfo?.idx, currentCaseType)
                    }
                  >
                    {caseInfo?.idx && <IconEdit05 size="20" fill="dark" />}
                  </div>
                  <div
                    className="pointer"
                    onClick={() =>
                      openDeleteConfirmationModal(caseInfo?.idx, index)
                    }
                  >
                    <IconTrash03 size="20" fill="dark" />
                  </div>
                </div>
              </TableData>
            </TableRow>
          ))}
        </TableSecondary>
      </div>
      <div className="px-9 py-8 rounded-4 bg-white">
        <Button
          fill="outline"
          type="light"
          htmlType="button"
          onClick={() =>
            caseValidationAppend({
              ...caseDefaultValue,
              id: createId,
              caseType: currentCaseType,
            })
          }
        >
          <IconPlus size="16" fill="dark" />{' '}
          {t('AFFIDAVIT_STEP_ONE.ADD_ANOTHER')}
        </Button>
        {tableName === 'presentCases' &&
          !presentCaseChecked &&
          caseValidationFields.length === 0 &&
          submitData && (
            <Text color="danger" className="p-10">
              {t(`AFFIDAVIT_STEP_ONE.PRESENT_CASE_ERROR`)}
            </Text>
          )}
        {tableName === 'pastCases' &&
          !pastCaseChecked &&
          caseValidationFields.length === 0 &&
          submitData && (
            <Text color="danger" className="p-10">
              {t(`AFFIDAVIT_STEP_ONE.PAST_CASE_ERROR`)}
            </Text>
          )}
      </div>

      <ConfirmationModal
        title={t('AFFIDAVIT_STEP_ONE.DELETE_MODAL_TITLE')}
        isOpen={isOpenDeleteConfirmModal}
        onClose={closeDeleteConfirmationModal}
        cancelButton={{
          onClick: closeDeleteConfirmationModal,
          label: t('AFFIDAVIT_STEP_ONE.CONFIRMATION_DELETE_BUTTON_TEXT'),
          fill: 'outline',
          type: 'light',
        }}
        confirmButton={{
          onClick: () => confirmDeleteCase(caseId, currentCaseType),
          label: t('AFFIDAVIT_STEP_ONE.CONFIRMATION_BUTTON_TEXT'),
          fill: 'fill',
          type: 'info',
        }}
      />
    </div>
  );
}

export default ClaimedCaseDescriptionTable;
