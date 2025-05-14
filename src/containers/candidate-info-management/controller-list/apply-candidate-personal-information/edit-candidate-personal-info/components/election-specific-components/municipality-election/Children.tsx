import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';

import {
  IconCalendar,
  IconPlus,
  IconTrash03,
  IconEdit05,
} from '@pentabd/icons';
import {
  Button,
  InputDate,
  InputSelect,
  TableData,
  TableRow,
  TableSecondary,
  ConfirmationModal,
} from '@pentabd/ui';
import { SelectionType } from '@pentabd/ui/build/atoms/select/types';

import FormChildInput from '@components/inputs/FormChildInput';

import { maritalStatusSelectOptions } from '../../formOptions';
import { childrenInfoDefaultValue } from '../../../defaultValue';
import { childrenTableColumns } from './constants';

import { useCandidatePersonalInformation } from '@hooks/candidate-info-management/operator-view/candidate-management/candidate-personal-information/useCandidatePersonalInformation';
import { ChildType } from '@type/candidate-info-management/operator-view/candidatePersonalInformation';
import { CHILDREN } from '@validations/candidate-info-management/operator/personalInfoValidation';

interface ChildrenType {
  openEditModal: (childId?: string | number) => void;
}

const Children = ({ openEditModal }: ChildrenType) => {
  const [isOpenDeleteConfirmModal, setIsOpenDeleteConfirmModal] =
    useState(false);

  const [childId, setChildId] = useState<string | number>();
  const { t } = useTranslation();

  const { electionSettingsId, candidateElectionDetailsId } = useParams();

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const {
    fields: childrenValidationFields,
    append: childrenValidationAppend,
    remove: childrenValidationRemove,
  } = useFieldArray({
    control,
    name: 'childrenInfo',
  });

  const { deleteCandidateChildHandler } = useCandidatePersonalInformation({
    electionSettingsId,
    candidateElectionDetailsId,
  });

  const openDeleteConfirmationModal = (
    id?: number | string,
    index?: number,
  ) => {
    if (id) {
      setChildId(id);
      setIsOpenDeleteConfirmModal(true);
    } else {
      childrenValidationRemove(index);
    }
  };

  const closeDeleteConfirmationModal = () => {
    setIsOpenDeleteConfirmModal(false);
  };

  const confirmDeleteChildren = (childId?: string | number) => {
    if (childId) {
      deleteCandidateChildHandler({
        electionSettingsId,
        candidateElectionDetailsId,
        childId,
      });
      setIsOpenDeleteConfirmModal(false);
    }
  };

  return (
    <>
      <TableSecondary columns={childrenTableColumns(t)}>
        {childrenValidationFields.map((childInfo: ChildType, index) => {
          return (
            <TableRow key={index}>
              <TableData>{index + 1}</TableData>
              <TableData>
                <FormChildInput
                  registerName={`childrenInfo.${index}.${CHILDREN.NAME}`}
                  isMinWidth
                  placeholder={t('PLACEHOLDER.ENTER')}
                  disabled={Boolean(childInfo.idx)}
                />
              </TableData>
              <TableData>
                <Controller
                  control={control}
                  name={`childrenInfo.${index}.${CHILDREN.DATE_OF_BIRTH}`}
                  render={({ field }) => {
                    return (
                      <InputDate
                        name={`childrenInfo.${index}.${CHILDREN.DATE_OF_BIRTH}`}
                        onSelectDate={(date) => field.onChange(date)}
                        value={field.value as string}
                        defaultValue={field.value as string}
                        error={errors as any}
                        placeholder={t('PLACEHOLDER.SELECT')}
                        disabled={Boolean(childInfo.idx)}
                        portal
                        minWidth
                        prefix={<IconCalendar size="20" fill="subtitle2" />}
                        maximumDate={dayjs()}
                        getTranslation={t}
                      />
                    );
                  }}
                />
              </TableData>
              <TableData>
                <FormChildInput
                  registerName={`childrenInfo.${index}.${CHILDREN.EDUCATIONAL_QUALIFICATION}`}
                  isMinWidth
                  placeholder={t('PLACEHOLDER.ENTER')}
                  disabled={Boolean(childInfo.idx)}
                />
              </TableData>
              <TableData>
                <FormChildInput
                  registerName={`childrenInfo.${index}.${CHILDREN.INSTITUTE_ADDRESS}`}
                  isMinWidth
                  placeholder={t('PLACEHOLDER.ENTER')}
                  disabled={Boolean(childInfo.idx)}
                />
              </TableData>
              <TableData>
                <Controller
                  control={control}
                  name={`childrenInfo.${index}.${CHILDREN.MARITAL_STATUS}`}
                  render={({ field }) => (
                    <InputSelect
                      name={`childrenInfo.${index}.${CHILDREN.MARITAL_STATUS}`}
                      onSelectItem={(data: SelectionType) =>
                        field.onChange(data)
                      }
                      defaultValue={field.value as string}
                      error={errors as any}
                      portal
                      minWidth
                      options={maritalStatusSelectOptions(t)}
                      disabled={Boolean(childInfo.idx)}
                      placeholder={t('PLACEHOLDER.SELECT')}
                      getTranslation={t}
                    />
                  )}
                />
              </TableData>
              <TableData>
                <div className="d-flex justify-content-between">
                  <div
                    className="pointer me-7"
                    onClick={() => openEditModal(childInfo.idx)}
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
          );
        })}
      </TableSecondary>

      <div className="px-9 py-8 rounded-4 bg-white">
        <Button
          fill="outline"
          type="light"
          htmlType="button"
          onClick={() =>
            childrenValidationAppend({
              ...childrenInfoDefaultValue,
              id: '',
            })
          }
        >
          <IconPlus size="16" fill="dark" />{' '}
          {t('CANDIDATE_PERSONAL_INFO.CHILD_ADD_BUTTON_TEXT')}
        </Button>

        <ConfirmationModal
          title={`${t(
            'CANDIDATE_PERSONAL_INFO.DELETE_CHILD_CONFIRMATION_MODAL_TITLE',
          )}`}
          isOpen={isOpenDeleteConfirmModal}
          onClose={closeDeleteConfirmationModal}
          cancelButton={{
            onClick: closeDeleteConfirmationModal,
            label: `${t('CANDIDATE_PERSONAL_INFO.CANCEL_BUTTON_TEXT')}`,
            fill: 'outline',
            type: 'light',
          }}
          confirmButton={{
            onClick: () => confirmDeleteChildren(childId),
            label: `${t('CANDIDATE_PERSONAL_INFO.CONFIRM_BUTTON_TEXT')}`,
            fill: 'fill',
            type: 'info',
          }}
        />
      </div>
    </>
  );
};

export default Children;
