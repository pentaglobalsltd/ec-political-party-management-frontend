import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFieldArray, useFormContext } from 'react-hook-form';

import {
  Text,
  TableSecondary,
  TableRow,
  TableData,
  Button,
  ConfirmationModal,
} from '@pentabd/ui';
import { IconEdit05, IconPlus, IconTrash03 } from '@pentabd/icons';

import FileComponent from '@components/inputs/FileComponent';
import FormChildInput from '@components/inputs/FormChildInput';

import { useLiabilities } from '@hooks/candidate-info-management/operator-view/candidate-management/affidavit-form/useLiabilities';
import { LIABILITIES } from '@validations/candidate-info-management/operator/affidavit/fourthStepLiabilitiesValidation';
import { FILE_CATEGORY } from '@constants/file';
import { LiabilityChildType } from '@type/candidate-info-management/operator-view/affidavit-form/liabilities';
import { electionNameMapping } from '@helpers/election-type';
import { liabilitiesTableColumns } from '../formOptions';
import { liabilitiesFormDefaultValue } from '../defaultValue';

interface Props {
  openLiabilityEditModal: (childId?: string | number) => void;
  parentHandleButtonDisabled: (data: boolean) => void;
}

const Liabilities = ({
  openLiabilityEditModal,
  parentHandleButtonDisabled,
}: Props) => {
  const { t } = useTranslation();
  const [isOpenDeleteConfirmModal, setIsOpenDeleteConfirmModal] =
    useState(false);
  const [liabilityId, setLiabilityId] = useState<string | number>();
  const {
    electionSettingsId,
    candidateElectionDetailsId,
    electionTypeId,
    electionScheduleId,
  } = useParams();

  const electionTypeKey = electionNameMapping(Number(electionTypeId));

  const { control } = useFormContext();
  const {
    fields: liabilitiesFields,
    append: liabilitiesAppend,
    remove: liabilitiesRemove,
  } = useFieldArray({
    control,
    name: 'liabilities',
  });

  const { deleteLiabilityChildHandler } = useLiabilities({
    electionSettingsId,
    candidateElectionDetailsId,
  });
  const openDeleteConfirmationModal = (
    id?: number | string,
    index?: number,
  ) => {
    if (id) {
      setLiabilityId(id);
      setIsOpenDeleteConfirmModal(true);
    } else {
      liabilitiesRemove(index);
    }
  };
  const closeDeleteConfirmationModal = () => {
    setIsOpenDeleteConfirmModal(false);
  };
  const confirmDeleteChildren = (liabilityId?: string | number) => {
    if (liabilityId) {
      deleteLiabilityChildHandler({
        electionSettingsId,
        candidateElectionDetailsId,
        liabilityId,
      });
      setIsOpenDeleteConfirmModal(false);
    }
  };
  const handleButtonDisable = (value: boolean) => {
    parentHandleButtonDisabled(value);
  };

  return (
    <div className="d-flex flex-column gap-9 py-9 border-bottom">
      <Text size="sm" color="title" weight="normal">
        {t(`AFFIDAVIT_LIABILITIES.DESCRIPTION_SIX.${electionTypeKey}`)}
      </Text>
      <TableSecondary columns={liabilitiesTableColumns({ t, electionTypeKey })}>
        {liabilitiesFields.map((childInfo: LiabilityChildType, index) => (
          <TableRow key={index}>
            <TableData>
              <FormChildInput
                registerName={`liabilities.${index}.${LIABILITIES.NATURE_LIABILITIES_DEBTS}`}
                isMinWidth
                placeholder={t('PLACEHOLDER.ENTER')}
                disabled={Boolean(childInfo.idx)}
              />
            </TableData>
            <TableData>
              <FormChildInput
                registerName={`liabilities.${index}.${LIABILITIES.AMOUNT}`}
                isMinWidth
                placeholder={t('PLACEHOLDER.ENTER')}
                disabled={Boolean(childInfo.idx)}
              />
            </TableData>
            <TableData>
              <FileComponent
                registerName={`liabilities.${index}.${LIABILITIES.FILE}`}
                disabledOption={Boolean(childInfo.idx)}
                handleButtonDisable={handleButtonDisable}
                tableFileComponent
                fullGridWidth
                pathId={electionScheduleId}
                category={FILE_CATEGORY.CANDIDATES}
              />
            </TableData>
            <TableData>
              <div className="d-flex justify-content-between">
                <div
                  className="pointer me-7"
                  onClick={() => openLiabilityEditModal(childInfo.idx)}
                >
                  {childInfo?.idx && <IconEdit05 size="20" fill="dark" />}
                </div>
                <div
                  className="pointer"
                  onClick={() =>
                    openDeleteConfirmationModal(childInfo.idx, index)
                  }
                >
                  <IconTrash03 size="20" fill="dark" />
                </div>
              </div>
            </TableData>
          </TableRow>
        ))}
      </TableSecondary>
      <div className="px-9 pt-8 rounded-4 bg-white">
        <Button
          fill="outline"
          type="light"
          htmlType="button"
          onClick={() =>
            liabilitiesAppend({
              ...liabilitiesFormDefaultValue,
              id: '',
            })
          }
        >
          <IconPlus size="16" fill="dark" />{' '}
          {t('CANDIDATE_PERSONAL_INFO.CHILD_ADD_BUTTON_TEXT')}
        </Button>
      </div>
      <ConfirmationModal
        title={`${t(
          'CANDIDATE_PERSONAL_INFO.DELETE_CHILD_CONFIRMATION_MODAL_TITLE',
        )}`}
        onClose={closeDeleteConfirmationModal}
        isOpen={isOpenDeleteConfirmModal}
        cancelButton={{
          onClick: closeDeleteConfirmationModal,
          label: `${t('CANDIDATE_PERSONAL_INFO.CANCEL_BUTTON_TEXT')}`,
          fill: 'outline',
          type: 'light',
        }}
        confirmButton={{
          onClick: () => confirmDeleteChildren(liabilityId),
          label: `${t('CANDIDATE_PERSONAL_INFO.CONFIRM_BUTTON_TEXT')}`,
          fill: 'fill',
          type: 'info',
        }}
      />
    </div>
  );
};
export default Liabilities;
